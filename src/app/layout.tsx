import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./components/navigation";
import { Analytics } from "@vercel/analytics/react";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NEBULA | Unleashing Creativity & Connections",
  description:
    "NEBULA is a digital space where ideas, connections, and creativity come together to inspire and innovate.",
  keywords: "creativity, innovation, networking, digital space, community",
  // author: "Tushar Bhatt",
  robots: "index, follow",
  icons: {
    icon: "/NEBULA_Logo.svg", // Path to your favicon in the public folder
  },
  openGraph: {
    title: "NEBULA | Unleashing Creativity & Connections",
    description:
      "Join NEBULA, a digital space where ideas, connections, and creativity come together to inspire and innovate.",
    url: "https://nebula-socialmedia.vercel.app/",
    type: "website",
    images: [
      {
        url: "https://i.pinimg.com/736x/f4/f6/a5/f4f6a522432e0b2ebe90964808c5610c.jpg", // Replace with the actual OG image path
        width: 1200,
        height: 630,
        alt: "NEBULA - A space for creativity and connections",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NEBULA | Unleashing Creativity & Connections",
    description:
      "Discover NEBULA, the perfect place for creators and innovators to connect and thrive.",
    images: [
      "https://i.pinimg.com/736x/19/94/14/199414478cd55e3dbfb539e14dd60917.jpg",
    ], // Ensure this path exists
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Navigation />
      </body>
    </html>
  );
}
