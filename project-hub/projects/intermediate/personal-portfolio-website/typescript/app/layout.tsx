import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/Providers/ConvexClientProvider";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Toaster } from "@/components/ui/toaster";
import Head from "next/head";


const inter = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ZERO | PORTFOLIO",
  description: "Developed and managed by ZERO",
  keywords: ["Portfolio, Developer, Web Developer, UI/UX, JavaScript, React, Next.js, Designer"],
  openGraph:{
    type: "profile",
    title: "Ashish | Portfolio",
    description: "Ashish | Portfolio.",
    url: "https://ashishport.vercel.app",
    siteName: "Ashish",
    locale: "en_IN",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" className="overflow-y-scroll no-scrollbar">
        <body className={`${inter.className} bg-black-7`}>
          <ConvexClientProvider>
            {children}
            {/* <h1 className="text-[28px] font-extrabold tracking-widest font-mono flex items-center justify-center">Under Maintainence</h1> */}
            <Analytics />
            <SpeedInsights />
            <Toaster />
          </ConvexClientProvider>
        </body>
      </html>
    </>
  );
}
