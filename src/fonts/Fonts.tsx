import {
  Work_Sans,
  Playfair_Display,
  JetBrains_Mono,
} from "next/font/google";

// Body font — clean, modern, pairs great with monospace headings
export const openSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-open-sans",
  display: "swap",
});

// Display font — kept for big hero headlines (elegant contrast)
export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

// Monospace / Terminal font — section labels, badges, terminal panels
export const roboto = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-roboto",
  display: "swap",
});
