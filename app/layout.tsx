import { Geist, Geist_Mono } from "next/font/google";
import { Oxanium } from "next/font/google";
import RootLayoutClient from "./components/RootLayoutClient";
import "./globals.css";

const oxanium = Oxanium({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  weight: '200',
  variable: '--font-oxanium',
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning>
        <RootLayoutClient className={`${geistSans.variable} ${geistMono.variable} ${oxanium.className} antialiased relative min-h-screen`}>
          {children}
        </RootLayoutClient>
      </body>
    </html>
  );
}
