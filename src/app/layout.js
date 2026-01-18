import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Aadesh Lawate | Full Stack Developer",
  description: "Digital Portfolio of Aadesh Lawate - Full Stack Developer & UI/UX enthusiast. Specializing in React, Next.js, Spring Boot, and modern web technologies.",
  keywords: "Aadesh Lawate, Full Stack Developer, Web Developer, React, Next.js, Spring Boot, Java, JavaScript, Portfolio",
  authors: [{ name: "Aadesh Lawate" }],
  creator: "Aadesh Lawate",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aadlaw.netlify.app/",
    siteName: "Aadesh Lawate Portfolio",
    title: "Aadesh Lawate | Full Stack Developer",
    description: "Digital Portfolio of Aadesh Lawate - Full Stack Developer & UI/UX enthusiast.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Aadesh Lawate Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aadesh Lawate | Full Stack Developer",
    description: "Digital Portfolio of Aadesh Lawate - Full Stack Developer & UI/UX enthusiast.",
    images: ["/og-image.jpg"],
  },
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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
