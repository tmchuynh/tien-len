/**
 * AI Strategy for Tien Len Card Game
 * Implements intelligent decision-making for computer players
 */

import { LocalCard } from "@/lib/interfaces/cards";
import { currentAIConfig } from "./aiConfig";
import { getCardValue, getSuitValue } from "./cardSorting";

// =====================================================
// TYPES AND INTERFACES
// =====================================================

export interface PlayDecision {
  shouldPlay: boolean;
  cards: LocalCard[];
  confidence: number; // 0-1, how confident the AI is in this decision
  reasoning: string;
}

export interface GameContext {
  playerCards: LocalCard[];
  lastPlayedCards: LocalCard[];
  lastPlayer?: string;
  isFirstPlay: boolean;
  mustIncludeThreeOfSpades: boolean;
  remainingPlayers: number;
  playerCardCounts: number[]; // Cards remaining for each player
  currentPlayerIndex: number;
}

export type CombinationType =
  | "single"
  | "pair"
  | "triple"
  | "quad"
  | "straight"
  | "double_straight"
  | "bomb";

export interface CardCombination {
  type: CombinationType;
  cards: LocalCard[];
  value: number; // For comparison purposes
  highestCard: LocalCard;
}

// =====================================================
// CARD COMBINATION DETECTION
// =====================================================

/**
 * Find all possible combinations from a hand of cards
 */
export function findAllCombinations(cards: LocalCard[]): CardCombination[] {
  const combinations: CardCombination[] = [];

  // Singles
  cards.forEach((card) => {
    combinations.push({
      type: "single",
      cards: [card],
      value:
        getCardValue(card.value.toString()) * 100 + getSuitValue(card.suit),
      highestCard: card,
    });
  });

  // Pairs
  const pairs = findPairs(cards);
  pairs.forEach((pair) => {
    combinations.push({
      type: "pair",
      cards: pair,
      value:
        getCardValue(pair[0].value.toString()) * 100 +
        Math.max(...pair.map((c) => getSuitValue(c.suit))),
      highestCard: pair.sort(
        (a, b) => getSuitValue(b.suit) - getSuitValue(a.suit)
      )[0],
    });
  });

  // Triples
  const triples = findTriples(cards);
  triples.forEach((triple) => {
    combinations.push({
      type: "triple",
      cards: triple,
      value:
        getCardValue(triple[0].value.toString()) * 100 +
        Math.max(...triple.map((c) => getSuitValue(c.suit))),
      highestCard: triple.sort(
        (a, b) => getSuitValue(b.suit) - getSuitValue(a.suit)
      )[0],
    });
  });

  // Quads
  const quads = findQuads(cards);
  quads.forEach((quad) => {
    combinations.push({
      type: "quad",
      cards: quad,
      value:
        getCardValue(quad[0].value.toString()) * 100 +
        Math.max(...quad.map((c) => getSuitValue(c.suit))),
      highestCard: quad.sort(
        (a, b) => getSuitValue(b.suit) - getSuitValue(a.suit)
      )[0],
    });
  });

  // Straights
  const straights = findStraights(cards);
  straights.forEach((straight) => {
    const highestCard = straight.sort((a, b) => {
      const valueCompare =
        getCardValue(b.value.toString()) - getCardValue(a.value.toString());
      if (valueCompare !== 0) return valueCompare;
      return getSuitValue(b.suit) - getSuitValue(a.suit);
    })[0];

    combinations.push({
      type: "straight",
      cards: straight,
      value:
        getCardValue(highestCard.value.toString()) * 100 +
        getSuitValue(highestCard.suit),
      highestCard,
    });
  });

  // Double straights
  const doubleStraights = findDoubleStraights(cards);
  doubleStraights.forEach((doubleStraight) => {
    const highestPair = findHighestPairInStraight(doubleStraight);
    combinations.push({
      type: "double_straight",
      cards: doubleStraight,
      value:
        getCardValue(highestPair[0].value.toString()) * 100 +
        Math.max(...highestPair.map((c) => getSuitValue(c.suit))),
      highestCard: highestPair.sort(
        (a, b) => getSuitValue(b.suit) - getSuitValue(a.suit)
      )[0],
    });
  });

  return combinations;
}

/**
 * Find all pairs in a hand
 */
