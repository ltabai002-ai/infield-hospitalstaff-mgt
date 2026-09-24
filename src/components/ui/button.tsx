import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground shadow-button hover:-translate-y-0.5 hover:bg-primary-hover",
        outline: "border border-primary bg-background text-primary hover:-translate-y-0.5 hover:bg-soft-blue",
        light: "bg-background text-primary shadow-button hover:-translate-y-0.5 hover:bg-soft-blue",
      },
      size: {
        default: "h-12",
        compact: "h-11 px-4",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

type Props = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: Props) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
