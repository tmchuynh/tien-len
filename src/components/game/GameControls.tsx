"use client";

import { Button } from "@/components/ui/button";
import { LocalCard } from "@/lib/interfaces/cards";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface GameControlsProps {
  selectedCards: LocalCard[];
  onPlay: () => void;
  onPass: () => void;
  onClearSelection: () => void;
  canPlay: boolean;
  canPass: boolean;
  isCurrentPlayer: boolean;
  // AI assistance props
  deckId?: string;
  playerName?: string;
  lastPlayedCards?: LocalCard[];
  lastPlayer?: string;
  isFirstPlay?: boolean;
  mustIncludeThreeOfSpades?: boolean;
  showRecommendations?: boolean;
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
  deckId,
  playerName,
  lastPlayedCards = [],
  lastPlayer,
  isFirstPlay = false,
  mustIncludeThreeOfSpades = false,
  showRecommendations = false,
  className,
}: GameControlsProps) {
  const [recommendation, setRecommendation] = useState<{
    isValid: boolean;
    message: string;
    confidence: number;
  } | null>(null);

  // Get play recommendation when cards are selected
  useEffect(() => {
    if (
      selectedCards.length > 0 &&
      showRecommendations &&
      deckId &&
      playerName
    ) {
      getPlayRecommendation();
    } else {
      setRecommendation(null);
    }
  }, [selectedCards, showRecommendations, deckId, playerName, lastPlayedCards]);

  const getPlayRecommendation = async () => {
    if (!deckId || !playerName) return;

    try {
      const { getCardRecommendation } = await import("@/api/cards");

      const cardCodes = selectedCards.map((card) => card.code);
      const gameContext = {
        lastPlayedCards: lastPlayedCards.map((card) => ({
          code: card.code,
          value: card.value.toString(),
          suit: card.suit.toUpperCase() as
            | "HEARTS"
            | "DIAMONDS"
            | "CLUBS"
            | "SPADES",
          image: card.image || "https://deckofcardsapi.com/static/img/back.png",
          images: {
            svg: `https://deckofcardsapi.com/static/img/${card.code}.svg`,
            png:
              card.image ||
              `https://deckofcardsapi.com/static/img/${card.code}.png`,
          },
        })),
        lastPlayer,
        isFirstPlay,
        mustIncludeThreeOfSpades,
      };

      const result = await getCardRecommendation(
        deckId,
        playerName,
        cardCodes,
        gameContext
      );

      setRecommendation({
        isValid: result.isValidPlay,
        message: result.recommendation,
        confidence: result.confidence,
      });
    } catch (error) {
      console.error("Error getting recommendation:", error);
      setRecommendation(null);
    }
  };
  return (
    <>
      {/* AI Recommendation */}
      {recommendation && selectedCards.length > 0 && isCurrentPlayer && (
        <div className="bottom-80 md:bottom-72 left-1/2 z-50 absolute transform -translate-x-1/2 pointer-events-none">
          <div
            className={cn(
              "px-4 py-2 rounded-full text-sm max-w-xs text-center shadow-lg border-2 backdrop-blur-sm",
              recommendation.isValid
                ? "bg-green-500/95 text-white border-green-400"
                : "bg-red-500/95 text-white border-red-400"
            )}
          >
            <div className="font-semibold">
              {recommendation.isValid ? "✅ Valid Play" : "❌ Invalid Play"}
            </div>
            <div className="opacity-90 text-xs">{recommendation.message}</div>
            {recommendation.confidence > 0 && (
              <div className="opacity-75 text-xs">
                Confidence: {Math.round(recommendation.confidence * 100)}%
              </div>
            )}
          </div>
        </div>
      )}

      {/* Selected cards info - positioned to avoid overlap with cards and recommendation */}
      {selectedCards.length > 0 && (
        <div className="bottom-56 md:bottom-48 left-1/2 z-40 absolute transform -translate-x-1/2 pointer-events-none">
          <div className="bg-black/70 shadow-lg backdrop-blur-sm px-4 py-2 border border-gray-500 rounded-full text-sm text-white">
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
        <div className="bottom-56 md:bottom-48 left-1/2 z-40 absolute transform -translate-x-1/2 pointer-events-none">
          <div className="bg-black/70 shadow-lg backdrop-blur-sm px-4 py-2 border border-gray-500 rounded-full text-sm text-white">
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
            disabled={
              !canPlay ||
              selectedCards.length === 0 ||
              (recommendation !== null && !recommendation.isValid)
            }
            className={cn(
              "px-6",
              recommendation &&
                !recommendation.isValid &&
                "opacity-50 cursor-not-allowed"
            )}
            title={
              recommendation && !recommendation.isValid
                ? `Cannot play: ${recommendation.message}`
                : "Play selected cards"
            }
          >
            {recommendation && !recommendation.isValid
              ? "❌ Cannot Play"
              : "Play Cards"}
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
