"use client";

import {
  createTienLenDeck,
  dealTienLenHands,
  findPlayerWithThreeOfSpades,
  getPlayerHand,
  playCardsToTable,
} from "@/api/cards";
import { LocalCard } from "@/lib/interfaces/cards";
import { Player } from "@/lib/interfaces/player";
import { cn } from "@/lib/utils";
import {
  moveCard,
  sortCardsBySuit,
  sortCardsByValue,
} from "@/lib/utils/cardSorting";
import { convertCardsToLocal } from "@/lib/utils/cards";
import { useEffect, useState } from "react";
import { GameControls } from "./GameControls";
import { GameStatus } from "./GameStatus";
import { GameTable } from "./GameTable";
import { PlayerHand } from "./PlayerHand";

interface GameBoardProps {
  className?: string;
}

// Create initial empty players
const createInitialPlayers = (): Player[] => [
  {
    id: "player1",
    name: "You",
    cardCount: 0,
    isActive: true,
    hasFinished: false,
    cards: [],
  },
  {
    id: "player2",
    name: "Alice",
    cardCount: 0,
    isActive: false,
    hasFinished: false,
  },
  {
    id: "player3",
    name: "Bob",
    cardCount: 0,
    isActive: false,
    hasFinished: false,
  },
  {
    id: "player4",
    name: "Charlie",
    cardCount: 0,
    isActive: false,
    hasFinished: false,
  },
];

const mockLastPlayedCards: LocalCard[] = [];

export function GameBoard({ className }: GameBoardProps) {
  const [players, setPlayers] = useState<Player[]>(createInitialPlayers());
  const [selectedCards, setSelectedCards] = useState<LocalCard[]>([]);
  const [lastPlayedCards, setLastPlayedCards] = useState<LocalCard[]>(mockLastPlayedCards);
  const [lastPlayer, setLastPlayer] = useState<string>("");
  const [gamePhase, setGamePhase] = useState<"waiting" | "playing" | "finished">("waiting");
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [deckId, setDeckId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isFirstPlay, setIsFirstPlay] = useState<boolean>(true);
  const [mustPlayThreeOfSpades, setMustPlayThreeOfSpades] =
    useState<boolean>(false);

  const currentPlayer = players[currentPlayerIndex];
  const isCurrentPlayerActive = currentPlayer?.id === "player1";

  // Initialize deck and deal cards
  const initializeGame = async () => {
    setIsLoading(true);
    setError("");

    try {
      // Create a new shuffled Tien Len deck
      const deck = await createTienLenDeck();

      if (!deck.success) {
        throw new Error("Failed to create deck");
      }

      setDeckId(deck.deck_id);

      // Deal cards to all players
      const dealResult = await dealTienLenHands(deck.deck_id, 4);

      if (!dealResult.success) {
        throw new Error("Failed to deal cards");
      }

      // Get current player's cards
      const playerCards = await getPlayerHand(deck.deck_id, "player1");
      const localCards = convertCardsToLocal(playerCards);

      // Update players with card counts and current player's actual cards
      const updatedPlayers = players.map((player, index) => {
        const playerKey = `player${index + 1}`;
        const handData = dealResult.hands[playerKey];

        return {
          ...player,
          cardCount: handData?.cards?.length || 13,
          cards: player.id === "player1" ? localCards : undefined,
        };
      });

      setPlayers(updatedPlayers);
      setGamePhase("playing");

      // Find player with 3 of Spades to start
      const playerWithThreeOfSpades = await findPlayerWithThreeOfSpades(
        deck.deck_id
      );

      if (playerWithThreeOfSpades) {
        setCurrentPlayerIndex(playerWithThreeOfSpades.playerIndex);

        // If the current user (player1) has the 3 of spades, they must play it
        if (playerWithThreeOfSpades.playerIndex === 0) {
          setMustPlayThreeOfSpades(true);
        }
      } else {
        // Fallback to player 1 if not found
        setCurrentPlayerIndex(0);
      }
    } catch (error) {
      console.error("Error initializing game:", error);
      setError("Failed to initialize game. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Start new game
  const startNewGame = async () => {
    setPlayers(createInitialPlayers());
    setSelectedCards([]);
    setLastPlayedCards([]);
    setLastPlayer("");
    setGamePhase("waiting");
    setCurrentPlayerIndex(0);
    setDeckId("");
    setIsFirstPlay(true);
    setMustPlayThreeOfSpades(false);
    await initializeGame();
  };

  // Initialize game on component mount
  useEffect(() => {
    initializeGame();
  }, []);

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

  const handlePlay = async () => {
    if (!isCurrentPlayerActive || selectedCards.length === 0 || !deckId) return;

    // Check if it's the first play and 3 of Spades is required
    if (isFirstPlay && mustPlayThreeOfSpades) {
      const hasThreeOfSpades = selectedCards.some((card) => card.code === "3S");
      if (!hasThreeOfSpades) {
        setError("You must include the 3 of Spades in your first play!");
        return;
      }
    }

    try {
      // Play cards to table via API
      const cardCodes = selectedCards.map((card) => card.code);
      await playCardsToTable(deckId, "player1", cardCodes);

      // Move selected cards to center (for UI)
      setLastPlayedCards([...selectedCards]);
      setLastPlayer(currentPlayer.name);

      // Remove cards from player's hand locally
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

      // Mark first play as complete
      if (isFirstPlay) {
        setIsFirstPlay(false);
        setMustPlayThreeOfSpades(false);
      }

      // Move to next player
      setCurrentPlayerIndex((prev) => (prev + 1) % players.length);
    } catch (error) {
      console.error("Error playing cards:", error);
      setError("Failed to play cards. Please try again.");
    }
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

  // Show loading or error states
  if (isLoading) {
    return (
      <div
        className={cn(
          "w-full h-screen table-felt relative overflow-hidden flex items-center justify-center",
          className
        )}
      >
        <div className="bg-white shadow-lg p-8 rounded-lg text-center">
          <div className="mb-4 text-2xl">🃏</div>
          <div className="mb-2 font-semibold text-lg">Shuffling Deck...</div>
          <div className="text-gray-600 text-sm">Dealing cards to players</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={cn(
          "w-full h-screen table-felt relative overflow-hidden flex items-center justify-center",
          className
        )}
      >
        <div className="bg-white shadow-lg p-8 rounded-lg text-center">
          <div className="mb-4 text-2xl">❌</div>
          <div className="mb-2 font-semibold text-lg text-red-600">Error</div>
          <div className="mb-4 text-gray-600 text-sm">{error}</div>
          <button
            onClick={startNewGame}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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
            startNewGame();
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
          onSortByValue={handleSortByValue}
          onSortBySuit={handleSortBySuit}
          isCurrentPlayer={isCurrentPlayerActive}
          position="bottom"
          playerName={currentPlayer?.name || "You"}
          mustPlayThreeOfSpades={mustPlayThreeOfSpades}
        />
      </div>

      {/* Game controls */}
      <GameControls
        selectedCards={selectedCards}
        onPlay={handlePlay}
        onPass={handlePass}
        onClearSelection={handleClearSelection}
        canPlay={canPlay}
        canPass={canPass}
        isCurrentPlayer={isCurrentPlayerActive}
      />
    </div>
  );
}
