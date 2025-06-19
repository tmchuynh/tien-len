// Deck of Cards API Client for Tien Len Game
// API Documentation: https://deckofcardsapi.com/

import {
  Card,
  Deck,
  DECK_API_BASE_URL,
  DrawResponse,
  PileDrawResponse,
  PileResponse,
  TIEN_LEN_CARDS,
} from "@/lib";

// =====================================================
// API FUNCTIONS
// =====================================================

/**
 * Core Deck Management Functions
 */

// Create a new shuffled deck
export async function createNewDeck(deckCount: number = 1): Promise<Deck> {
  const response = await fetch(
    `${DECK_API_BASE_URL}/deck/new/shuffle/?deck_count=${deckCount}`
  );
  return await response.json();
}

// Create a brand new unshuffled deck
export async function createBrandNewDeck(
  includeJokers: boolean = false
): Promise<Deck> {
  const jokersParam = includeJokers ? "?jokers_enabled=true" : "";
  const response = await fetch(`${DECK_API_BASE_URL}/deck/new/${jokersParam}`);
  return await response.json();
}

// Create a partial deck with specific cards (useful for testing)
export async function createPartialDeck(
  cards: string[],
  shuffle: boolean = true
): Promise<Deck> {
  const cardsParam = cards.join(",");
  const endpoint = shuffle ? "shuffle" : "";
  const response = await fetch(
    `${DECK_API_BASE_URL}/deck/new/${endpoint}/?cards=${cardsParam}`
  );
  return await response.json();
}

// Create a Tien Len specific deck (standard 52 cards, shuffled)
export async function createTienLenDeck(): Promise<Deck> {
  return createPartialDeck(TIEN_LEN_CARDS, true);
}

/**
 * Deck Operations
 */

// Shuffle an existing deck
export async function shuffleDeck(
  deckId: string,
  remainingOnly: boolean = false
): Promise<Deck> {
  const remainingParam = remainingOnly ? "?remaining=true" : "";
  const response = await fetch(
    `${DECK_API_BASE_URL}/deck/${deckId}/shuffle/${remainingParam}`
  );
  return await response.json();
}

// Draw cards from deck
export async function drawCards(
  deckId: string,
  count: number = 1
): Promise<DrawResponse> {
  const response = await fetch(
    `${DECK_API_BASE_URL}/deck/${deckId}/draw/?count=${count}`
  );
  return await response.json();
}

// Draw cards and create new deck in one request
export async function drawFromNewDeck(
  count: number = 1
): Promise<DrawResponse> {
  const response = await fetch(
    `${DECK_API_BASE_URL}/deck/new/draw/?count=${count}`
  );
  return await response.json();
}

/**
 * Pile Management Functions (for player hands, discard pile, etc.)
 */

// Add cards to a pile (player hand, discard pile, etc.)
export async function addToPile(
  deckId: string,
  pileName: string,
  cards: string[]
): Promise<PileResponse> {
  const cardsParam = cards.join(",");
  const response = await fetch(
    `${DECK_API_BASE_URL}/deck/${deckId}/pile/${pileName}/add/?cards=${cardsParam}`
  );
  return await response.json();
}

// List cards in a pile
export async function listPile(
  deckId: string,
  pileName: string
): Promise<PileResponse> {
  const response = await fetch(
    `${DECK_API_BASE_URL}/deck/${deckId}/pile/${pileName}/list/`
  );
  return await response.json();
}

// Shuffle cards in a pile
export async function shufflePile(
  deckId: string,
  pileName: string
): Promise<PileResponse> {
  const response = await fetch(
    `${DECK_API_BASE_URL}/deck/${deckId}/pile/${pileName}/shuffle/`
  );
  return await response.json();
}

// Draw from pile (top of pile)
export async function drawFromPile(
  deckId: string,
  pileName: string,
  count: number = 1
): Promise<PileDrawResponse> {
  const response = await fetch(
    `${DECK_API_BASE_URL}/deck/${deckId}/pile/${pileName}/draw/?count=${count}`
  );
  return await response.json();
}

// Draw specific cards from pile
export async function drawSpecificFromPile(
  deckId: string,
  pileName: string,
  cards: string[]
): Promise<PileDrawResponse> {
  const cardsParam = cards.join(",");
  const response = await fetch(
    `${DECK_API_BASE_URL}/deck/${deckId}/pile/${pileName}/draw/?cards=${cardsParam}`
  );
  return await response.json();
}

// Draw from bottom of pile
export async function drawFromPileBottom(
  deckId: string,
  pileName: string,
  count: number = 1
): Promise<PileDrawResponse> {
  const response = await fetch(
    `${DECK_API_BASE_URL}/deck/${deckId}/pile/${pileName}/draw/bottom/?count=${count}`
  );
  return await response.json();
}

