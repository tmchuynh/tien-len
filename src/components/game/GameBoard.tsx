"use client";

import { LocalCard } from "@/lib/interfaces/cards";
import { cn } from "@/lib/utils";
import {
  moveCard,
  sortCardsBySuit,
  sortCardsByValue,
} from "@/lib/utils/cardSorting";
import { useEffect, useState } from "react";
import { GameControls } from "./GameControls";
import { GameStatus } from "./GameStatus";
import { GameTable } from "./GameTable";
import { PlayerHand } from "./PlayerHand";
import { Player } from "@/lib/interfaces/player";

interface GameBoardProps {
  className?: string;
}

// Mock data for demonstration
const createMockPlayers = (): Player[] => [
  {
    id: "player1",
    name: "You",
    cardCount: 13,
    isActive: true,
    hasFinished: false,
    cards: [
      { code: "3S", value: "3", suit: "spades" },
      { code: "5H", value: "5", suit: "hearts" },
      { code: "7D", value: "7", suit: "diamonds" },
      { code: "JC", value: "J", suit: "clubs" },
      { code: "QS", value: "Q", suit: "spades" },
      { code: "KH", value: "K", suit: "hearts" },
      { code: "AD", value: "A", suit: "diamonds" },
      { code: "2C", value: "2", suit: "clubs" },
      { code: "4S", value: "4", suit: "spades" },
      { code: "6H", value: "6", suit: "hearts" },
      { code: "8D", value: "8", suit: "diamonds" },
      { code: "9C", value: "9", suit: "clubs" },
      { code: "10S", value: "10", suit: "spades" },
    ],
  },
  {
    id: "player2",
    name: "Alice",
    cardCount: 12,
    isActive: false,
    hasFinished: false,
  },
  {
    id: "player3",
    name: "Bob",
    cardCount: 11,
    isActive: false,
    hasFinished: false,
  },
  {
    id: "player4",
    name: "Charlie",
    cardCount: 13,
    isActive: false,
    hasFinished: false,
  },
];

const mockLastPlayedCards: LocalCard[] = [
  { code: "8H", value: "8", suit: "hearts" },
  { code: "8D", value: "8", suit: "diamonds" },
];

