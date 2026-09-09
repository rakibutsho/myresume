// Fonts are loaded via CSS @import in globals.css (Google Fonts at browser runtime).
// These stubs satisfy the layout.tsx destructuring without requiring next/font/google
// network access at build time (which fails in sandboxed/offline environments).

type FontModule = {
  variable: string;
  className: string;
  style: { fontFamily: string };
};

const stub = (variable: string): FontModule => ({
  variable,
  className: "",
  style: { fontFamily: "inherit" },
});

export const openSans = stub("font-sans");
export const playfair = stub("font-serif");
export const roboto = stub("font-mono");
