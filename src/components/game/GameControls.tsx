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
    <div className="bottom-0 left-1/2 absolute border w-full h-[20em] transform -translate-x-1/2">
      <div className={cn("flex flex-col gap-4 p-4 rounded-lg", className)}>
        {!isCurrentPlayer && (
          <div className="text-center">
            <div className="mb-2 text-2xl text-white">
              Waiting for other players...
            </div>
          </div>
        )}

        {/* Selected cards info */}
        {selectedCards.length > 0 && (
          <div className="text-center">
            <div className="mb-2 text-sm text-white">
              Selected: {selectedCards.length} card
              {selectedCards.length > 1 ? "s" : ""}
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {selectedCards.map((card, index) => (
                <span
                  key={`${card.code}-${index}`}
                  className="bg-blue-100 px-2 py-1 rounded text-blue-800 text-sm"
                >
                  {card.value}
                  {getSuitSymbol(card.suit)}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="bottom-5 left-1/2 absolute flex justify-center gap-2 transform -translate-x-1/3">
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
