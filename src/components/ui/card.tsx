import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

// Card suit icons
const HeartIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const SpadeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L4.5 9.5C4.5 12.5 7 15 10 15h1v3c0 1.1.9 2 2 2s2-.9 2-2v-3h1c3 0 5.5-2.5 5.5-5.5L12 2z" />
  </svg>
);

const DiamondIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l6 10-6 10L6 12z" />
  </svg>
);

const ClubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2c-1.5 0-3 1.5-3 3 0 1 .5 2 1.5 2.5-1.5.5-2.5 2-2.5 3.5 0 2 1.5 4 4 4h1v3c0 1.1.9 2 2 2s2-.9 2-2v-3h1c2.5 0 4-2 4-4 0-1.5-1-3-2.5-3.5C18.5 7 19 6 19 5c0-1.5-1.5-3-3-3-1 0-2 .5-2.5 1.5C13 2.5 12 2 12 2z" />
  </svg>
);

const cardVariants = cva(
  "relative flex flex-col transition-all duration-300 select-none",
  {
    variants: {
      variant: {
        // Standard UI card
        default:
          "bg-card text-card-foreground gap-6 rounded-xl border py-6 shadow-sm",

        // Playing card variants
        "playing-card":
          "bg-gradient-to-br from-white to-gray-50 border-2 border-gray-300 rounded-lg shadow-lg hover:shadow-xl aspect-[2.5/3.5] p-2 cursor-pointer hover:scale-105 active:scale-95",

        "card-back":
          "bg-gradient-to-br from-blue-600 to-blue-800 border-2 border-blue-900 rounded-lg shadow-lg aspect-[2.5/3.5] p-2 cursor-pointer hover:scale-105 active:scale-95 relative overflow-hidden",

        "card-red":
          "bg-gradient-to-br from-white to-red-50 border-2 border-red-200 rounded-lg shadow-lg hover:shadow-xl aspect-[2.5/3.5] p-2 cursor-pointer hover:scale-105 active:scale-95 text-red-600",

        "card-black":
          "bg-gradient-to-br from-white to-gray-50 border-2 border-gray-300 rounded-lg shadow-lg hover:shadow-xl aspect-[2.5/3.5] p-2 cursor-pointer hover:scale-105 active:scale-95 text-gray-800",

        // Special card states
        "card-selected":
          "bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-400 rounded-lg shadow-xl aspect-[2.5/3.5] p-2 cursor-pointer scale-105 ring-2 ring-yellow-400/50",

        "card-disabled":
          "bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-400 rounded-lg shadow-sm aspect-[2.5/3.5] p-2 opacity-50 cursor-not-allowed text-gray-500",

        "card-highlight":
          "bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-400 rounded-lg shadow-xl aspect-[2.5/3.5] p-2 cursor-pointer hover:scale-105 active:scale-95 ring-2 ring-green-400/50 text-green-700",

        // Game area cards
        "table-card":
          "bg-gradient-to-br from-white to-gray-50 border-2 border-gray-300 rounded-lg shadow-md aspect-[2.5/3.5] p-2 transform rotate-1 hover:rotate-0 transition-transform duration-300",

        "deck-card":
          "bg-gradient-to-br from-blue-600 to-blue-800 border-2 border-blue-900 rounded-lg shadow-lg aspect-[2.5/3.5] cursor-pointer hover:shadow-xl",

        "discard-pile":
          "bg-gradient-to-br from-gray-200 to-gray-300 border-2 border-gray-400 rounded-lg shadow-md aspect-[2.5/3.5] p-2 opacity-75",
      },
      size: {
        default: "",
        sm: "scale-75",
        lg: "scale-125",
        xl: "scale-150",
        // Card-specific sizes based on real playing card dimensions
        "bridge-size": "w-16 h-24", // Bridge cards: 2.25" × 3.5" (narrower)
        "poker-size": "w-18 h-28", // Poker cards: 2.5" × 3.5" (standard)
        "bridge-sm": "w-12 h-18", // Small bridge cards
        "poker-sm": "w-14 h-20", // Small poker cards
        "bridge-lg": "w-20 h-32", // Large bridge cards
        "poker-lg": "w-24 h-36", // Large poker cards
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Type for card props with variants
type CardProps = React.ComponentProps<"div"> &
  VariantProps<typeof cardVariants> & {
    suit?: "hearts" | "diamonds" | "clubs" | "spades";
    value?: string | number;
    isFlipped?: boolean;
  };

function Card({
  className,
  variant,
  size,
  suit,
  value,
  isFlipped = false,
  ...props
}: CardProps) {
  const getSuitIcon = () => {
    switch (suit) {
      case "hearts":
        return <HeartIcon className="w-4 h-4" />;
      case "diamonds":
        return <DiamondIcon className="w-4 h-4" />;
      case "clubs":
        return <ClubIcon className="w-4 h-4" />;
      case "spades":
        return <SpadeIcon className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getSuitColor = () => {
    return suit === "hearts" || suit === "diamonds"
      ? "text-red-600"
      : "text-gray-800";
  };

  const isPlayingCard =
    variant?.includes("card-") || variant === "playing-card";

  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ variant, size }), className)}
      {...props}
    >
      {isPlayingCard ? (
        <>
          {/* Card back pattern when flipped */}
          {(isFlipped ||
            variant === "card-back" ||
            variant === "deck-card") && (
            <div className="absolute inset-0 flex justify-center items-center">
              <div
                className="bg-repeat opacity-20 w-full h-full"
                style={{
                  backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 2px, transparent 2px),
                                   radial-gradient(circle at 75% 75%, rgba(255,255,255,0.2) 2px, transparent 2px)`,
                  backgroundSize: "20px 20px",
                }}
              />
            </div>
          )}

          {/* Card front content when not flipped */}
          {!isFlipped && variant !== "card-back" && variant !== "deck-card" && (
            <>
              {/* Top left corner */}
              <div
                className={cn(
                  "absolute top-1 left-1 flex flex-col items-center",
                  getSuitColor()
                )}
              >
                <div className="font-bold text-sm leading-none">{value}</div>
                {getSuitIcon()}
              </div>

              {/* Bottom right corner (rotated) */}
              <div
                className={cn(
                  "absolute bottom-1 right-1 flex flex-col items-center rotate-180",
                  getSuitColor()
                )}
              >
                <div className="font-bold text-sm leading-none">{value}</div>
                {getSuitIcon()}
              </div>

              {/* Center suit icon for face cards or aces */}
              {(value === "A" ||
                value === "K" ||
                value === "Q" ||
                value === "J") && (
                <div
                  className={cn(
                    "absolute inset-0 flex items-center justify-center",
                    getSuitColor()
                  )}
                >
                  {React.cloneElement(getSuitIcon() || <div />, {
                    className: "w-8 h-8",
                  })}
                </div>
              )}

              {/* Multiple suit icons for number cards */}
              {typeof value === "number" && value > 1 && value <= 10 && (
                <div
                  className={cn(
                    "absolute inset-2 flex flex-col justify-between",
                    getSuitColor()
                  )}
                >
                  {[...Array(Math.min(value, 5))].map((_, i) => (
                    <div key={i} className="flex justify-center">
                      {getSuitIcon()}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </>
      ) : (
        // Standard UI card content (existing functionality)
        props.children
      )}
    </div>
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
