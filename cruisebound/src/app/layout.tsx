import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SmoothScrolling from '../components/SmoothScrolling';
import BackToTop from '../components/BackToTop';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Omar Pérez González",
  description: "Cruisebound internship assignment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SmoothScrolling />
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
