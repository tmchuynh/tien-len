import { LocalCard } from "@/lib/interfaces/cards";

// Card sorting utilities for Tien Len

export const SUIT_ORDER = ["spades", "clubs", "diamonds", "hearts"] as const;
export const VALUE_ORDER = [
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
] as const;

/**
 * Get numerical value for sorting (Tien Len order)
 */
export function getCardValue(value: string): number {
  const index = VALUE_ORDER.indexOf(value as any);
  return index === -1 ? 0 : index;
}

/**
 * Get numerical suit value for sorting
 */
export function getSuitValue(suit: string): number {
  const index = SUIT_ORDER.indexOf(suit as any);
  return index === -1 ? 0 : index;
}

/**
 * Sort cards by Tien Len rules (value first, then suit)
 */
export function sortCardsByValue(cards: LocalCard[]): LocalCard[] {
  return [...cards].sort((a, b) => {
    const valueA = getCardValue(a.value.toString());
    const valueB = getCardValue(b.value.toString());

    if (valueA !== valueB) {
      return valueA - valueB;
    }

    // If same value, sort by suit
    return getSuitValue(a.suit) - getSuitValue(b.suit);
  });
}

/**
 * Sort cards by suit first, then by value within each suit
 */
export function sortCardsBySuit(cards: LocalCard[]): LocalCard[] {
  return [...cards].sort((a, b) => {
    const suitA = getSuitValue(a.suit);
    const suitB = getSuitValue(b.suit);

    if (suitA !== suitB) {
      return suitA - suitB;
    }

    // If same suit, sort by value
    return getCardValue(a.value.toString()) - getCardValue(b.value.toString());
  });
}

/**
 * Sort cards in traditional order (suit first, then value)
 */
export function sortCardsTraditional(cards: LocalCard[]): LocalCard[] {
  return sortCardsBySuit(cards);
}

/**
 * Move a card to a new position in the array (for manual sorting)
 */
export function moveCard(
  cards: LocalCard[],
  fromIndex: number,
  toIndex: number
): LocalCard[] {
  const newCards = [...cards];
  const [movedCard] = newCards.splice(fromIndex, 1);
  newCards.splice(toIndex, 0, movedCard);
  return newCards;
}

/**
 * Find the index of a card in an array
 */
export function findCardIndex(
  cards: LocalCard[],
  targetCard: LocalCard
): number {
  return cards.findIndex((card) => card.code === targetCard.code);
}
