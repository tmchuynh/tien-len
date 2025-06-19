"use client";

import { LocalCard } from "@/lib/interfaces/cards";
import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "../ui/button";
import { PlayingCard } from "./PlayingCard";

interface PlayerHandProps {
  cards: LocalCard[];
  selectedCards: LocalCard[];
  onCardClick: (card: LocalCard) => void;
  onCardMove?: (fromIndex: number, toIndex: number) => void;
  isCurrentPlayer?: boolean;
  position: "bottom" | "top" | "left" | "right";
  playerName: string;
  cardCount?: number; // For other players where we only show count
  mustPlayThreeOfSpades?: boolean; // Special highlighting for 3 of Spades
  className?: string;
  onSortByValue?: () => void;
  onSortBySuit?: () => void;
}

export function PlayerHand({
  cards,
  selectedCards,
  onCardClick,
  onCardMove,
  onSortByValue,
  onSortBySuit,
  isCurrentPlayer = false,
  position,
  playerName,
  cardCount,
  mustPlayThreeOfSpades = false,
  className,
}: PlayerHandProps) {
  const isOwnCards = position === "bottom";
  const displayCards = isOwnCards ? cards : [];
  const showCardBacks = !isOwnCards && cardCount !== undefined;

  // Debug logging for user's cards
  if (isOwnCards) {
    console.log("🃏 PlayerHand rendering for user:", {
      cardsCount: cards.length,
      selectedCount: selectedCards.length,
      hasOnCardClick: !!onCardClick,
      cards: cards.map(c => c.code)
    });
  }

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    if (!isOwnCards || !onCardMove) return;
    e.dataTransfer.setData("text/plain", index.toString());
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (!isOwnCards || !onCardMove) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    if (!isOwnCards || !onCardMove) return;
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData("text/plain"));
    if (dragIndex !== dropIndex) {
      onCardMove(dragIndex, dropIndex);
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case "bottom":
        return "flex-row justify-center";
      case "top":
        return "flex-row justify-center";
      case "left":
        return "flex-col items-center";
      case "right":
        return "flex-col items-center";
      default:
        return "flex-row justify-center";
    }
  };

  const getCardSpacing = () => {
    if (position === "left" || position === "right") {
      return "-space-y-12";
    }
    return "-space-x-8";
  };

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      {/* Player name and card count */}
      <div className="flex items-center gap-2 my-3">
        <span
          className={cn(
            "font-semibold text-sm px-2 py-1 rounded",
            isCurrentPlayer
              ? "bg-blue-100 text-blue-800"
              : "bg-gray-100 text-gray-700"
          )}
        >
          {playerName}
        </span>
        {!isOwnCards && (
          <span className="text-white text-xs">{cardCount} cards</span>
        )}
      </div>

      {/* Cards */}
      <div className={cn("flex", getPositionClasses(), getCardSpacing())}>
        {isOwnCards
          ? // Show actual cards for current player
            displayCards.map((card, index) => {
              const isSelected = selectedCards.some(
                (selectedCard) => selectedCard.code === card.code
              );
              const isThreeOfSpades = card.code === "3S";
              const shouldHighlight = mustPlayThreeOfSpades && isThreeOfSpades;

              return (
                <div
                  key={`${card.code}-${index}`}
                  draggable={!!onCardMove}
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                  className="relative"
                >
                  <PlayingCard
                    card={card}
                    isSelected={isSelected}
                    isHighlighted={shouldHighlight}
                    onClick={() => onCardClick(card)}
                    size="medium"
                    className={cn(
                      "transition-all duration-200",
                      onCardMove && "cursor-move hover:shadow-lg"
                    )}
                  />
                  {shouldHighlight && (
                    <div className="-top-15 left-1/2 absolute bg-yellow-400 px-2 py-1 rounded-full font-bold text-black text-xs transform -translate-x-1/2 animate-bounce">
                      INCLUDE ME!
                    </div>
                  )}
                </div>
              );
            })
          : showCardBacks
          ? // Show card backs for other players
            Array.from({ length: cardCount! }).map((_, index) => (
              <div
                key={index}
                className={cn(
                  "w-16 h-24 bg-blue-600 border-2 border-blue-700 rounded-lg shadow-md",
                  "bg-gradient-to-br from-blue-500 to-blue-700",
                  "flex items-center justify-center text-white text-xs font-bold"
                )}
              >
                🃏
              </div>
            ))
          : null}
      </div>

      {/* Sorting buttons - only show for user's cards */}
      {isOwnCards && onSortByValue && onSortBySuit && (
        <div className="flex gap-2 mt-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={onSortByValue}
            className="px-3 text-xs"
          >
            Sort by Value
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={onSortBySuit}
            className="px-3 text-xs"
          >
            Sort by Suit
          </Button>
        </div>
      )}
    </div>
  );
}
