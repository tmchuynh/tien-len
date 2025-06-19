/**
 * AI Testing and Debugging Utilities for Tien Len
 */

import { LocalCard } from "@/lib/interfaces/cards";
import {
  CombinationType,
  findAllCombinations,
  GameContext,
  makeAIDecision,
} from "./aiStrategy";

// =====================================================
// TEST SCENARIOS
// =====================================================

/**
 * Create test cards for debugging
 */
export function createTestCards(cardCodes: string[]): LocalCard[] {
  return cardCodes.map((code) => {
    const suit = code.slice(-1).toLowerCase();
    const value = code.slice(0, -1);

    const suitMap: {
      [key: string]: "hearts" | "diamonds" | "clubs" | "spades";
    } = {
      h: "hearts",
      d: "diamonds",
      c: "clubs",
      s: "spades",
    };

    return {
      code,
      value: value === "0" ? "10" : value, // Handle 10s
      suit: suitMap[suit] || "spades",
      image: `https://deckofcardsapi.com/static/img/${code}.png`,
    };
  });
}

/**
 * Test scenarios for AI decision making
 */
export const testScenarios = {
  // Opening with 3 of Spades
  mandatoryThreeOfSpades: {
    playerCards: createTestCards([
      "3S",
      "4H",
      "5D",
      "6C",
      "7S",
      "8H",
      "9D",
      "TC",
      "JH",
      "QS",
      "KD",
      "AC",
      "2H",
    ]),
    lastPlayedCards: [],
    isFirstPlay: true,
    mustIncludeThreeOfSpades: true,
    description: "Must play 3 of Spades on first turn",
  },

  // Beating a single card
  beatingSingle: {
    playerCards: createTestCards([
      "4H",
      "5D",
      "6C",
      "7S",
      "8H",
      "9D",
      "TC",
      "JH",
      "QS",
      "KD",
      "AC",
      "2H",
      "2S",
    ]),
    lastPlayedCards: createTestCards(["5H"]),
    isFirstPlay: false,
    mustIncludeThreeOfSpades: false,
    description: "Beat a single 5 of Hearts",
  },

  // Beating a pair
  beatingPair: {
    playerCards: createTestCards([
      "4H",
      "4D",
      "6C",
      "7S",
      "8H",
      "8D",
      "TC",
      "JH",
      "QS",
      "QD",
      "AC",
      "2H",
      "2S",
    ]),
    lastPlayedCards: createTestCards(["7H", "7D"]),
    isFirstPlay: false,
    mustIncludeThreeOfSpades: false,
    description: "Beat a pair of 7s",
  },

  // Using a bomb
  bombingSingle2: {
    playerCards: createTestCards([
      "4H",
      "4D",
      "4C",
      "4S",
      "6C",
      "7S",
      "8H",
      "9D",
      "TC",
      "JH",
      "QS",
      "KD",
      "AC",
    ]),
    lastPlayedCards: createTestCards(["2H"]),
    isFirstPlay: false,
    mustIncludeThreeOfSpades: false,
    description: "Use quad 4s to bomb a single 2",
  },

  // End game scenario
  endGame: {
    playerCards: createTestCards(["KD", "AC", "2H"]),
    lastPlayedCards: createTestCards(["QS"]),
    isFirstPlay: false,
    mustIncludeThreeOfSpades: false,
    description: "End game with 3 cards left",
  },

  // Complex straight scenario
  straightPlay: {
    playerCards: createTestCards([
      "3H",
      "4D",
      "5C",
      "6S",
      "7H",
      "8D",
      "9C",
      "TC",
      "JH",
      "QS",
      "KD",
      "AC",
      "2H",
    ]),
    lastPlayedCards: [],
    isFirstPlay: false,
    mustIncludeThreeOfSpades: false,
    description: "Hand with potential straights",
  },
};

// =====================================================
// DEBUGGING FUNCTIONS
// =====================================================

/**
 * Analyze a hand and log all possible combinations
 */
export function analyzeHand(cards: LocalCard[]): void {
  console.log("🔍 Analyzing hand:", cards.map((c) => c.code).join(", "));

  const combinations = findAllCombinations(cards);

  const combinationsByType: { [key in CombinationType]?: typeof combinations } =
    {};

  combinations.forEach((combo) => {
    if (!combinationsByType[combo.type]) {
      combinationsByType[combo.type] = [];
    }
    combinationsByType[combo.type]!.push(combo);
  });

  Object.entries(combinationsByType).forEach(([type, combos]) => {
    console.log(`\n📊 ${type.toUpperCase()}:`);
    combos!.forEach((combo, index) => {
      console.log(
        `  ${index + 1}. ${combo.cards.map((c) => c.code).join(", ")} (value: ${
          combo.value
        })`
      );
    });
  });
}

