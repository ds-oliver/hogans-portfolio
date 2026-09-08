"use client";

import { useState } from "react";
import Script from "next/script";

declare global {
  interface Window {
    turnstile?: { reset: (widget?: string) => void };
  }
}

type Status = "idle" | "sending" | "sent" | "error";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const fieldClasses =
  "w-full rounded-md border border-surface-line bg-surface px-3 py-2 text-ink placeholder:text-ink-dim focus:border-layer-2 focus:outline-none";
const labelClasses = "block text-xs uppercase tracking-wider text-ink-dim mb-2";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          organization: data.get("organization"),
          message: data.get("message"),
          token: data.get("cf-turnstile-response"),
        }),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => ({}))) as {
          error?: string;
        };
        setError(body.error ?? "Something went wrong.");
        setStatus("error");
        window.turnstile?.reset();
        return;
      }

      form.reset();
      setStatus("sent");
      window.turnstile?.reset();
    } catch {
      setError("Could not reach the server.");
      setStatus("error");
      window.turnstile?.reset();
    }
  }

  return (
    <section id="contact" className="py-24 px-6">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
      />
      <div className="max-w-3xl mx-auto">
        <h2 className="text-center text-3xl sm:text-4xl font-semibold text-ink mb-10">
          Contact
        </h2>

        <form
          onSubmit={handleSubmit}
          className="rounded-lg border border-surface-line bg-surface-raised p-8 space-y-5"
        >
          <div>
            <label className={labelClasses} htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              maxLength={200}
              autoComplete="name"
              className={fieldClasses}
            />
          </div>

          <div>
            <label className={labelClasses} htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              maxLength={254}
              autoComplete="email"
              className={fieldClasses}
            />
          </div>

          <div>
            <label className={labelClasses} htmlFor="organization">
              Organization (optional)
            </label>
            <input
              id="organization"
              name="organization"
              type="text"
              maxLength={200}
              autoComplete="organization"
              className={fieldClasses}
            />
          </div>

          <div>
            <label className={labelClasses} htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              maxLength={5000}
              className={fieldClasses}
            />
          </div>

          <div className="cf-turnstile" data-sitekey={SITE_KEY} data-theme="dark" />

          <button
            type="submit"
            disabled={status === "sending"}
            className="rounded-lg border-2 border-ink-muted bg-surface px-6 py-3 text-ink transition-colors hover:border-layer-2 disabled:opacity-50"
          >
            {status === "sending" ? "Sending" : "Send message"}
          </button>

          <div aria-live="polite">
            {status === "sent" && (
              <p className="text-layer-2">
                Thanks. Your message is on its way, and a reply will come to the
                address you gave.
              </p>
            )}
            {status === "error" && (
              <p className="text-ink">
                {error} You can email{" "}
                <a className="text-layer-2 underline" href="mailto:hogan@marlensolutions.com">
                  hogan@marlensolutions.com
                </a>{" "}
                directly instead.
              </p>
            )}
          </div>
        </form>

        <div className="mt-8 text-center text-ink-muted space-y-1">
          <p>
            <a className="hover:text-ink" href="mailto:hogan@marlensolutions.com">
              hogan@marlensolutions.com
            </a>
          </p>
          <p>
            <a className="hover:text-ink" href="tel:+15032675947">
              503-267-5947
            </a>
          </p>
          <p>Portland, Oregon</p>
        </div>
      </div>
    </section>
  );
}
