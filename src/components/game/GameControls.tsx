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
    <>
      {/* Selected cards info - positioned higher up to not interfere with sorting buttons */}
      {selectedCards.length > 0 && (
        <div className="bottom-32 left-1/2 absolute transform -translate-x-1/2 pointer-events-none">
          <div className="bg-black/50 shadow-lg px-4 py-2 rounded-full text-sm text-white">
            Selected: {selectedCards.length} card
            {selectedCards.length > 1 ? "s" : ""} -{" "}
            {selectedCards
              .map((card) => `${card.value}${getSuitSymbol(card.suit)}`)
              .join(", ")}
          </div>
        </div>
      )}

      {/* Waiting message */}
      {!isCurrentPlayer && (
        <div className="bottom-32 left-1/2 absolute transform -translate-x-1/2 pointer-events-none">
          <div className="bg-black/50 shadow-lg px-4 py-2 rounded-full text-sm text-white">
            Waiting for other players...
          </div>
        </div>
      )}

      {/* Action buttons - fixed at bottom */}
      <div className="bottom-4 left-1/2 absolute transform -translate-x-1/2 pointer-events-none">
        <div
          className={cn(
            "flex justify-center gap-2 p-2 pointer-events-auto",
            className
          )}
        >
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
    </>
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
