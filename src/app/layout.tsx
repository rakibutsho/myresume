import Loading from "@/components/Others/Loader/Loading";
import { openSans, playfair, roboto } from "@/fonts/Fonts";
import ReduxProvider from "@/redux/Provider";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
const ToastProvider = dynamic(() => import("@/components/Others/ToastProvider/ToastProvider"), { ssr: false });
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://rakibutsho.dev/"),
  title: "Md. Rakibul Islam | Software Engineer",
  description:
    "Portfolio of Md. Rakibul Islam, a software engineer building conversion-ready SaaS interfaces with Next.js, React, TypeScript, and Node.js.",
  keywords: [
    "Rakibul Islam",
    "Software Engineer",
    "Frontend Developer",
    "React Developer",
    "Next.js",
    "TypeScript",
    "SaaS Frontend",
    "Node.js",
    "Web Performance",
    "Core Web Vitals",
    "Dhaka",
    "Bangladesh",
  ],
  openGraph: {
    title: "Md. Rakibul Islam | Software Engineer",
    description:
      "I build high-performance SaaS products and robust web applications using Next.js, React, TypeScript, and Node.js.",
    type: "website",
    url: "https://rakibutsho.dev/",
    siteName: "Md. Rakibul Islam Portfolio",
  },
  alternates: {
    canonical: "https://rakibutsho.dev/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${openSans.variable} ${playfair.variable} ${roboto.variable} antialiased bg-textured text-white`}
      >
        <ReduxProvider>
          <main>
            {children}
          </main>
          <ToastProvider />
          <Analytics />
          <SpeedInsights />
        </ReduxProvider>
      </body>
    </html>
  );
}