function findPairs(cards: LocalCard[]): LocalCard[][] {
  const pairs: LocalCard[][] = [];
  const valueGroups = groupCardsByValue(cards);

  Object.values(valueGroups).forEach((group) => {
    if (group.length >= 2) {
      // Generate all possible pairs from this group
      for (let i = 0; i < group.length - 1; i++) {
        for (let j = i + 1; j < group.length; j++) {
          pairs.push([group[i], group[j]]);
        }
      }
    }
  });

  return pairs;
}

/**
 * Find all triples in a hand
 */
function findTriples(cards: LocalCard[]): LocalCard[][] {
  const triples: LocalCard[][] = [];
  const valueGroups = groupCardsByValue(cards);

  Object.values(valueGroups).forEach((group) => {
    if (group.length >= 3) {
      // Generate all possible triples from this group
      for (let i = 0; i < group.length - 2; i++) {
        for (let j = i + 1; j < group.length - 1; j++) {
          for (let k = j + 1; k < group.length; k++) {
            triples.push([group[i], group[j], group[k]]);
          }
        }
      }
    }
  });

  return triples;
}

/**
 * Find all quads in a hand
 */
function findQuads(cards: LocalCard[]): LocalCard[][] {
  const quads: LocalCard[][] = [];
  const valueGroups = groupCardsByValue(cards);

  Object.values(valueGroups).forEach((group) => {
    if (group.length === 4) {
      quads.push(group);
    }
  });

  return quads;
}

/**
 * Find all possible straights in a hand
 */
function findStraights(cards: LocalCard[]): LocalCard[][] {
  const straights: LocalCard[][] = [];
  const uniqueValues = [...new Set(cards.map((c) => c.value.toString()))];
  const sortedValues = uniqueValues.sort(
    (a, b) => getCardValue(a) - getCardValue(b)
  );

  // Find consecutive sequences of at least 3 cards
  for (let start = 0; start < sortedValues.length - 2; start++) {
    for (let end = start + 2; end < sortedValues.length; end++) {
      const sequence = sortedValues.slice(start, end + 1);

      // Check if sequence is consecutive
      let isConsecutive = true;
      for (let i = 0; i < sequence.length - 1; i++) {
        if (getCardValue(sequence[i + 1]) - getCardValue(sequence[i]) !== 1) {
          isConsecutive = false;
          break;
        }
      }

      if (isConsecutive && !sequence.includes("2")) {
        // No 2s in straights
        // Build the straight with one card per value
        const straight: LocalCard[] = [];
        sequence.forEach((value) => {
          const cardsOfValue = cards.filter(
            (c) => c.value.toString() === value
          );
          if (cardsOfValue.length > 0) {
            // Pick the highest suit for this value
            const highestSuitCard = cardsOfValue.sort(
              (a, b) => getSuitValue(b.suit) - getSuitValue(a.suit)
            )[0];
            straight.push(highestSuitCard);
          }
        });

        if (straight.length === sequence.length) {
          straights.push(straight);
        }
      }
    }
  }

  return straights;
}

/**
 * Find all possible double straights (consecutive pairs) in a hand
 */
function findDoubleStraights(cards: LocalCard[]): LocalCard[][] {
  const doubleStraights: LocalCard[][] = [];
  const pairs = findPairs(cards);

  // Group pairs by their value
  const pairsByValue: { [value: string]: LocalCard[][] } = {};
  pairs.forEach((pair) => {
    const value = pair[0].value.toString();
    if (!pairsByValue[value]) {
      pairsByValue[value] = [];
    }
    pairsByValue[value].push(pair);
  });

  const availableValues = Object.keys(pairsByValue).sort(
    (a, b) => getCardValue(a) - getCardValue(b)
  );

  // Find consecutive sequences of pairs
  for (let start = 0; start < availableValues.length - 2; start++) {
    for (let end = start + 2; end < availableValues.length; end++) {
      const sequence = availableValues.slice(start, end + 1);

      // Check if sequence is consecutive
      let isConsecutive = true;
      for (let i = 0; i < sequence.length - 1; i++) {
        if (getCardValue(sequence[i + 1]) - getCardValue(sequence[i]) !== 1) {
          isConsecutive = false;
          break;
        }
      }

      if (isConsecutive && !sequence.includes("2")) {
        // No 2s in double straights
        // Build the double straight
        const doubleStraight: LocalCard[] = [];
        let canBuild = true;

        sequence.forEach((value) => {
          if (pairsByValue[value] && pairsByValue[value].length > 0) {
            doubleStraight.push(...pairsByValue[value][0]);
          } else {
            canBuild = false;
          }
        });

        if (canBuild) {
          doubleStraights.push(doubleStraight);
        }
      }
    }
  }

  return doubleStraights;
}

