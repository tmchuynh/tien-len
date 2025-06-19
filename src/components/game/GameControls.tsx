"use client";

import { Button } from "@/components/ui/button";
import { LocalCard } from "@/lib/interfaces/cards";
import { cn } from "@/lib/utils";

interface GameControlsProps {
  selectedCards: LocalCard[];
  onPlay: () => void;
  onPass: () => void;
  onClearSelection: () => void;
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
  return (
    <div className="bottom-0 left-1/2 absolute border w-full h-16 transform -translate-x-1/2 pointer-events-none">
      <div className={cn("flex flex-col gap-4 p-4 rounded-lg pointer-events-auto", className)}>
        {!isCurrentPlayer && (
          <div className="text-center">
            <div className="mb-2 text-lg text-white">
              Waiting for other players...
            </div>
          </div>
        )}

        {/* Selected cards info */}
        {selectedCards.length > 0 && (
          <div className="text-center mb-2">
            <div className="text-sm text-white">
              Selected: {selectedCards.length} card
              {selectedCards.length > 1 ? "s" : ""} - {selectedCards.map(card => `${card.value}${getSuitSymbol(card.suit)}`).join(", ")}
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
            variant="card"
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
