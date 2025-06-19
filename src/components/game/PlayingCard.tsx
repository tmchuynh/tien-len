"use client";

import {
  SIZE_CLASSES,
  SUIT_COLORS,
  SUIT_SYMBOLS,
} from "@/lib/constants/cards/cards";
import { LocalCard } from "@/lib/interfaces/cards";
import { cn } from "@/lib/utils";

interface PlayingCardProps {
  card: LocalCard;
  isSelected?: boolean;
  isPlayable?: boolean;
  isHighlighted?: boolean; // Special highlighting for required cards
  onClick?: () => void;
  size?: "small" | "medium" | "large";
  className?: string;
}

export function PlayingCard({
  card,
  isSelected = false,
  isPlayable = true,
  isHighlighted = false,
  onClick,
  size = "medium",
  className,
}: PlayingCardProps) {
  const suitSymbol = SUIT_SYMBOLS[card.suit];
  const suitColor = SUIT_COLORS[card.suit];
  const sizeClass = SIZE_CLASSES[size];

  return (
    <div
      className={cn(
        "relative bg-white border-2 border-gray-300 rounded-lg shadow-md cursor-pointer transition-all duration-700 ease-in-out flex flex-col items-center justify-between p-1",
        sizeClass,
        isSelected && "border-blue-500 -translate-y-2 shadow-lg",
        isHighlighted &&
          "border-4 border-yellow-400 -translate-y-4 shadow-xl ring-2 ring-yellow-300 animate-pulse",
        isPlayable && "hover:border-gray-400 hover:-translate-y-3 ",
        !isPlayable && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={isPlayable ? onClick : undefined}
    >
      {/* Top left corner */}
      <div className={cn("flex gap-1 absolute left-1 top-1", suitColor)}>
        <span className="font-bold leading-none">{card.value}</span>
        <span className="text-xs leading-none">{suitSymbol}</span>
      </div>

      {/* Center symbol */}
      <div className={cn("text-2xl m-auto", suitColor)}>{suitSymbol}</div>

      {/* Bottom right corner (rotated) */}
      <div
        className={cn(
          "flex gap-1 absolute right-1 bottom-2 rotate-180",
          suitColor
        )}
      >
        <span className="font-bold leading-none">{card.value}</span>
        <span className="text-xs leading-none">{suitSymbol}</span>
      </div>
    </div>
  );
}