// Draw random cards from pile
export async function drawRandomFromPile(
  deckId: string,
  pileName: string,
  count: number = 1
): Promise<PileDrawResponse> {
  const response = await fetch(
    `${DECK_API_BASE_URL}/deck/${deckId}/pile/${pileName}/draw/random/?count=${count}`
  );
  return await response.json();
}

/**
 * Return Cards Functions
 */

// Return all drawn cards to deck
export async function returnCardsToDeck(deckId: string): Promise<Deck> {
  const response = await fetch(`${DECK_API_BASE_URL}/deck/${deckId}/return/`);
  return await response.json();
}

// Return specific cards to deck
export async function returnSpecificCardsToDeck(
  deckId: string,
  cards: string[]
): Promise<Deck> {
  const cardsParam = cards.join(",");
  const response = await fetch(
    `${DECK_API_BASE_URL}/deck/${deckId}/return/?cards=${cardsParam}`
  );
  return await response.json();
}

// Return all cards from pile to deck
export async function returnPileToDeck(
  deckId: string,
  pileName: string
): Promise<PileResponse> {
  const response = await fetch(
    `${DECK_API_BASE_URL}/deck/${deckId}/pile/${pileName}/return/`
  );
  return await response.json();
}

// Return specific cards from pile to deck
export async function returnSpecificPileCardsToDeck(
  deckId: string,
  pileName: string,
  cards: string[]
): Promise<PileResponse> {
  const cardsParam = cards.join(",");
  const response = await fetch(
    `${DECK_API_BASE_URL}/deck/${deckId}/pile/${pileName}/return/?cards=${cardsParam}`
  );
  return await response.json();
}

/**
 * Tien Len Game Specific Functions
 */

// Deal cards for Tien Len (13 cards per player, up to 4 players)
export async function dealTienLenHands(
  deckId: string,
  playerCount: number = 4
): Promise<{
  success: boolean;
  hands: Record<string, DrawResponse>;
}> {
  const cardsPerPlayer = Math.floor(52 / playerCount);
  const hands: Record<string, DrawResponse> = {};

  try {
    // Deal cards to each player
    for (let i = 0; i < playerCount; i++) {
      const playerName = `player${i + 1}`;
      const drawnCards = await drawCards(deckId, cardsPerPlayer);

      if (drawnCards.success && drawnCards.cards.length > 0) {
        // Add cards to player's hand pile
        const cardCodes = drawnCards.cards.map((card) => card.code);
        await addToPile(deckId, playerName, cardCodes);
        hands[playerName] = drawnCards;
      }
    }

    return { success: true, hands };
  } catch (error) {
    console.error("Error dealing Tien Len hands:", error);
    return { success: false, hands: {} };
  }
}

// Get player's hand
export async function getPlayerHand(
  deckId: string,
  playerName: string
): Promise<Card[]> {
  try {
    const pileResponse = await listPile(deckId, playerName);
    return pileResponse.piles[playerName]?.cards || [];
  } catch (error) {
    console.error(`Error getting ${playerName} hand:`, error);
    return [];
  }
}

// Play cards from player's hand to table
export async function playCardsToTable(
  deckId: string,
  playerName: string,
  cards: string[]
): Promise<PileDrawResponse> {
  try {
    // Remove cards from player's hand
    const drawnCards = await drawSpecificFromPile(deckId, playerName, cards);

    // Add cards to table pile
    if (drawnCards.success && drawnCards.cards.length > 0) {
      const cardCodes = drawnCards.cards.map((card) => card.code);
      await addToPile(deckId, "table", cardCodes);
    }

    return drawnCards;
  } catch (error) {
    console.error("Error playing cards to table:", error);
    throw error;
  }
}

// Clear the table (move table cards to discard)
export async function clearTable(deckId: string): Promise<PileResponse> {
  try {
    const tableCards = await listPile(deckId, "table");

    if (tableCards.piles.table?.cards) {
      const cardCodes = tableCards.piles.table.cards.map((card) => card.code);
      // Move all table cards to discard pile
      const drawnFromTable = await drawSpecificFromPile(
        deckId,
        "table",
        cardCodes
      );

      if (drawnFromTable.success) {
        return await addToPile(deckId, "discard", cardCodes);
      }
    }

    return tableCards;
  } catch (error) {
    console.error("Error clearing table:", error);
    throw error;
  }
}

// Get card back image URL
export function getCardBackImageUrl(): string {
  return "https://deckofcardsapi.com/static/img/back.png";
}

/**
 * Error handling wrapper
 */
export async function safeApiCall<T>(
  apiCall: () => Promise<T>
): Promise<T | null> {
  try {
    return await apiCall();
  } catch (error) {
    console.error("API call failed:", error);
    return null;
  }
}
