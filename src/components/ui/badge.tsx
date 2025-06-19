import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex justify-center items-center gap-1 px-2 py-0.5 border aria-invalid:border-destructive focus-visible:border-ring rounded-md aria-invalid:ring-destructive/20 focus-visible:ring-[3px] focus-visible:ring-ring/50 dark:aria-invalid:ring-destructive/40 w-fit font-medium text-xs whitespace-nowrap transition-[color,box-shadow] overflow-hidden [&>svg]:pointer-events-none shrink-0 [&>svg]:size-3",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        // Card deck themed variants
        card: "border-border bg-gradient-to-br from-card to-card/90 text-card-foreground shadow-md [a&]:hover:shadow-lg [a&]:hover:scale-105 transition-all duration-300",
        "card-red":
          "border-red-800 bg-gradient-to-br from-red-500 to-red-700 text-white shadow-md [a&]:hover:shadow-lg [a&]:hover:shadow-red-500/25 [a&]:hover:scale-105 transition-all duration-300",
        "card-black":
          "border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-md [a&]:hover:shadow-lg [a&]:hover:shadow-gray-800/25 [a&]:hover:scale-105 transition-all duration-300",
        "suit-heart":
          "border-red-200 bg-gradient-to-br from-red-50 to-red-100 text-red-700 shadow-sm [a&]:hover:bg-red-100 [a&]:hover:scale-105 transition-all duration-300",
        "suit-diamond":
          "border-red-200 bg-gradient-to-br from-orange-50 to-orange-100 text-red-600 shadow-sm [a&]:hover:bg-orange-100 [a&]:hover:scale-105 transition-all duration-300",
        "suit-club":
          "border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 shadow-sm [a&]:hover:bg-gray-100 [a&]:hover:scale-105 transition-all duration-300",
        "suit-spade":
          "border-gray-400 bg-gradient-to-br from-slate-50 to-slate-100 text-slate-800 shadow-sm [a&]:hover:bg-slate-100 [a&]:hover:scale-105 transition-all duration-300",
        "poker-chip":
          "border-2 border-current rounded-full bg-gradient-to-br from-current/10 to-current/20 text-current font-bold shadow-lg [a&]:hover:shadow-xl [a&]:hover:scale-110 transition-all duration-300 relative before:absolute before:inset-1 before:border before:border-dashed before:border-current/40 before:rounded-full",
        "chip-red":
          "border-red-800 bg-gradient-to-br from-red-500 to-red-700 text-white rounded-full shadow-lg [a&]:hover:shadow-xl [a&]:hover:shadow-red-500/30 [a&]:hover:scale-110 transition-all duration-300 relative before:absolute before:inset-1 before:border before:border-dashed before:border-white/60 before:rounded-full",
        "chip-blue":
          "border-blue-800 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full shadow-lg [a&]:hover:shadow-xl [a&]:hover:shadow-blue-500/30 [a&]:hover:scale-110 transition-all duration-300 relative before:absolute before:inset-1 before:border before:border-dashed before:border-white/60 before:rounded-full",
        "chip-green":
          "border-green-900 bg-gradient-to-br from-green-600 to-green-800 text-white rounded-full shadow-lg [a&]:hover:shadow-xl [a&]:hover:shadow-green-600/30 [a&]:hover:scale-110 transition-all duration-300 relative before:absolute before:inset-1 before:border before:border-dashed before:border-white/60 before:rounded-full",
        "chip-gold":
          "border-yellow-700 bg-gradient-to-br from-yellow-400 to-yellow-600 text-yellow-900 rounded-full shadow-lg [a&]:hover:shadow-xl [a&]:hover:shadow-yellow-400/30 [a&]:hover:scale-110 transition-all duration-300 relative before:absolute before:inset-1 before:border before:border-dashed before:border-yellow-800/60 before:rounded-full font-bold",
        "table-felt":
          "border-green-600 bg-gradient-to-br from-green-700 to-green-900 text-green-100 shadow-md table-felt [a&]:hover:shadow-lg [a&]:hover:shadow-green-700/25 [a&]:hover:scale-105 transition-all duration-300",
        dealer:
          "border-purple-500 bg-gradient-to-br from-purple-600 to-purple-800 text-white shadow-md [a&]:hover:shadow-lg [a&]:hover:shadow-purple-600/25 [a&]:hover:scale-105 transition-all duration-300 relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-yellow-400/10 before:to-transparent",
        winner:
          "border-yellow-400 bg-gradient-to-br from-yellow-400 to-yellow-600 text-yellow-900 shadow-lg animate-pulse [a&]:hover:shadow-xl [a&]:hover:shadow-yellow-400/30 [a&]:hover:scale-105 transition-all duration-300 font-bold",
        "hand-count":
          "border-muted bg-gradient-to-br from-muted/80 to-muted/60 text-muted-foreground shadow-sm [a&]:hover:bg-muted [a&]:hover:scale-105 transition-all duration-300 font-mono",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
