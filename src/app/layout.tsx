import Loading from "@/components/Others/Loader/Loading";
import {
  blackOps,
  gravitas,
  lobster,
  openSans,
  playfair,
  roboto,
  rowdies,
} from "@/fonts/Fonts";
import ReduxProvider from "@/redux/Provider";
import type { Metadata } from "next";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

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
        className={`${openSans.variable} ${playfair.variable} ${lobster.variable} ${roboto.variable} ${gravitas.variable} ${rowdies.variable} ${blackOps.variable} antialiased bg-textured text-white`}
      >
        <ReduxProvider>
          {children}
          <ToastContainer position="top-right" theme="dark" />
          <Analytics />
        </ReduxProvider>
      </body>
    </html>
  );
}
