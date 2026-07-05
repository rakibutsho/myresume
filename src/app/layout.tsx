import Loading from "@/components/Others/Loader/Loading";
import {
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
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Md. Rakibul Islam | Full-Stack Next.js Engineer",
  description:
    "Portfolio of Md. Rakibul Islam, a full-stack engineer building conversion-ready SaaS interfaces with Next.js, React, TypeScript, and Node.js.",
  keywords: [
    "Rakibul Islam",
    "Full-Stack Engineer",
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
    title: "Md. Rakibul Islam | Full-Stack Next.js Engineer",
    description:
      "I build high-performance SaaS products and full-stack interfaces using Next.js, React, TypeScript, and Node.js.",
    type: "website",
    url: "https://rakib-utsho.vercel.app/",
    siteName: "Md. Rakibul Islam Portfolio",
  },
  alternates: {
    canonical: "https://rakib-utsho.vercel.app/",
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
        className={`${openSans.variable} ${playfair.variable} ${lobster.variable} ${roboto.variable} ${gravitas.variable} ${rowdies.variable} antialiased bg-textured text-white`}
      >
        <Suspense fallback={<Loading />}>
          <ReduxProvider>
            {children}
            <Toaster richColors position="top-right" />
            <Analytics />
          </ReduxProvider>
        </Suspense>
      </body>
    </html>
  );
}
