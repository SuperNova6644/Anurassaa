import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://anurassaa.com"),
  title: "Anurassaa — Clean-Label Plant Protein | Coming Soon",
  description:
    "We’re building a clean-label plant protein ingredient that gives new life to what’s often overlooked. Anurassaa is pioneering sustainable, nutrient-rich food tech innovation.",
  keywords: [
    "Anurassaa",
    "plant protein",
    "clean label",
    "sustainable protein",
    "foodtech",
    "alternative protein",
    "upcycled ingredients",
  ],
  authors: [{ name: "Anurassaa Team" }],
  openGraph: {
    title: "Anurassaa — Clean-Label Plant Protein | Coming Soon",
    description:
      "We’re building a clean-label plant protein ingredient that gives new life to what’s often overlooked.",
    images: ["/images/anurassa_bg.jpg"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="anurassa-body" suppressHydrationWarning>{children}</body>
    </html>
  );
}
