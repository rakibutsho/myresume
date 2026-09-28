import type { Metadata } from "next";
import ReduxProvider from "@/redux/Provider";
import ClientToast from "@/components/Others/ToastProvider/ClientToast";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://rakibutsho.dev/"),
  title: "Md. Rakibul Islam | Frontend Engineer",
  description:
    "Frontend engineer in Dhaka building production dashboards with Next.js and TypeScript. Builds SpiderNode, an open-source uptime monitor.",
  keywords: [
    "Md. Rakibul Islam",
    "rakibutsho",
    "Rakibul Islam",
    "Frontend Developer",
    "Frontend Engineer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Node.js",
    "MongoDB",
    "PostgreSQL",
    "Web Performance",
    "Dashboard Development",
    "Dhaka",
    "Bangladesh",
    "SM Technology",
    "SpiderNode",
  ],
  authors: [{ name: "Md. Rakibul Islam", url: "https://rakibutsho.dev" }],
  creator: "Md. Rakibul Islam",
  openGraph: {
    title: "Md. Rakibul Islam | Frontend Engineer",
    description:
      "Frontend engineer in Dhaka building production dashboards with Next.js and TypeScript. Builds SpiderNode, an open-source uptime monitor.",
    type: "website",
    url: "https://rakibutsho.dev/",
    siteName: "Md. Rakibul Islam",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Md. Rakibul Islam | Frontend Engineer",
    description:
      "Frontend engineer building production dashboards with Next.js and TypeScript.",
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

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Md. Rakibul Islam",
  url: "https://rakibutsho.dev",
  jobTitle: "Frontend Engineer",
  worksFor: {
    "@type": "Organization",
    name: "SM Technology",
  },
  address: "Dhaka, Bangladesh",
  sameAs: [
    "https://github.com/rakibutsho",
    "https://www.linkedin.com/in/rakibutsho",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="antialiased bg-textured text-white"
      >
        <ReduxProvider>
          <main>{children}</main>
          <ClientToast />
        </ReduxProvider>
      </body>
    </html>
  );
}
