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
import { sortCardsBySuit, sortCardsByValue } from "@/lib/utils/cardSorting";
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
  const [lastPlayedCards, setLastPlayedCards] =
    useState<LocalCard[]>(mockLastPlayedCards);
  const [lastPlayer, setLastPlayer] = useState<string>("");
  const [gamePhase, setGamePhase] = useState<
    "waiting" | "playing" | "finished"
  >("waiting");
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
    console.log("🎮 Game starting...");
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
      console.log("🃏 User received", localCards.length, "cards");

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

      console.log("✅ Game ready!");
    } catch (error) {
      console.error("❌ Error initializing game:", error);
      setError("Failed to initialize game. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize game on component mount
  useEffect(() => {
    console.log("🔄 useEffect triggered - calling initializeGame");
    initializeGame();
  }, []);

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

  // Handle card click - always allow interaction for card organization
  const handleCardClick = (card: LocalCard) => {
    console.log("🃏 Card clicked:", card.code);

    // Always allow card selection for organization, regardless of turn
    setSelectedCards((prev) => {
      const isAlreadySelected = prev.some((c) => c.code === card.code);
      const newSelection = isAlreadySelected
        ? prev.filter((c) => c.code !== card.code)
        : [...prev, card];

      console.log(
        "🃏 Selected cards updated:",
        newSelection.map((c) => c.code)
      );
      return newSelection;
    });
  };

  // Handle playing cards
  const handlePlay = async () => {
    if (!isCurrentPlayerActive || selectedCards.length === 0 || !deckId) return;

    console.log(
      "🎯 Playing cards:",
      selectedCards.map((c) => c.code)
    );

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
          if (player.id === "player1" && player.cards) {
            const remainingCards = player.cards.filter(
              (card) =>
                !selectedCards.some((selected) => selected.code === card.code)
            );
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

      setSelectedCards([]);
      setIsFirstPlay(false);
      setMustPlayThreeOfSpades(false);

      // Move to next player
      setCurrentPlayerIndex((prev) => (prev + 1) % 4);
    } catch (error) {
      console.error("Error playing cards:", error);
      setError("Failed to play cards. Please try again.");
    }
  };

  // Handle pass
  const handlePass = () => {
    if (!isCurrentPlayerActive) return;

    console.log("⏭️ Player passed");
    setCurrentPlayerIndex((prev) => (prev + 1) % 4);
  };

  // Clear selection
  const handleClearSelection = () => {
    setSelectedCards([]);
  };

  // Card movement for drag & drop - always allow
  const handleCardMove = (dragIndex: number, hoverIndex: number) => {
    setPlayers((prev) => {
      const newPlayers = [...prev];
      const userPlayer = newPlayers[0];

      if (userPlayer.cards) {
        const newCards = [...userPlayer.cards];
        const dragCard = newCards[dragIndex];
        newCards.splice(dragIndex, 1);
        newCards.splice(hoverIndex, 0, dragCard);

        newPlayers[0] = {
          ...userPlayer,
          cards: newCards,
        };
      }

      return newPlayers;
    });
  };

  // Sorting functions - always allow
  const handleSortByValue = () => {
    setPlayers((prev) => {
      const newPlayers = [...prev];
      const userPlayer = newPlayers[0];

      if (userPlayer.cards) {
        newPlayers[0] = {
          ...userPlayer,
          cards: sortCardsByValue(userPlayer.cards),
        };
      }

      return newPlayers;
    });
  };

  const handleSortBySuit = () => {
    setPlayers((prev) => {
      const newPlayers = [...prev];
      const userPlayer = newPlayers[0];

      if (userPlayer.cards) {
        newPlayers[0] = {
          ...userPlayer,
          cards: sortCardsBySuit(userPlayer.cards),
        };
      }

      return newPlayers;
    });
  };

  // AI turn handler
  const handleAITurn = async () => {
    if (isCurrentPlayerActive || !deckId) return;

    console.log("🤖 AI turn for:", currentPlayer.name);

    // Simulate AI decision (pass for now)
    setTimeout(() => {
      setCurrentPlayerIndex((prev) => (prev + 1) % 4);
    }, 1000);
  };

  // Trigger AI turns
  useEffect(() => {
    if (!isCurrentPlayerActive && gamePhase === "playing" && currentPlayer) {
      handleAITurn();
    }
  }, [currentPlayerIndex, gamePhase, isCurrentPlayerActive]);

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

  if (isLoading) {
    return (
      <div
        className={cn(
          "flex items-center justify-center min-h-screen",
          className
        )}
      >
        <div className="text-center">
          <div className="border-primary border-b-2 rounded-full w-32 h-32 animate-spin"></div>
          <p className="mt-4 text-lg">Initializing game...</p>
          <button 
            onClick={initializeGame} 
            className="bg-blue-500 hover:bg-blue-700 mt-4 px-4 py-2 rounded font-bold text-white"
          >
            Force Initialize
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={cn(
          "flex items-center justify-center min-h-screen",
          className
        )}
      >
        <div className="text-center">
          <p className="mb-4 text-lg text-red-500">{error}</p>
          <button
            onClick={startNewGame}
            className="bg-primary hover:bg-primary/90 px-4 py-2 rounded text-white"
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
        "relative w-full h-screen bg-green-800 overflow-hidden",
        className
      )}
    >
      {/* Game status */}
      <GameStatus
        players={players}
        gamePhase={gamePhase}
        onNewGame={startNewGame}
      />

      {/* Game table */}
      <GameTable
        lastPlayedCards={lastPlayedCards}
        lastPlayer={lastPlayer}
        currentPlayer={currentPlayer?.name || ""}
        gamePhase={gamePhase}
      />

      {/* Top player */}
      <div className="top-4 left-1/2 absolute transform -translate-x-1/2">
        <PlayerHand
          cards={[]}
          selectedCards={[]}
          onCardClick={() => {}}
          onCardMove={() => {}}
          onSortByValue={() => {}}
          onSortBySuit={() => {}}
          isCurrentPlayer={currentPlayerIndex === 2}
          position="top"
          playerName={players[2]?.name || "Bob"}
          cardCount={players[2]?.cardCount}
        />
      </div>

      {/* Left player */}
      <div className="top-1/2 left-4 absolute transform -translate-y-1/2">
        <PlayerHand
          cards={[]}
          selectedCards={[]}
          onCardClick={() => {}}
          onCardMove={() => {}}
          onSortByValue={() => {}}
          onSortBySuit={() => {}}
          isCurrentPlayer={currentPlayerIndex === 1}
          position="left"
          playerName={players[1]?.name || "Alice"}
          cardCount={players[1]?.cardCount}
        />
      </div>

      {/* Right player */}
      <div className="top-1/2 right-4 absolute transform -translate-y-1/2">
        <PlayerHand
          cards={[]}
          selectedCards={[]}
          onCardClick={() => {}}
          onCardMove={() => {}}
          onSortByValue={() => {}}
          onSortBySuit={() => {}}
          isCurrentPlayer={currentPlayerIndex === 3}
          position="right"
          playerName={players[3]?.name || "Charlie"}
          cardCount={players[3]?.cardCount}
        />
      </div>

      {/* Bottom player (user player) */}
      <div className="bottom-20 left-1/2 absolute transform -translate-x-1/2">
        <PlayerHand
          cards={players[0]?.cards || []}
          selectedCards={selectedCards}
          onCardClick={handleCardClick}
          onCardMove={handleCardMove}
          onSortByValue={handleSortByValue}
          onSortBySuit={handleSortBySuit}
          isCurrentPlayer={isCurrentPlayerActive}
          position="bottom"
          playerName={players[0]?.name || "You"}
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