/**
 * Test AI decision for a specific scenario
 */
export function testAIDecision(scenarioName: keyof typeof testScenarios): void {
  const scenario = testScenarios[scenarioName];

  console.log(`\n🎮 Testing scenario: ${scenario.description}`);
  console.log(
    `📋 Player cards: ${scenario.playerCards.map((c) => c.code).join(", ")}`
  );

  if (scenario.lastPlayedCards.length > 0) {
    console.log(
      `🎯 Last played: ${scenario.lastPlayedCards
        .map((c) => c.code)
        .join(", ")}`
    );
  }

  const context: GameContext = {
    playerCards: scenario.playerCards,
    lastPlayedCards: scenario.lastPlayedCards,
    isFirstPlay: scenario.isFirstPlay,
    mustIncludeThreeOfSpades: scenario.mustIncludeThreeOfSpades,
    remainingPlayers: 4,
    playerCardCounts: [13, 13, 13, 13],
    currentPlayerIndex: 0,
  };

  const decision = makeAIDecision(context);

  console.log(`\n🤖 AI Decision:`);
  console.log(`   Should play: ${decision.shouldPlay}`);
  console.log(`   Cards: ${decision.cards.map((c) => c.code).join(", ")}`);
  console.log(`   Confidence: ${Math.round(decision.confidence * 100)}%`);
  console.log(`   Reasoning: ${decision.reasoning}`);
}

/**
 * Test all scenarios
 */
export function testAllScenarios(): void {
  console.log("🧪 Running all AI test scenarios...\n");

  Object.keys(testScenarios).forEach((scenarioName) => {
    testAIDecision(scenarioName as keyof typeof testScenarios);
    console.log("\n" + "=".repeat(50) + "\n");
  });
}

/**
 * Compare AI decisions with different card counts
 */
export function testCardCountStrategy(): void {
  const baseCards = createTestCards([
    "4H",
    "5D",
    "6C",
    "7S",
    "8H",
    "9D",
    "TC",
    "JH",
  ]);
  const lastPlayed = createTestCards(["3H"]);

  const cardCounts = [13, 8, 5, 3, 1];

  console.log("🔄 Testing AI strategy with different card counts:");

  cardCounts.forEach((count) => {
    const context: GameContext = {
      playerCards: baseCards.slice(0, Math.min(count, baseCards.length)),
      lastPlayedCards: lastPlayed,
      isFirstPlay: false,
      mustIncludeThreeOfSpades: false,
      remainingPlayers: 4,
      playerCardCounts: [count, 10, 10, 10],
      currentPlayerIndex: 0,
    };

    const decision = makeAIDecision(context);

    console.log(`\n📊 With ${count} cards:`);
    console.log(`   Decision: ${decision.shouldPlay ? "PLAY" : "PASS"}`);
    console.log(`   Cards: ${decision.cards.map((c) => c.code).join(", ")}`);
    console.log(`   Reasoning: ${decision.reasoning}`);
  });
}

// =====================================================
// BROWSER CONSOLE HELPERS
// =====================================================

/**
 * Expose testing functions to browser console for debugging
 */
export function exposeToConsole(): void {
  if (typeof window !== "undefined") {
    (window as any).tienLenAI = {
      test: testAIDecision,
      testAll: testAllScenarios,
      analyze: analyzeHand,
      createCards: createTestCards,
      testCardCount: testCardCountStrategy,
      scenarios: testScenarios,
    };

    console.log("🎮 Tien Len AI testing functions exposed to console:");
    console.log(
      "   window.tienLenAI.test(scenarioName) - Test specific scenario"
    );
    console.log("   window.tienLenAI.testAll() - Test all scenarios");
    console.log(
      "   window.tienLenAI.analyze(cards) - Analyze hand combinations"
    );
    console.log("   window.tienLenAI.createCards(codes) - Create test cards");
    console.log(
      "   window.tienLenAI.testCardCount() - Test strategy with different card counts"
    );
    console.log("   window.tienLenAI.scenarios - Available test scenarios");
  }
}