/**
 * Group cards by their value
 */
function groupCardsByValue(cards: LocalCard[]): {
  [value: string]: LocalCard[];
} {
  const groups: { [value: string]: LocalCard[] } = {};

  cards.forEach((card) => {
    const value = card.value.toString();
    if (!groups[value]) {
      groups[value] = [];
    }
    groups[value].push(card);
  });

  return groups;
}

/**
 * Find the highest pair in a double straight
 */
function findHighestPairInStraight(doubleStraight: LocalCard[]): LocalCard[] {
  const pairs: LocalCard[][] = [];
  const valueGroups = groupCardsByValue(doubleStraight);

  Object.values(valueGroups).forEach((group) => {
    if (group.length >= 2) {
      pairs.push(group.slice(0, 2));
    }
  });

  return (
    pairs.sort((a, b) => {
      const valueCompare =
        getCardValue(b[0].value.toString()) -
        getCardValue(a[0].value.toString());
      if (valueCompare !== 0) return valueCompare;
      return (
        Math.max(...b.map((c) => getSuitValue(c.suit))) -
        Math.max(...a.map((c) => getSuitValue(c.suit)))
      );
    })[0] || doubleStraight.slice(0, 2)
  );
}

// =====================================================
// GAME LOGIC AND COMPARISON
// =====================================================

/**
 * Check if a combination can beat another combination
 */
export function canBeat(
  playerCombo: CardCombination,
  targetCombo: CardCombination
): boolean {
  // Must be same type and same number of cards
  if (
    playerCombo.type !== targetCombo.type ||
    playerCombo.cards.length !== targetCombo.cards.length
  ) {
    // Check for special bomb combinations
    return checkBombLogic(playerCombo, targetCombo);
  }

  // Same type comparison
  return playerCombo.value > targetCombo.value;
}

/**
 * Check special bomb logic (quads beating certain combinations)
 */
function checkBombLogic(
  playerCombo: CardCombination,
  targetCombo: CardCombination
): boolean {
  // Quad beats single 2
  if (
    playerCombo.type === "quad" &&
    targetCombo.type === "single" &&
    targetCombo.cards[0].value === "2"
  ) {
    return true;
  }

  // 3-pair double straight beats single 2
  if (
    playerCombo.type === "double_straight" &&
    playerCombo.cards.length === 6 &&
    targetCombo.type === "single" &&
    targetCombo.cards[0].value === "2"
  ) {
    return true;
  }

  // 4-pair double straight beats pair of 2s
  if (
    playerCombo.type === "double_straight" &&
    playerCombo.cards.length === 8 &&
    targetCombo.type === "pair" &&
    targetCombo.cards.every((c) => c.value === "2")
  ) {
    return true;
  }

  // 5-pair double straight beats triple 2s
  if (
    playerCombo.type === "double_straight" &&
    playerCombo.cards.length === 10 &&
    targetCombo.type === "triple" &&
    targetCombo.cards.every((c) => c.value === "2")
  ) {
    return true;
  }

  return false;
}

/**
 * Get the combination type of played cards
 */
export function getCombinationType(cards: LocalCard[]): CardCombination | null {
  if (cards.length === 0) return null;

  const allCombinations = findAllCombinations(cards);
  return (
    allCombinations.find(
      (combo) =>
        combo.cards.length === cards.length &&
        combo.cards.every((c) => cards.some((pc) => pc.code === c.code))
    ) || null
  );
}

// =====================================================
// AI STRATEGY IMPLEMENTATION
// =====================================================

/**
 * Main AI decision-making function
 */
export function makeAIDecision(context: GameContext): PlayDecision {
  const {
    playerCards,
    lastPlayedCards,
    isFirstPlay,
    mustIncludeThreeOfSpades,
  } = context;

  // Handle first play with 3 of Spades requirement
  if (isFirstPlay && mustIncludeThreeOfSpades) {
    return handleFirstPlayWithThreeOfSpades(playerCards);
  }

  // If no cards have been played yet, start with a low card
  if (lastPlayedCards.length === 0) {
    return makeOpeningPlay(playerCards, context);
  }

  // Try to beat the last played combination
  const targetCombo = getCombinationType(lastPlayedCards);
  if (!targetCombo) {
    return {
      shouldPlay: false,
      cards: [],
      confidence: 0,
      reasoning: "Cannot determine target combination",
    };
  }

  return findBestResponse(playerCards, targetCombo, context);
}

/**
 * Handle the mandatory first play with 3 of Spades
 */
