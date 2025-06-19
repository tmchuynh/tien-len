// =====================================================
// CARD UTILITY FUNCTIONS
// =====================================================

import { SUIT_MAPPING, VALUE_MAPPING } from "@/lib/constants/cards/cards";
import type { Card, LocalCard } from "@/lib/interfaces/cards";

/**
 * Convert API suit format to local UI format
 */
export const convertSuitToLocal = (
  suit: string
): "hearts" | "diamonds" | "clubs" | "spades" => {
  return SUIT_MAPPING[suit as keyof typeof SUIT_MAPPING] || "hearts";
};

/**
 * Convert API value format to local UI format
 */
export const convertValueToLocal = (value: string): string => {
  return VALUE_MAPPING[value as keyof typeof VALUE_MAPPING] || value;
};

/**
 * Convert API card to local card format
 */
export const convertCardToLocal = (card: Card): LocalCard => {
  return {
    code: card.code,
    value: convertValueToLocal(card.value),
    suit: convertSuitToLocal(card.suit),
    image: card.image,
  };
};

/**
 * Convert multiple API cards to local format
 */
export const convertCardsToLocal = (cards: Card[]): LocalCard[] => {
  return cards.map(convertCardToLocal);
};

/**
 * Generate a player pile name
 */
export const getPlayerPileName = (playerIndex: number): string => {
  return `player${playerIndex + 1}`;
};

/**
 * Validate card code format (e.g., "AS", "KH", "QD")
 */
export const isValidCardCode = (code: string): boolean => {
  const cardCodeRegex = /^[A23456789TJQK0][SHDC]$/;
  return cardCodeRegex.test(code);
};

/**
 * Extract suit from card code
 */
export const getSuitFromCode = (code: string): string => {
  if (!isValidCardCode(code)) return "";
  return code.slice(-1);
};

/**
 * Extract value from card code
 */
export const getValueFromCode = (code: string): string => {
  if (!isValidCardCode(code)) return "";
  return code.slice(0, -1);
};

/**
 * Sort cards by Tien Len rules
 */
export const sortCardsByTienLenRules = (cards: LocalCard[]): LocalCard[] => {
  // Implementation would depend on specific Tien Len sorting rules
  // This is a placeholder that sorts by suit then value
  return [...cards].sort((a, b) => {
    if (a.suit !== b.suit) {
      const suitOrder = ["spades", "clubs", "diamonds", "hearts"];
      return suitOrder.indexOf(a.suit) - suitOrder.indexOf(b.suit);
    }
    // Sort by value within same suit
    const valueOrder = [
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
    const aValue = typeof a.value === "string" ? a.value : a.value.toString();
    const bValue = typeof b.value === "string" ? b.value : b.value.toString();
    return valueOrder.indexOf(aValue) - valueOrder.indexOf(bValue);
  });
};
