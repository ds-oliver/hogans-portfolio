import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";

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
  description: "Portfolio website showcasing my work as a Data Engineering and Machine Learning Engineer",
  keywords: ["Data Engineering", "Machine Learning", "ML Engineer", "Data Science", "Portfolio"],
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
      </body>
    </html>
  );
}
