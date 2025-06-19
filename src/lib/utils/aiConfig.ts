/**
 * AI Configuration for Tien Len Game
 * Adjust these settings to change AI behavior
 */

export interface AIConfig {
  /** How aggressive the AI should be (0.0 - 1.0) */
  aggressiveness: number;

  /** How much the AI values card conservation (0.0 - 1.0) */
  conservatism: number;

  /** How likely the AI is to use bombs (0.0 - 1.0) */
  bombProbability: number;

  /** Minimum score threshold for playing cards */
  playThreshold: number;

  /** How much to penalize using powerful cards early */
  powerCardPenalty: number;

  /** Bonus for plays that get close to winning */
  winBonus: number;

  /** How much to consider opponent card counts */
  opponentAwareness: number;

  /** Delay between AI moves (milliseconds) */
  moveDelay: number;

  /** Enable AI reasoning logs */
  enableLogging: boolean;
}

/**
 * Default AI configuration - balanced play
 */
export const defaultAIConfig: AIConfig = {
  aggressiveness: 0.6,
  conservatism: 0.5,
  bombProbability: 0.3,
  playThreshold: 35,
  powerCardPenalty: 15,
  winBonus: 30,
  opponentAwareness: 0.7,
  moveDelay: 1500,
  enableLogging: true,
};

/**
 * Aggressive AI - plays more cards, uses bombs frequently
 */
export const aggressiveAIConfig: AIConfig = {
  aggressiveness: 0.9,
  conservatism: 0.2,
  bombProbability: 0.7,
  playThreshold: 25,
  powerCardPenalty: 8,
  winBonus: 40,
  opponentAwareness: 0.8,
  moveDelay: 1000,
  enableLogging: true,
};

/**
 * Conservative AI - saves cards, rarely uses bombs
 */
export const conservativeAIConfig: AIConfig = {
  aggressiveness: 0.3,
  conservatism: 0.8,
  bombProbability: 0.1,
  playThreshold: 50,
  powerCardPenalty: 25,
  winBonus: 20,
  opponentAwareness: 0.9,
  moveDelay: 2000,
  enableLogging: true,
};

/**
 * Smart AI - adapts strategy based on game state
 */
export const smartAIConfig: AIConfig = {
  aggressiveness: 0.7,
  conservatism: 0.6,
  bombProbability: 0.4,
  playThreshold: 40,
  powerCardPenalty: 12,
  winBonus: 35,
  opponentAwareness: 1.0,
  moveDelay: 1200,
  enableLogging: false,
};

/**
 * Beginner AI - makes simpler decisions
 */
export const beginnerAIConfig: AIConfig = {
  aggressiveness: 0.5,
  conservatism: 0.4,
  bombProbability: 0.2,
  playThreshold: 30,
  powerCardPenalty: 10,
  winBonus: 25,
  opponentAwareness: 0.4,
  moveDelay: 2500,
  enableLogging: true,
};

/**
 * Get AI config based on difficulty level
 */
export function getAIConfigByDifficulty(
  difficulty: "beginner" | "normal" | "aggressive" | "conservative" | "smart"
): AIConfig {
  switch (difficulty) {
    case "beginner":
      return beginnerAIConfig;
    case "aggressive":
      return aggressiveAIConfig;
    case "conservative":
      return conservativeAIConfig;
    case "smart":
      return smartAIConfig;
    case "normal":
    default:
      return defaultAIConfig;
  }
}

/**
 * Create custom AI config with overrides
 */
export function createCustomAIConfig(overrides: Partial<AIConfig>): AIConfig {
  return {
    ...defaultAIConfig,
    ...overrides,
  };
}

/**
 * AI personality presets for different players
 */
export const aiPersonalities = {
  alice: {
    name: "Alice",
    config: aggressiveAIConfig,
    description: "Aggressive player who likes to attack early",
  },
  bob: {
    name: "Bob",
    config: conservativeAIConfig,
    description: "Conservative player who saves powerful cards",
  },
  charlie: {
    name: "Charlie",
    config: smartAIConfig,
    description: "Strategic player who adapts to game state",
  },
};

/**
 * Global AI config (can be modified at runtime)
 */
export let currentAIConfig: AIConfig = defaultAIConfig;

/**
 * Update the global AI configuration
 */
export function updateAIConfig(newConfig: Partial<AIConfig>): void {
  currentAIConfig = {
    ...currentAIConfig,
    ...newConfig,
  };

  if (newConfig.enableLogging) {
    console.log("🤖 AI Configuration updated:", currentAIConfig);
  }
}

/**
 * Reset AI config to default
 */
export function resetAIConfig(): void {
  currentAIConfig = { ...defaultAIConfig };
  console.log("🤖 AI Configuration reset to default");
}
