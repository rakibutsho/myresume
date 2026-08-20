import { openSans, playfair, roboto } from "@/fonts/Fonts";
import ReduxProvider from "@/redux/Provider";
import type { Metadata } from "next";
import ClientToast from "@/components/Others/ToastProvider/ClientToast";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://rakibutsho.dev/"),
  title: "Md. Rakibul Islam | Full-Stack Software Engineer",
  description:
    "Portfolio of Md. Rakibul Islam, a Full-Stack Software Engineer turning ambitious ideas into production-ready software with React, Next.js, TypeScript, and Node.js.",
  keywords: [
    "Md. Rakibul Islam",
    "rakibutsho",
    "Rakibul Islam",
    "Full-Stack Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "React.js",
    "Next.js",
    "TypeScript",
    "Node.js",
    "MongoDB",
    "PostgreSQL",
    "System Architecture",
    "Web Performance",
    "Dhaka",
    "Bangladesh",
  ],
  authors: [{ name: "Md. Rakibul Islam", url: "https://rakibutsho.dev" }],
  creator: "Md. Rakibul Islam",
  openGraph: {
    title: "Md. Rakibul Islam | Full-Stack Software Engineer",
    description:
      "Bridging the gap between scalable architecture and pixel-perfect user interfaces. Explore my projects, skills, and experience.",
    type: "website",
    url: "https://rakibutsho.dev/",
    siteName: "Md. Rakibul Islam Portfolio",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Md. Rakibul Islam | Full-Stack Software Engineer",
    description: "Turning ambitious ideas into production-ready software.",
    creator: "@rakibutsho",
  },
  alternates: {
    canonical: "https://rakibutsho.dev/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
          <ClientToast />
        </ReduxProvider>
      </body>
    </html>
  );
}
