"use client";

import { Button } from "@/components/ui/button";
import { LocalCard } from "@/lib/interfaces/cards";
import { cn } from "@/lib/utils";

interface GameControlsProps {
  selectedCards: LocalCard[];
  onPlay: () => void;
  onPass: () => void;
  onClearSelection: () => void;
  onSortByValue: () => void;
  onSortBySuit: () => void;
  canPlay: boolean;
  canPass: boolean;
  isCurrentPlayer: boolean;
  className?: string;
}

export function GameControls({
  selectedCards,
  onPlay,
  onPass,
  onClearSelection,
  canPlay,
  canPass,
  isCurrentPlayer,
  className,
}: GameControlsProps) {
  if (!isCurrentPlayer) {
    return (
      <div className={cn("flex justify-center items-center p-4", className)}>
        <div className="text-gray-500 text-sm">
          Waiting for other players...
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn("flex flex-col gap-4 p-4 bg-gray-50 rounded-lg", className)}
    >
      {/* Selected cards info */}
      {selectedCards.length > 0 && (
        <div className="text-center">
          <div className="mb-2 text-gray-600 text-sm">
            Selected: {selectedCards.length} card
            {selectedCards.length > 1 ? "s" : ""}
          </div>
          <div className="flex flex-wrap justify-center gap-1">
            {selectedCards.map((card, index) => (
              <span
                key={`${card.code}-${index}`}
                className="bg-blue-100 px-2 py-1 rounded text-blue-800 text-xs"
              >
                {card.value}
                {getSuitSymbol(card.suit)}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex justify-center gap-2">
        <Button
          variant="default"
          onClick={onPlay}
          disabled={!canPlay || selectedCards.length === 0}
          className="px-6"
        >
          Play Cards
        </Button>

        <Button
          variant="outline"
          onClick={onPass}
          disabled={!canPass}
          className="px-6"
        >
          Pass
        </Button>

        {selectedCards.length > 0 && (
          <Button variant="ghost" onClick={onClearSelection} className="px-4">
            Clear
          </Button>
        )}
      </div>

      {/* Help text */}
      <div className="text-center text-gray-500 text-xs">
        {selectedCards.length === 0 && "Select cards to play or pass your turn"}
        {selectedCards.length > 0 &&
          !canPlay &&
          "Invalid combination - select different cards"}
        {selectedCards.length > 0 && canPlay && "Ready to play!"}
      </div>
    </div>
  );
}

function getSuitSymbol(suit: string): string {
  const symbols = {
    hearts: "♥",
    diamonds: "♦",
    clubs: "♣",
    spades: "♠",
  };
  return symbols[suit as keyof typeof symbols] || suit;
}
