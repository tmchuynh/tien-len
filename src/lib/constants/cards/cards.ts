// =====================================================
// CARD & DECK CONSTANTS
// =====================================================

/**
 * Base URL for Deck of Cards API
 */
export const DECK_API_BASE_URL = "https://deckofcardsapi.com/api";

/**
 * Card back image URL
 */
export const CARD_BACK_IMAGE_URL =
  "https://deckofcardsapi.com/static/img/back.png";

/**
 * Standard Tien Len deck (52 cards)
 * Cards are ordered by suit: Spades, Hearts, Diamonds, Clubs
 * Values: A, 2-10 (10 is represented as '0'), J, Q, K
 */
export const TIEN_LEN_CARDS = [
  // Spades
  "AS",
  "2S",
  "3S",
  "4S",
  "5S",
  "6S",
  "7S",
  "8S",
  "9S",
  "0S",
  "JS",
  "QS",
  "KS",
  // Hearts
  "AH",
  "2H",
  "3H",
  "4H",
  "5H",
  "6H",
  "7H",
  "8H",
  "9H",
  "0H",
  "JH",
  "QH",
  "KH",
  // Diamonds
  "AD",
  "2D",
  "3D",
  "4D",
  "5D",
  "6D",
  "7D",
  "8D",
  "9D",
  "0D",
  "JD",
  "QD",
  "KD",
  // Clubs
  "AC",
  "2C",
  "3C",
  "4C",
  "5C",
  "6C",
  "7C",
  "8C",
  "9C",
  "0C",
  "JC",
  "QC",
  "KC",
];

/**
 * Suit mappings from API format to local format
 */
export const SUIT_MAPPING = {
  HEARTS: "hearts",
  DIAMONDS: "diamonds",
  CLUBS: "clubs",
  SPADES: "spades",
} as const;

/**
 * Value mappings from API format to local format
 */
export const VALUE_MAPPING = {
  ACE: "A",
  JACK: "J",
  QUEEN: "Q",
  KING: "K",
} as const;

/**
 * Card ranks for Tien Len (lowest to highest)
 * Note: In Tien Len, 3 is lowest, 2 is highest
 */
export const TIEN_LEN_RANK_ORDER = [
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
  "2",
];

/**
 * Suit ranks for Tien Len (lowest to highest)
 * Spades < Clubs < Diamonds < Hearts
 */
export const TIEN_LEN_SUIT_ORDER = ["spades", "clubs", "diamonds", "hearts"];

/**
 * Default game settings
 */
export const GAME_SETTINGS = {
  /** Maximum number of players in Tien Len */
  MAX_PLAYERS: 4,
  /** Minimum number of players in Tien Len */
  MIN_PLAYERS: 2,
  /** Cards dealt per player (52 cards ÷ 4 players = 13 each) */
  CARDS_PER_PLAYER: 13,
  /** Total cards in a standard deck */
  TOTAL_CARDS: 52,
  /** Deck expiry time (2 weeks as per API docs) */
  DECK_EXPIRY_DAYS: 14,
} as const;

/**
 * Common pile names used in Tien Len
 */
export const PILE_NAMES = {
  TABLE: "table",
  DISCARD: "discard",
  PLAYER_1: "player1",
  PLAYER_2: "player2",
  PLAYER_3: "player3",
  PLAYER_4: "player4",
} as const;


export const SUIT_COLORS = {
  hearts: "text-red-500",
  diamonds: "text-red-500",
  clubs: "text-black",
  spades: "text-black",
};

export const SUIT_SYMBOLS = {
  hearts: "♥️",
  diamonds: "♦️",
  clubs: "♣️",
  spades: "♠️",
};

export const SIZE_CLASSES = {
  small: "w-12 h-16 text-xs",
  medium: "w-16 h-24 text-sm",
  large: "w-20 h-32 text-base",
};