"use client";

import { LocalCard } from "@/lib/interfaces/cards";
import { cn } from "@/lib/utils";
import { PlayingCard } from "./PlayingCard";

interface GameTableProps {
  lastPlayedCards: LocalCard[];
  lastPlayer?: string;
  currentPlayer: string;
  gamePhase: "waiting" | "playing" | "finished";
  className?: string;
}

export function GameTable({
  lastPlayedCards,
  lastPlayer,
  currentPlayer,
  gamePhase,
  className,
}: GameTableProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center  gap-4 p-8",
        className
      )}
    >
      {/* Game status */}
      <div className="text-center">
        <div className="font-semibold text-gray-800 text-lg">
          {gamePhase === "waiting" && "Waiting for game to start..."}
          {gamePhase === "playing" && `${currentPlayer}'s turn`}
          {gamePhase === "finished" && "Game finished!"}
        </div>
        {lastPlayer && lastPlayedCards.length > 0 && (
          <div className="mt-1 text-gray-600 text-sm">
            Last played by {lastPlayer}
          </div>
        )}
      </div>

      {/* Center play area */}
      <div className="flex justify-center items-center bg-green-50 p-4 border-2 border-gray-300 border-dashed rounded-lg min-w-64 min-h-32">
        {lastPlayedCards.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-2">
            {lastPlayedCards.map((card, index) => (
              <PlayingCard
                key={`${card.code}-${index}`}
                card={card}
                isPlayable={false}
                size="medium"
                className="shadow-lg"
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400">
            <div className="mb-2 text-4xl">🃏</div>
            <div className="text-sm">No cards played yet</div>
          </div>
        )}
      </div>

      {/* Play type indicator */}
      {lastPlayedCards.length > 0 && (
        <div className="bg-gray-100 px-2 py-1 rounded text-gray-500 text-xs">
          {getPlayType(lastPlayedCards)}
        </div>
      )}
    </div>
  );
}

function getPlayType(cards: LocalCard[]): string {
  if (cards.length === 1) return "Single";
  if (cards.length === 2) return "Pair";
  if (cards.length === 3) return "Triple";
  if (cards.length === 4) return "Quad";
  if (cards.length >= 3) {
    // Check if it's a straight (simplified check)
    return "Straight";
  }
  return `${cards.length} cards`;
}
