import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://marlensolutions.com"),
  title: "Marlen Solutions | Data Engineering and Solutions Architecting",
  description:
    "Marlen Solutions LLC builds production data pipelines, data models, and validation systems for public agencies and enterprise teams. Based in Portland, Oregon.",
  keywords: [
    "Data Engineering",
    "Solutions Architecture",
    "Data Pipelines",
    "Data Modeling",
    "Data Validation",
    "SQL",
    "Python",
    "Portland Oregon",
    "Public Sector",
  ],
  authors: [{ name: "Hogan Marhoefer" }],
  creator: "Marlen Solutions LLC",
  publisher: "Marlen Solutions LLC",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://marlensolutions.com',
    siteName: 'Marlen Solutions LLC',
    title: 'Marlen Solutions | Data Engineering and Solutions Architecting',
    description:
      "Production data pipelines, data models, and validation systems for public agencies and enterprise teams.",
  },
  twitter: {
    card: 'summary',
    title: 'Marlen Solutions | Data Engineering and Solutions Architecting',
    description:
      "Production data pipelines, data models, and validation systems for public agencies and enterprise teams.",
  },
  alternates: {
    canonical: 'https://marlensolutions.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="darkreader-lock" />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className={`${sora.variable} antialiased`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
