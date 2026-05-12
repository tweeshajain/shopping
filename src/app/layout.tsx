import type { Metadata } from "next";
import { Cormorant_Garamond, Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/SiteNav";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Atelier — A Beauty Curation",
  description:
    "A quiet study of objects worn, loved and kept. A curated beauty apartment.",
  openGraph: {
    title: "Atelier — A Beauty Curation",
    description:
      "A quiet study of objects worn, loved and kept. A curated beauty apartment.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${fraunces.variable} ${inter.variable}`}
    >
      <body className="min-h-screen bg-warm-gradient text-softblack font-sans antialiased overflow-x-hidden">
        <div className="pointer-events-none fixed inset-0 -z-10 bg-soft-radial" />
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
