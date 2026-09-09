import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-background",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-fg-muted font-semibold",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-border bg-transparent text-foreground hover:border-foreground hover:bg-surface",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-surface-raised",
        ghost:
          "text-muted-foreground hover:bg-surface hover:text-foreground",
        link:
          "text-foreground underline-offset-4 hover:underline",
        swiss:
          "bg-transparent text-fg-subtle uppercase text-2xs font-bold tracking-widest border-b border-transparent hover:border-foreground hover:text-foreground p-0 h-auto rounded-none transition-all",
        "swiss-accent":
          "bg-accent text-accent-foreground uppercase text-2xs font-bold tracking-widest px-3 py-1 rounded-none hover:bg-accent/90",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-10 px-8 text-base",
        icon: "h-9 w-9",
        none: "p-0 h-auto",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
