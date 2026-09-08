import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Canonical Sora TTFs from brand/font/, not the Google Fonts CDN copy.
const sora = localFont({
  src: [
    { path: "./fonts/Sora-400.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Sora-600.ttf", weight: "600", style: "normal" },
  ],
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
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Marlen Solutions, Data Engineering and Solutions Architecting',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marlen Solutions | Data Engineering and Solutions Architecting',
    description:
      "Production data pipelines, data models, and validation systems for public agencies and enterprise teams.",
    images: ['/og.png'],
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
      </body>
    </html>
  );
}
