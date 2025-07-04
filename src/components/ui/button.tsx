import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex justify-center items-center gap-2 disabled:opacity-50 aria-invalid:border-destructive focus-visible:border-ring rounded-md aria-invalid:ring-destructive/20 focus-visible:ring-[3px] focus-visible:ring-ring/50 dark:aria-invalid:ring-destructive/40 font-medium text-sm whitespace-nowrap transition-all [&_svg]:pointer-events-none disabled:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        // Card deck themed variants
        card: "bg-gradient-to-br from-card to-card/90 text-card-foreground border-2 border-border rounded-lg shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent",
        "card-red":
          "bg-gradient-to-br from-red-500 to-red-700 text-white border-2 border-red-800 rounded-lg shadow-lg hover:shadow-xl hover:shadow-red-500/25 hover:scale-105 active:scale-95 transition-all duration-300 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent",
        "card-black":
          "bg-gradient-to-br from-gray-800 to-gray-900 text-white border-2 border-gray-700 rounded-lg shadow-lg hover:shadow-xl hover:shadow-gray-800/25 hover:scale-105 active:scale-95 transition-all duration-300 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent",
        "poker-chip-red":
          "bg-gradient-to-br from-red-500 to-red-700 text-white border-4 border-red-800 rounded-full shadow-lg hover:shadow-xl hover:shadow-red-500/30 hover:scale-110 active:scale-95 transition-all duration-300 relative overflow-hidden before:absolute before:inset-2 before:border-2 before:border-dashed before:border-white/60 before:rounded-full",
        "poker-chip-blue":
          "bg-gradient-to-br from-blue-500 to-blue-700 text-white border-4 border-blue-800 rounded-full shadow-lg hover:shadow-xl hover:shadow-blue-500/30 hover:scale-110 active:scale-95 transition-all duration-300 relative overflow-hidden before:absolute before:inset-2 before:border-2 before:border-dashed before:border-white/60 before:rounded-full",
        "poker-chip-green":
          "bg-gradient-to-br from-green-600 to-green-800 text-white border-4 border-green-900 rounded-full shadow-lg hover:shadow-xl hover:shadow-green-600/30 hover:scale-110 active:scale-95 transition-all duration-300 relative overflow-hidden before:absolute before:inset-2 before:border-2 before:border-dashed before:border-white/60 before:rounded-full",
        "poker-chip-gold":
          "bg-gradient-to-br from-yellow-400 to-yellow-600 text-yellow-900 border-4 border-yellow-700 rounded-full shadow-lg hover:shadow-xl hover:shadow-yellow-400/30 hover:scale-110 active:scale-95 transition-all duration-300 relative overflow-hidden before:absolute before:inset-2 before:border-2 before:border-dashed before:border-yellow-800/60 before:rounded-full font-bold",
        "table-felt":
          "text-green-100 border-2 border-green-600 rounded-lg shadow-lg hover:shadow-xl hover:shadow-green-700/25 hover:scale-105 active:scale-95 transition-all duration-300 relative overflow-hidden table-felt",
        dealer:
          "bg-gradient-to-br from-purple-600 to-purple-800 text-white border-2 border-purple-500 rounded-lg shadow-lg hover:shadow-xl hover:shadow-purple-600/25 hover:scale-105 active:scale-95 transition-all duration-300 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-gold/10 before:to-transparent",
        winner:
          "bg-gradient-to-br from-yellow-400 to-yellow-600 text-yellow-900 shadow-lg animate-pulse hover:shadow-xl hover:shadow-yellow-400/30 hover:scale-105 active:scale-95 transition-all duration-300 font-bold",
        "hand-count":
          "border-muted bg-gradient-to-br from-muted/80 to-muted/60 text-muted-foreground shadow-sm hover:bg-muted hover:scale-105 transition-all duration-300 font-mono",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        chip: "size-12 aspect-square", // Special size for poker chips
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