function handleFirstPlayWithThreeOfSpades(
  playerCards: LocalCard[]
): PlayDecision {
  const threeOfSpades = playerCards.find((card) => card.code === "3S");

  if (!threeOfSpades) {
    return {
      shouldPlay: false,
      cards: [],
      confidence: 0,
      reasoning: "No 3 of Spades found",
    };
  }

  // Try to include 3 of Spades in a larger combination if possible
  const allCombinations = findAllCombinations(playerCards);
  const combosWithThreeOfSpades = allCombinations.filter((combo) =>
    combo.cards.some((card) => card.code === "3S")
  );

  if (combosWithThreeOfSpades.length > 1) {
    // Choose the best combination that includes 3 of Spades
    const bestCombo =
      combosWithThreeOfSpades
        .filter((combo) => combo.type !== "single") // Prefer combinations over single
        .sort((a, b) => b.cards.length - a.cards.length)[0] ||
      combosWithThreeOfSpades[0];

    return {
      shouldPlay: true,
      cards: bestCombo.cards,
      confidence: 0.8,
      reasoning: `Playing ${bestCombo.type} including 3 of Spades`,
    };
  }

  return {
    shouldPlay: true,
    cards: [threeOfSpades],
    confidence: 1.0,
    reasoning: "Playing mandatory 3 of Spades",
  };
}

/**
 * Make an opening play when no cards have been played
 */
function makeOpeningPlay(
  playerCards: LocalCard[],
  context: GameContext
): PlayDecision {
  const strategy = determineGameStrategy(playerCards, context);

  // In early game, try to get rid of low cards
  const lowCards = playerCards
    .filter((card) => getCardValue(card.value.toString()) <= 4) // 3s and 4s
    .sort(
      (a, b) =>
        getCardValue(a.value.toString()) - getCardValue(b.value.toString())
    );

  if (lowCards.length > 0) {
    // Try to play low cards in combinations if possible
    const allCombinations = findAllCombinations(lowCards);
    const goodCombos = allCombinations.filter(
      (combo) =>
        combo.type !== "single" &&
        combo.cards.every((c) => getCardValue(c.value.toString()) <= 6)
    );

    if (goodCombos.length > 0) {
      const bestCombo = goodCombos.sort(
        (a, b) => b.cards.length - a.cards.length
      )[0];
      return {
        shouldPlay: true,
        cards: bestCombo.cards,
        confidence: 0.7,
        reasoning: `Opening with low ${bestCombo.type}`,
      };
    }

    return {
      shouldPlay: true,
      cards: [lowCards[0]],
      confidence: 0.6,
      reasoning: "Opening with lowest card",
    };
  }

  // If no low cards, play a conservative single
  const conservativeCards = playerCards
    .filter((card) => getCardValue(card.value.toString()) <= 8)
    .sort(
      (a, b) =>
        getCardValue(a.value.toString()) - getCardValue(b.value.toString())
    );

  if (conservativeCards.length > 0) {
    return {
      shouldPlay: true,
      cards: [conservativeCards[0]],
      confidence: 0.5,
      reasoning: "Conservative opening play",
    };
  }

  // Last resort - play lowest available card
  const sortedCards = [...playerCards].sort(
    (a, b) =>
      getCardValue(a.value.toString()) - getCardValue(b.value.toString())
  );

  return {
    shouldPlay: true,
    cards: [sortedCards[0]],
    confidence: 0.3,
    reasoning: "Playing lowest available card",
  };
}

/**
 * Find the best response to beat a target combination
 */
function findBestResponse(
  playerCards: LocalCard[],
  targetCombo: CardCombination,
  context: GameContext
): PlayDecision {
  const allCombinations = findAllCombinations(playerCards);
  const validResponses = allCombinations.filter((combo) =>
    canBeat(combo, targetCombo)
  );

  if (validResponses.length === 0) {
    return evaluatePassDecision(context);
  }

  // Evaluate each valid response
  const evaluatedResponses = validResponses.map((combo) => ({
    combo,
    score: evaluatePlay(combo, playerCards, context),
  }));

  // Sort by score (higher is better)
  evaluatedResponses.sort((a, b) => b.score - a.score);

  const bestResponse = evaluatedResponses[0];

  // Decide whether to play based on score and strategy
  const shouldPlay = shouldMakePlay(bestResponse.score, context);

  if (shouldPlay) {
    return {
      shouldPlay: true,
      cards: bestResponse.combo.cards,
      confidence: Math.min(bestResponse.score / 100, 1.0),
      reasoning: `Playing ${bestResponse.combo.type} (score: ${Math.round(
        bestResponse.score
      )})`,
    };
  }

  return evaluatePassDecision(context);
}

