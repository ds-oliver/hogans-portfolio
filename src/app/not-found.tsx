import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <p className="text-2xl tracking-tight text-ink mb-6">
        <span className="font-semibold">Marlen</span>{" "}
        <span className="font-normal">Solutions</span>
      </p>
      <p className="text-lg text-ink-muted mb-6">That page does not exist.</p>
      <Link href="/" className="text-layer-2 underline">
        Back to the home page
      </Link>
    </main>
  );
}
