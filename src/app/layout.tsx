import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { Suspense } from "react";
import ReduxProvider from "@/redux/Provider";
import Loading from "@/components/Others/Loader/Loading";
import {
  gravitas,
  lobster,
  openSans,
  playfair,
  roboto,
  rowdies,
} from "@/fonts/Fonts";

export const metadata: Metadata = {
  title: "Md. Rakibul Islam — Software Engineer",
  description:
    "Portfolio of Md. Rakibul Islam — a passionate Software Engineer from Dhaka, Bangladesh. Specializing in JavaScript, React, Next.js, MERN Stack, and Go.",
  keywords: [
    "Rakibul Islam",
    "Software Engineer",
    "Frontend Developer",
    "React Developer",
    "Next.js",
    "MERN Stack",
    "Dhaka",
    "Bangladesh",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.variable} ${playfair.variable} ${lobster.variable} ${roboto.variable} ${gravitas.variable} ${rowdies.variable} antialiased bg-textured text-white`}
      >
        <Suspense fallback={<Loading />}>
          <ReduxProvider>
            {children}
            <Toaster richColors position="top-right" />
          </ReduxProvider>
        </Suspense>
      </body>
    </html>
  );
}
