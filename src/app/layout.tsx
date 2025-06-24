import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { Analytics } from "@vercel/analytics/next";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hogan | Data Engineering & ML Engineer",
  description: "Portfolio website showcasing my work as a Data Engineering and Machine Learning Engineer, specializing in data pipelines, ML models, and analytics solutions.",
  keywords: [
    "Data Engineering",
    "Machine Learning",
    "ML Engineer",
    "Data Science",
    "Portfolio",
    "Data Pipeline",
    "Analytics",
    "Python",
    "SQL",
    "AWS",
    "Snowflake",
    "Data Automation"
  ],
  authors: [{ name: "Hogan" }],
  creator: "Hogan",
  publisher: "Hogan",
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
    url: 'https://your-portfolio-url.com',
    siteName: 'Hogan - Data Engineering & ML Portfolio',
    title: 'Hogan | Data Engineering & ML Engineer',
    description: 'Portfolio website showcasing my work as a Data Engineering and Machine Learning Engineer, specializing in data pipelines, ML models, and analytics solutions.',
    images: [
      {
        url: '/profile-placeholder.jpg',
        width: 1200,
        height: 630,
        alt: 'Hogan - Data Engineering & ML Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hogan | Data Engineering & ML Engineer',
    description: 'Portfolio website showcasing my work as a Data Engineering and Machine Learning Engineer, specializing in data pipelines, ML models, and analytics solutions.',
    images: ['/profile-placeholder.jpg'],
    creator: '@yourtwitterhandle',
  },
  alternates: {
    canonical: 'https://your-portfolio-url.com',
  },
  verification: {
    google: 'DAVZzr8odYxXMRWlypC3tx_KQrwW7qbNflmNFbucSbo',
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
        <meta name="google-site-verification" content="DAVZzr8odYxXMRWlypC3tx_KQrwW7qbNflmNFbucSbo" />
      </head>
      <body
        className={`${poppins.variable} ${inter.variable} antialiased`}
        style={{ 
          backgroundColor: '#333333',
          color: '#ffffff'
        }}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