export function GameBoard({ className }: GameBoardProps) {
  const [players, setPlayers] = useState<Player[]>(createMockPlayers());
  const [selectedCards, setSelectedCards] = useState<LocalCard[]>([]);
  const [lastPlayedCards, setLastPlayedCards] =
    useState<LocalCard[]>(mockLastPlayedCards);
  const [lastPlayer, setLastPlayer] = useState<string>("Alice");
  const [gamePhase, setGamePhase] = useState<
    "waiting" | "playing" | "finished"
  >("playing");
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  const currentPlayer = players[currentPlayerIndex];
  const isCurrentPlayerActive = currentPlayer?.id === "player1";

  const handleCardClick = (card: LocalCard) => {
    if (!isCurrentPlayerActive) return;

    setSelectedCards((prev) => {
      const isAlreadySelected = prev.some((c) => c.code === card.code);
      if (isAlreadySelected) {
        return prev.filter((c) => c.code !== card.code);
      } else {
        return [...prev, card];
      }
    });
  };

  const handlePlay = () => {
    if (!isCurrentPlayerActive || selectedCards.length === 0) return;

    // Move selected cards to center
    setLastPlayedCards([...selectedCards]);
    setLastPlayer(currentPlayer.name);

    // Remove cards from player's hand
    setPlayers((prev) =>
      prev.map((player) => {
        if (player.id === "player1") {
          const remainingCards =
            player.cards?.filter(
              (card) =>
                !selectedCards.some((selected) => selected.code === card.code)
            ) || [];
          return {
            ...player,
            cards: remainingCards,
            cardCount: remainingCards.length,
            hasFinished: remainingCards.length === 0,
          };
        }
        return player;
      })
    );

    // Clear selection
    setSelectedCards([]);

    // Move to next player
    setCurrentPlayerIndex((prev) => (prev + 1) % players.length);
  };

  const handlePass = () => {
    if (!isCurrentPlayerActive) return;
    setSelectedCards([]);
    setCurrentPlayerIndex((prev) => (prev + 1) % players.length);
  };

  const handleClearSelection = () => {
    setSelectedCards([]);
  };

  const handleSortByValue = () => {
    if (!isCurrentPlayerActive) return;
    setPlayers((prev) =>
      prev.map((player) => {
        if (player.id === "player1" && player.cards) {
          return {
            ...player,
            cards: sortCardsByValue(player.cards),
          };
        }
        return player;
      })
    );
  };

  const handleSortBySuit = () => {
    if (!isCurrentPlayerActive) return;
    setPlayers((prev) =>
      prev.map((player) => {
        if (player.id === "player1" && player.cards) {
          return {
            ...player,
            cards: sortCardsBySuit(player.cards),
          };
        }
        return player;
      })
    );
  };

  const handleCardMove = (fromIndex: number, toIndex: number) => {
    if (!isCurrentPlayerActive) return;
    setPlayers((prev) =>
      prev.map((player) => {
        if (player.id === "player1" && player.cards) {
          return {
            ...player,
            cards: moveCard(player.cards, fromIndex, toIndex),
          };
        }
        return player;
      })
    );
  };

  // Check for game end
  useEffect(() => {
    const winner = players.find((player) => player.hasFinished);
    if (winner) {
      setGamePhase("finished");
    }
  }, [players]);

  // Update active player
  useEffect(() => {
    setPlayers((prev) =>
      prev.map((player, index) => ({
        ...player,
        isActive: index === currentPlayerIndex,
      }))
    );
  }, [currentPlayerIndex]);

  const canPlay = selectedCards.length > 0 && isCurrentPlayerActive;
  const canPass = isCurrentPlayerActive;

  return (
    <div
      className={cn(
        "w-full h-screen table-felt relative overflow-hidden",
        className
      )}
    >
      {/* Top player */}
      <div className="top-4 left-1/2 absolute transform -translate-x-1/2">
        <PlayerHand
          cards={[]}
          selectedCards={[]}
          onCardClick={() => {}}
          position="top"
          playerName={players[2]?.name || "Player 3"}
          cardCount={players[2]?.cardCount || 0}
        />
      </div>

      {/* Left player */}
      <div className="top-1/2 left-4 absolute transform -translate-y-1/2">
        <PlayerHand
          cards={[]}
          selectedCards={[]}
          onCardClick={() => {}}
          position="left"
          playerName={players[3]?.name || "Player 4"}
          cardCount={players[3]?.cardCount || 0}
        />
      </div>

      {/* Right player */}
      <div className="top-1/2 right-4 absolute transform -translate-y-1/2">
        <PlayerHand
          cards={[]}
          selectedCards={[]}
          onCardClick={() => {}}
          position="right"
          playerName={players[1]?.name || "Player 2"}
          cardCount={players[1]?.cardCount || 0}
        />
      </div>

      {/* Center game table */}
      <div className="top-1/2 left-1/2 absolute transform -translate-x-1/2 -translate-y-1/2">
        <GameTable
          lastPlayedCards={lastPlayedCards}
          lastPlayer={lastPlayer}
          currentPlayer={currentPlayer?.name || ""}
          gamePhase={gamePhase}
        />
      </div>

      {/* Game status - top right */}
      <div className="top-4 right-4 absolute w-64">
        <GameStatus
          players={players}
          gamePhase={gamePhase}
          winner={players.find((p) => p.hasFinished)?.name}
          onNewGame={() => {
            // Reset game state
            setPlayers(createMockPlayers());
            setSelectedCards([]);
            setLastPlayedCards([]);
            setLastPlayer("");
            setGamePhase("playing");
            setCurrentPlayerIndex(0);
          }}
        />
      </div>

      {/* Bottom player (current player) */}
      <div className="bottom-20 left-1/2 absolute transform -translate-x-1/2">
        <PlayerHand
          cards={currentPlayer?.cards || []}
          selectedCards={selectedCards}
          onCardClick={handleCardClick}
          onCardMove={handleCardMove}
          isCurrentPlayer={isCurrentPlayerActive}
          position="bottom"
          playerName={currentPlayer?.name || "You"}
        />
      </div>

      {/* Game controls */}
      <div className="bottom-4 left-1/2 absolute transform -translate-x-1/2">
        <GameControls
          selectedCards={selectedCards}
          onPlay={handlePlay}
          onPass={handlePass}
          onClearSelection={handleClearSelection}
          onSortByValue={handleSortByValue}
          onSortBySuit={handleSortBySuit}
          canPlay={canPlay}
          canPass={canPass}
          isCurrentPlayer={isCurrentPlayerActive}
        />
      </div>
    </div>
  );
}
