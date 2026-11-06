import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Marlen Solutions",
  alternates: { canonical: "https://marlensolutions.com/privacy/" },
};

export default function Privacy() {
  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-2xl space-y-4 text-ink-muted leading-relaxed">
        <Link href="/" className="inline-block text-xl tracking-tight text-ink mb-8">
          <span className="font-semibold">Marlen</span>{" "}
          <span className="font-normal">Solutions</span>
        </Link>
        <h1 className="text-3xl font-semibold text-ink">Privacy Policy</h1>
        <p className="text-ink-dim">Last updated: November 5, 2026</p>
        <p>
          Marlen Solutions LLC runs a private tool, &quot;google-multi&quot;, that
          connects to Google accounts owned by Marlen Solutions. It reads and
          writes Gmail, Google Calendar, Drive, Docs and Sheets data in those
          accounts only, so it can draft email and manage the company&apos;s own
          files and calendar.
        </p>
        <p>
          It is not offered to the public. It does not collect data from anyone
          else&apos;s Google account, and it does not sell, share or transfer
          Google user data to third parties. Data is processed only on the
          company&apos;s own computer. Access tokens are stored in the macOS
          keychain.
        </p>
        <p>
          The tool&apos;s use of information received from Google APIs follows
          the{" "}
          <a
            href="https://developers.google.com/terms/api-services-user-data-policy"
            className="text-layer-2 underline"
          >
            Google API Services User Data Policy
          </a>
          , including the Limited Use requirements.
        </p>
        <p>
          To revoke access, visit{" "}
          <a
            href="https://myaccount.google.com/permissions"
            className="text-layer-2 underline"
          >
            myaccount.google.com/permissions
          </a>
          . For questions, email{" "}
          <a href="mailto:hogan@marlensolutions.com" className="text-layer-2 underline">
            hogan@marlensolutions.com
          </a>
          .
        </p>
        <p className="pt-12 text-sm text-ink-dim border-t border-surface-line">
          Marlen Solutions LLC | 1109 SE 72nd Ave, Portland, OR 97215 | Oregon
          Registry No. 258911594
        </p>
      </div>
    </main>
  );
}