/**
 * Evaluate whether to pass
 */
function evaluatePassDecision(context: GameContext): PlayDecision {
  const { playerCardCounts, currentPlayerIndex } = context;
  const currentPlayerCards = playerCardCounts[currentPlayerIndex];

  // Pass if we have many cards and others are close to winning
  const othersCloseToWinning = playerCardCounts.some(
    (count, index) => index !== currentPlayerIndex && count <= 3
  );

  if (othersCloseToWinning && currentPlayerCards > 6) {
    return {
      shouldPlay: false,
      cards: [],
      confidence: 0.7,
      reasoning: "Passing - conserving cards while others are close to winning",
    };
  }

  return {
    shouldPlay: false,
    cards: [],
    confidence: 0.5,
    reasoning: "Passing - no good plays available",
  };
}

/**
 * Evaluate the quality of a play
 */
function evaluatePlay(
  combo: CardCombination,
  allCards: LocalCard[],
  context: GameContext
): number {
  let score = 0;

  // Base score based on combination type
  const typeScores = {
    single: 10,
    pair: 20,
    triple: 35,
    quad: 50,
    straight: 30,
    double_straight: 40,
    bomb: 60,
  };

  score += typeScores[combo.type] || 0;

  // Prefer getting rid of more cards
  score += combo.cards.length * 5;

  // Prefer getting rid of low-value cards early
  const avgValue =
    combo.cards.reduce(
      (sum, card) => sum + getCardValue(card.value.toString()),
      0
    ) / combo.cards.length;
  score += (13 - avgValue) * 2; // Lower values get higher scores

  // Bonus for efficient use of hand
  const remainingAfterPlay = allCards.length - combo.cards.length;
  if (remainingAfterPlay <= 3) {
    score += currentAIConfig.winBonus; // Use configurable win bonus
  }

  // Penalty for using powerful cards (2s, Aces) early
  const powerCards = combo.cards.filter((card) =>
    ["2", "A"].includes(card.value.toString())
  );
  if (context.playerCards.length > 6 && powerCards.length > 0) {
    score -= powerCards.length * currentAIConfig.powerCardPenalty; // Use configurable penalty
  }

  // Apply aggressiveness modifier
  score *= 1 + currentAIConfig.aggressiveness * 0.3;

  // Apply conservatism modifier (higher conservatism = prefer holding cards)
  if (combo.cards.length > 2) {
    score *= 1 + currentAIConfig.conservatism * 0.2;
  }

  if (currentAIConfig.enableLogging) {
    console.log(
      `🎯 Evaluating ${combo.type}: base=${
        typeScores[combo.type]
      }, final=${Math.round(score)}`
    );
  }

  return score;
}

/**
 * Determine whether to make a play based on score and context
 */
function shouldMakePlay(score: number, context: GameContext): boolean {
  const { playerCardCounts, currentPlayerIndex } = context;
  const currentPlayerCards = playerCardCounts[currentPlayerIndex];

  // Always play if we have few cards left
  if (currentPlayerCards <= 4) {
    return score > currentAIConfig.playThreshold * 0.6;
  }

  // Be more conservative if we have many cards
  if (currentPlayerCards > 8) {
    return score > currentAIConfig.playThreshold * 1.4;
  }

  // Use configurable threshold
  return score > currentAIConfig.playThreshold;
}

/**
 * Determine overall game strategy based on current state
 */
function determineGameStrategy(
  playerCards: LocalCard[],
  context: GameContext
): "aggressive" | "conservative" | "defensive" {
  const { playerCardCounts, currentPlayerIndex } = context;
  const currentPlayerCards = playerCardCounts[currentPlayerIndex];

  // Aggressive if we're close to winning
  if (currentPlayerCards <= 5) {
    return "aggressive";
  }

  // Defensive if others are close to winning
  const othersCloseToWinning = playerCardCounts.some(
    (count, index) => index !== currentPlayerIndex && count <= 3
  );

  if (othersCloseToWinning) {
    return "defensive";
  }

  // Conservative for mid-game
  return "conservative";
}

/**
 * Helper function to check if cards form a valid combination
 */
export function isValidCombination(cards: LocalCard[]): boolean {
  if (cards.length === 0) return false;

  const combo = getCombinationType(cards);
  return combo !== null;
}
