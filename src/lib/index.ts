// =====================================================
// CARD API EXPORTS
// =====================================================

// Export all interfaces
export type {
  BaseResponse,
  Card,
  CardPlay,
  DealResult,
  Deck,
  DrawResponse,
  GameState,
  LocalCard,
  Pile,
  PileDrawResponse,
  PileResponse,
  TienLenHand,
  TienLenPlayType,
} from "./interfaces/cards";

// Export all constants
export {
  CARD_BACK_IMAGE_URL,
  DECK_API_BASE_URL,
  GAME_SETTINGS,
  PILE_NAMES,
  SUIT_MAPPING,
  TIEN_LEN_CARDS,
  TIEN_LEN_RANK_ORDER,
  TIEN_LEN_SUIT_ORDER,
  VALUE_MAPPING,
} from "./constants/cards";

// Export all utilities
export {
  convertCardsToLocal,
  convertCardToLocal,
  convertSuitToLocal,
  convertValueToLocal,
  getPlayerPileName,
  getSuitFromCode,
  getValueFromCode,
  isValidCardCode,
  sortCardsByTienLenRules,
} from "./utils/cards";
