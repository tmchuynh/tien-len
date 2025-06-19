// =====================================================
// CARD & DECK API INTERFACES
// =====================================================

/**
 * Base API Response
 */
export interface BaseResponse {
  success: boolean;
  deck_id: string;
}

/**
 * Card Representation (API Format)
 */
export interface Card {
  /** Two-character card code (e.g., "AS", "KH", "QD") */
  code: string;
  /** URL to card image (PNG format) */
  image: string;
  /** Available image formats */
  images: {
    svg: string;
    png: string;
  };
  /** Card value: "ACE", "2"-"10", "JACK", "QUEEN", "KING" */
  value: string;
  /** Card suit */
  suit: "HEARTS" | "DIAMONDS" | "CLUBS" | "SPADES";
}

/**
 * Local Card Format (for UI components)
 */
export interface LocalCard {
  code: string;
  value: string | number;
  suit: "hearts" | "diamonds" | "clubs" | "spades";
  image?: string;
}

// =====================================================
// DECK MANAGEMENT INTERFACES
// =====================================================

export interface Deck extends BaseResponse {
  /** Whether the deck is shuffled */
  shuffled: boolean;
  /** Number of cards remaining in deck */
  remaining: number;
}

export interface DrawResponse extends BaseResponse {
  /** Cards that were drawn */
  cards: Card[];
  /** Number of cards remaining in deck */
  remaining: number;
}

// =====================================================
// PILE MANAGEMENT INTERFACES
// =====================================================

export interface Pile {
  /** Number of cards in this pile */
  remaining: number;
  /** Actual cards in pile (only returned with list operations) */
  cards?: Card[];
}

export interface PileResponse extends BaseResponse {
  /** Number of cards remaining in main deck */
  remaining: number;
  /** All piles in the game */
  piles: Record<string, Pile>;
}

export interface PileDrawResponse extends PileResponse {
  /** Cards that were drawn from the pile */
  cards: Card[];
}

// =====================================================
// GAME-SPECIFIC INTERFACES
// =====================================================

export interface GameState {
  deckId: string;
  players: string[];
  currentPlayer: number;
  gamePhase: "dealing" | "playing" | "finished";
  lastPlay?: {
    player: string;
    cards: Card[];
    playType: string;
  };
}

export interface TienLenHand {
  playerId: string;
  cards: Card[];
  cardCount: number;
}

export interface DealResult {
  success: boolean;
  hands: Record<string, TienLenHand>;
  deckId: string;
  remainingCards: number;
}

/**
 * Card Play Types for Tien Len
 */
export type TienLenPlayType =
  | "single"
  | "pair"
  | "triple"
  | "straight"
  | "straight-pair"
  | "four-of-kind"
  | "straight-triple";

export interface CardPlay {
  cards: Card[];
  playType: TienLenPlayType;
  player: string;
  timestamp: number;
}
