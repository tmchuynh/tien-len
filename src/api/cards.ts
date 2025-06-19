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
// API FUNCTIONS WITH ERROR HANDLING
// =====================================================

/**
 * Safe fetch wrapper with JSON validation
 */
async function safeFetch(url: string): Promise<Response> {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  
  return response;
}

/**
 * Safe JSON parse with validation
 */
async function safeJsonParse<T>(response: Response, context: string): Promise<T> {
  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    const text = await response.text();
    console.error(`Expected JSON but got: ${contentType}`, text.substring(0, 200));
    throw new Error(`Invalid response format from ${context}: Expected JSON but got ${contentType}`);
  }
  
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    const text = await response.text();
    console.error(`Failed to parse JSON from ${context}:`, text.substring(0, 200));
    throw new Error(`Invalid JSON from ${context}: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Core Deck Management Functions
 */

// Create a new shuffled deck
export async function createNewDeck(deckCount: number = 1): Promise<Deck> {
  try {
    const response = await safeFetch(
      `${DECK_API_BASE_URL}/deck/new/shuffle/?deck_count=${deckCount}`
    );
    return await safeJsonParse<Deck>(response, "createNewDeck");
  } catch (error) {
    console.error("Failed to create new deck:", error);
    // Return a mock deck for offline mode
    return {
      success: false,
      deck_id: `offline_deck_${Date.now()}`,
      shuffled: true,
      remaining: 52,
    } as Deck;
  }
}

// Create a brand new unshuffled deck
export async function createBrandNewDeck(
  includeJokers: boolean = false
): Promise<Deck> {
  try {
    const jokersParam = includeJokers ? "?jokers_enabled=true" : "";
    const response = await safeFetch(
      `${DECK_API_BASE_URL}/deck/new/${jokersParam}`
    );
    return await safeJsonParse<Deck>(response, "createBrandNewDeck");
  } catch (error) {
    console.error("Failed to create brand new deck:", error);
    return {
      success: false,
      deck_id: `offline_deck_${Date.now()}`,
      shuffled: false,
      remaining: includeJokers ? 54 : 52,
    } as Deck;
  }
}

// Create a partial deck with specific cards (useful for testing)
export async function createPartialDeck(
  cards: string[],
  shuffle: boolean = true
): Promise<Deck> {
  try {
    const cardsParam = cards.join(",");
    const endpoint = shuffle ? "shuffle" : "";
    const response = await safeFetch(
      `${DECK_API_BASE_URL}/deck/new/${endpoint}/?cards=${cardsParam}`
    );
    return await safeJsonParse<Deck>(response, "createPartialDeck");
  } catch (error) {
    console.error("Failed to create partial deck:", error);
    return {
      success: false,
      deck_id: `offline_deck_${Date.now()}`,
      shuffled: shuffle,
      remaining: cards.length,
    } as Deck;
  }
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
  try {
    const response = await safeFetch(
      `${DECK_API_BASE_URL}/deck/${deckId}/draw/?count=${count}`
    );
    return await safeJsonParse<DrawResponse>(response, "drawCards");
  } catch (error) {
    console.error("Failed to draw cards:", error);
    // Return mock cards for offline mode
    const mockCards: Card[] = [];
    for (let i = 0; i < count; i++) {
      mockCards.push({
        code: `MOCK${i}`,
        value: "ACE",
        suit: "SPADES",
        image: "https://deckofcardsapi.com/static/img/back.png",
        images: {
          svg: "https://deckofcardsapi.com/static/img/back.svg",
          png: "https://deckofcardsapi.com/static/img/back.png",
        },
      });
    }
    return {
      success: false,
      deck_id: deckId,
      cards: mockCards,
      remaining: 52 - count,
    } as DrawResponse;
  }
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
  try {
    const cardsParam = cards.join(",");
    const response = await safeFetch(
      `${DECK_API_BASE_URL}/deck/${deckId}/pile/${pileName}/add/?cards=${cardsParam}`
    );
    return await safeJsonParse<PileResponse>(response, "addToPile");
  } catch (error) {
    console.error(`Failed to add cards to pile ${pileName}:`, error);
    return {
      success: false,
      deck_id: deckId,
      remaining: 0,
      piles: {
        [pileName]: {
          remaining: cards.length,
        },
      },
    } as PileResponse;
  }
}

// List cards in a pile
export async function listPile(
  deckId: string,
  pileName: string
): Promise<PileResponse> {
  try {
    const response = await safeFetch(
      `${DECK_API_BASE_URL}/deck/${deckId}/pile/${pileName}/list/`
    );
    return await safeJsonParse<PileResponse>(response, "listPile");
  } catch (error) {
    console.error(`Failed to list pile ${pileName}:`, error);
    return {
      success: false,
      deck_id: deckId,
      remaining: 0,
      piles: {
        [pileName]: {
          remaining: 0,
          cards: [],
        },
      },
    } as PileResponse;
  }
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

// Find which player has the 3 of Spades
export async function findPlayerWithThreeOfSpades(deckId: string): Promise<{
  playerIndex: number;
  playerName: string;
} | null> {
  try {
    for (let i = 0; i < 4; i++) {
      const playerName = `player${i + 1}`;
      const cards = await getPlayerHand(deckId, playerName);
      const hasThreeOfSpades = cards.some((card) => card.code === "3S");

      if (hasThreeOfSpades) {
        return {
          playerIndex: i,
          playerName: playerName,
        };
      }
    }
    return null;
  } catch (error) {
    console.error("Error finding player with 3 of Spades:", error);
    return null;
  }
}

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

/**
 * AI Game Functions
 */

// Make an AI move for a computer player
export async function makeAIMove(
  deckId: string,
  playerName: string,
  gameContext: {
    lastPlayedCards: Card[];
    lastPlayer?: string;
    isFirstPlay: boolean;
    mustIncludeThreeOfSpades: boolean;
    playerCardCounts: number[];
    currentPlayerIndex: number;
  }
): Promise<{
  success: boolean;
  action: "play" | "pass";
  cards?: Card[];
  reasoning: string;
}> {
  try {
    // Get AI player's cards
    const aiCards = await getPlayerHand(deckId, playerName);

    // Import AI strategy (dynamic import to avoid potential circular dependencies)
    const { makeAIDecision, getCombinationType } = await import(
      "@/lib/utils/aiStrategy"
    );
    const { convertCardsToLocal } = await import("@/lib/utils/cards");

    // Convert to local format for AI processing
    const localCards = convertCardsToLocal(aiCards);
    const localLastPlayed = convertCardsToLocal(gameContext.lastPlayedCards);

    // Create AI context
    const aiContext = {
      playerCards: localCards,
      lastPlayedCards: localLastPlayed,
      lastPlayer: gameContext.lastPlayer,
      isFirstPlay: gameContext.isFirstPlay,
      mustIncludeThreeOfSpades: gameContext.mustIncludeThreeOfSpades,
      remainingPlayers: 4, // Assuming 4 players
      playerCardCounts: gameContext.playerCardCounts,
      currentPlayerIndex: gameContext.currentPlayerIndex,
    };

    // Get AI decision
    const decision = makeAIDecision(aiContext);

    if (decision.shouldPlay && decision.cards.length > 0) {
      // Play the selected cards
      const cardCodes = decision.cards.map((card) => card.code);
      const playResult = await playCardsToTable(deckId, playerName, cardCodes);

      if (playResult.success) {
        return {
          success: true,
          action: "play",
          cards: playResult.cards,
          reasoning: decision.reasoning,
        };
      } else {
        return {
          success: false,
          action: "pass",
          reasoning: "Failed to play cards, passing instead",
        };
      }
    } else {
      return {
        success: true,
        action: "pass",
        reasoning: decision.reasoning,
      };
    }
  } catch (error) {
    console.error("Error making AI move:", error);
    return {
      success: false,
      action: "pass",
      reasoning: "AI error, passing turn",
    };
  }
}

// Get strategic card recommendation for human player (optional helper)
export async function getCardRecommendation(
  deckId: string,
  playerName: string,
  selectedCards: string[],
  gameContext: {
    lastPlayedCards: Card[];
    lastPlayer?: string;
    isFirstPlay: boolean;
    mustIncludeThreeOfSpades: boolean;
  }
): Promise<{
  isValidPlay: boolean;
  recommendation: string;
  confidence: number;
}> {
  try {
    const playerCards = await getPlayerHand(deckId, playerName);
    const { convertCardsToLocal } = await import("@/lib/utils/cards");
    const { getCombinationType, canBeat, isValidCombination } = await import(
      "@/lib/utils/aiStrategy"
    );

    const localCards = convertCardsToLocal(playerCards);
    const selectedLocalCards = localCards.filter((card) =>
      selectedCards.includes(card.code)
    );

    // Check if selection is a valid combination
    const isValid = isValidCombination(selectedLocalCards);

    if (!isValid) {
      return {
        isValidPlay: false,
        recommendation: "Selected cards do not form a valid combination",
        confidence: 1.0,
      };
    }

    // Check if it's the first play and needs 3 of Spades
    if (gameContext.isFirstPlay && gameContext.mustIncludeThreeOfSpades) {
      const hasThreeOfSpades = selectedLocalCards.some(
        (card) => card.code === "3S"
      );
      if (!hasThreeOfSpades) {
        return {
          isValidPlay: false,
          recommendation: "Must include 3 of Spades in first play",
          confidence: 1.0,
        };
      }
    }

    // If there are last played cards, check if we can beat them
    if (gameContext.lastPlayedCards.length > 0) {
      const localLastPlayed = convertCardsToLocal(gameContext.lastPlayedCards);
      const targetCombo = getCombinationType(localLastPlayed);
      const playerCombo = getCombinationType(selectedLocalCards);

      if (!targetCombo || !playerCombo) {
        return {
          isValidPlay: false,
          recommendation: "Cannot determine combination types",
          confidence: 0.5,
        };
      }

      const canBeatTarget = canBeat(playerCombo, targetCombo);

      if (!canBeatTarget) {
        return {
          isValidPlay: false,
          recommendation: `Your ${playerCombo.type} cannot beat the played ${targetCombo.type}`,
          confidence: 1.0,
        };
      }

      return {
        isValidPlay: true,
        recommendation: `Good play! Your ${playerCombo.type} beats the ${targetCombo.type}`,
        confidence: 0.8,
      };
    }

    return {
      isValidPlay: true,
      recommendation: `Valid ${
        getCombinationType(selectedLocalCards)?.type || "play"
      }`,
      confidence: 0.7,
    };
  } catch (error) {
    console.error("Error getting card recommendation:", error);
    return {
      isValidPlay: false,
      recommendation: "Error analyzing play",
      confidence: 0.0,
    };
  }
}
