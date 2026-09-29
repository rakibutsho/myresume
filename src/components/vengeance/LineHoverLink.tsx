import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type LineHoverVariant = "slide" | "grow";

interface LineHoverLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: LineHoverVariant;
  className?: string;
  children: React.ReactNode;
}

export function LineHoverLink({
  href,
  variant = "slide",
  className,
  children,
  ...props
}: LineHoverLinkProps) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");

  const lineStyle =
    variant === "slide"
      ? "scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 transition-transform duration-300 origin-left"
      : "opacity-0 group-hover:opacity-100 transition-opacity duration-200";

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "group relative inline-flex items-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400 rounded-sm",
          className,
        )}
        {...props}
      >
        <span>{children}</span>
        <span
          className={cn("absolute bottom-0 left-0 h-px w-full bg-current pointer-events-none", lineStyle)}
          aria-hidden
        />
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-flex items-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400 rounded-sm",
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      <span
        className={cn("absolute bottom-0 left-0 h-px w-full bg-current pointer-events-none", lineStyle)}
        aria-hidden
      />
    </Link>
  );
}
