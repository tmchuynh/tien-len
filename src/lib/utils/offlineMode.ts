/**
 * Offline mode utilities for Tien Len game
 * Provides fallback functionality when the Deck of Cards API is unavailable
 */

import { Card, LocalCard } from "@/lib/interfaces/cards";

// Mock card data for offline mode
const SUITS = ["HEARTS", "DIAMONDS", "CLUBS", "SPADES"] as const;
const VALUES = [
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "JACK",
  "QUEEN",
  "KING",
  "ACE",
  "2",
] as const;

/**
 * Generate a full deck of cards for offline mode
 */
export function generateOfflineDeck(): Card[] {
  const cards: Card[] = [];

  for (const suit of SUITS) {
    for (const value of VALUES) {
      const code = `${value === "10" ? "0" : value.charAt(0)}${suit.charAt(0)}`;
      cards.push({
        code,
        value,
        suit,
        image: `https://deckofcardsapi.com/static/img/${code}.png`,
        images: {
          svg: `https://deckofcardsapi.com/static/img/${code}.svg`,
          png: `https://deckofcardsapi.com/static/img/${code}.png`,
        },
      });
    }
  }

  return cards;
}

/**
 * Shuffle an array of cards
 */
export function shuffleCards<T>(cards: T[]): T[] {
  const shuffled = [...cards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Deal cards for offline mode
 */
export function dealOfflineCards(playerCount: number = 4): {
  hands: Record<string, Card[]>;
  remaining: Card[];
} {
  const deck = shuffleCards(generateOfflineDeck());
  const cardsPerPlayer = Math.floor(deck.length / playerCount);
  const hands: Record<string, Card[]> = {};

  for (let i = 0; i < playerCount; i++) {
    const playerKey = `player${i + 1}`;
    const startIndex = i * cardsPerPlayer;
    hands[playerKey] = deck.slice(startIndex, startIndex + cardsPerPlayer);
  }

  const remaining = deck.slice(playerCount * cardsPerPlayer);
  return { hands, remaining };
}

/**
 * Convert offline cards to local format
 */
export function convertOfflineCardsToLocal(cards: Card[]): LocalCard[] {
  return cards.map((card) => ({
    code: card.code,
    value: card.value === "10" ? 10 : card.value,
    suit: card.suit.toLowerCase() as "hearts" | "diamonds" | "clubs" | "spades",
    image: card.image,
  }));
}

/**
 * Check if we're running in offline mode
 */
export function isOfflineMode(deckId: string): boolean {
  return deckId.startsWith("offline_");
}

/**
 * Generate offline player hands with proper Tien Len cards
 */
export function generateOfflinePlayerHands(): {
  playerHands: Record<string, LocalCard[]>;
  playerWithThreeOfSpades: number;
} {
  const { hands } = dealOfflineCards(4);
  const playerHands: Record<string, LocalCard[]> = {};
  let playerWithThreeOfSpades = 0;

  Object.entries(hands).forEach(([playerKey, cards], index) => {
    const localCards = convertOfflineCardsToLocal(cards);
    playerHands[playerKey] = localCards;

    // Check if this player has 3 of Spades
    if (localCards.some((card) => card.code === "3S")) {
      playerWithThreeOfSpades = index;
    }
  });

  return { playerHands, playerWithThreeOfSpades };
}

/**
 * Mock API responses for offline mode
 */
export const offlineResponses = {
  createDeck: (deckId: string) => ({
    success: false,
    deck_id: deckId,
    shuffled: true,
    remaining: 52,
    isOffline: true,
  }),

  dealCards: (deckId: string, count: number) => {
    const cards = generateOfflineDeck().slice(0, count);
    return {
      success: false,
      deck_id: deckId,
      cards,
      remaining: 52 - count,
      isOffline: true,
    };
  },

  emptyPile: (deckId: string, pileName: string) => ({
    success: false,
    deck_id: deckId,
    remaining: 0,
    piles: {
      [pileName]: {
        remaining: 0,
        cards: [],
      },
    },
    isOffline: true,
  }),
};

/**
 * Display offline mode notification
 */
export function showOfflineNotification(): void {
  if (typeof window !== "undefined") {
    console.warn("🌐 Running in offline mode - using mock card data");
    console.info("💡 This happens when the Deck of Cards API is unavailable");
    console.info("🎮 Game functionality will work with simulated cards");
  }
}
