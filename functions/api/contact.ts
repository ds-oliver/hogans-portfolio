interface Env {
  RESEND_API_KEY: string;
  TURNSTILE_SECRET_KEY: string;
}

interface EventContext {
  request: Request;
  env: Env;
}

const TO_ADDRESS = 'hogan@marlensolutions.com';
const FROM_ADDRESS = 'Marlen Solutions <site@send.marlensolutions.com>';

const MAX = {
  name: 200,
  email: 254,
  organization: 200,
  message: 5000,
  token: 4096,
};

// Deliberately narrow: no whitespace either side of the @, so a value that
// parses here cannot carry a newline into a mail header.
const EMAIL = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;

function json(body: Record<string, string>, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

function readField(value: unknown, max: number): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (trimmed.length === 0 || trimmed.length > max) return null;
  return trimmed;
}

function stripControlChars(value: string): string {
  return Array.from(value)
    .map((char) => {
      const code = char.charCodeAt(0);
      return code < 32 || code === 127 ? ' ' : char;
    })
    .join('')
    .trim();
}

async function verifyTurnstile(
  token: string,
  secret: string,
  ip: string | null
): Promise<boolean> {
  const body = new FormData();
  body.append('secret', secret);
  body.append('response', token);
  if (ip) body.append('remoteip', ip);

  const response = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    { method: 'POST', body }
  );
  if (!response.ok) return false;

  const result = (await response.json()) as { success?: boolean };
  return result.success === true;
}

export async function onRequestPost(context: EventContext): Promise<Response> {
  const { request, env } = context;

  if (!env.RESEND_API_KEY || !env.TURNSTILE_SECRET_KEY) {
    console.error('contact: missing RESEND_API_KEY or TURNSTILE_SECRET_KEY');
    return json({ error: 'Server is not configured to send mail.' }, 500);
  }

  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ error: 'Expected a JSON body.' }, 400);
  }

  const name = readField(payload.name, MAX.name);
  const email = readField(payload.email, MAX.email);
  const message = readField(payload.message, MAX.message);
  const token = readField(payload.token, MAX.token);

  // Organization is the one optional field, so an empty value is valid but a
  // present-and-too-long one is not.
  const organizationRaw = payload.organization ?? '';
  if (typeof organizationRaw !== 'string' || organizationRaw.length > MAX.organization) {
    return json({ error: 'Check the organization field and try again.' }, 400);
  }
  const organization = organizationRaw.trim();

  if (!name || !email || !message) {
    return json({ error: 'Name, email, and message are all required.' }, 400);
  }
  if (!EMAIL.test(email)) {
    return json({ error: 'That email address does not look right.' }, 400);
  }
  if (!token) {
    return json({ error: 'Bot check missing. Reload the page and try again.' }, 400);
  }

  const passed = await verifyTurnstile(
    token,
    env.TURNSTILE_SECRET_KEY,
    request.headers.get('CF-Connecting-IP')
  );
  if (!passed) {
    return json({ error: 'Bot check failed. Reload the page and try again.' }, 400);
  }

  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Organization: ${organization || '(not given)'}`,
    '',
    message,
  ];

  const send = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${env.RESEND_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM_ADDRESS,
      to: [TO_ADDRESS],
      reply_to: email,
      subject: `Contact form: ${stripControlChars(name)}`,
      text: lines.join('\n'),
    }),
  });

  if (!send.ok) {
    console.error('contact: resend returned', send.status, await send.text());
    return json({ error: 'Could not send the message.' }, 502);
  }

  return json({ ok: 'true' }, 200);
}

export function onRequest(): Response {
  return new Response('Method not allowed', {
    status: 405,
    headers: { allow: 'POST' },
  });
}
