// Glossary terms organized by category
// Basic terms that can be safely looked up via dictionary API
export const basicGlossary = {
  suits: ["spades", "hearts", "diamonds", "clubs", "suit"],
  cardTypes: ["ace", "king", "queen", "jack", "joker", "deuce"],
  basicTerms: [
    "deck",
    "hand",
    "deal",
    "shuffle",
    "cut",
    "card",
    "rank",
    "value",
  ],
  actions: ["pass", "play", "beat", "trump", "lead", "follow"],
  combinations: ["pair", "triple", "sequence", "straight", "flush", "run"],
};

// Complex Tiến Lên specific terms that need custom definitions
export const customGlossary = [
  {
    term: "Bomb",
    pronunciation: "/bɒm/",
    definition:
      "A special combination that can beat higher-ranked cards in Tiến Lên, such as a four-of-a-kind beating a single 2.",
    example: "Four 3s can bomb a single 2 of Hearts.",
    category: "special-moves",
  },
  {
    term: "Chop",
    pronunciation: "/tʃɒp/",
    definition:
      "Another term for bomb; a powerful combination that defeats what would normally be unbeatable.",
    example: "You can chop those 2s with your four-of-a-kind.",
    category: "special-moves",
  },
  {
    term: "Double Run",
    pronunciation: "/ˈdʌbəl rʌn/",
    definition:
      "A sequence of consecutive pairs in Tiến Lên, requiring at least three pairs (6 cards total).",
    example: "4♠4♥ 5♣5♦ 6♠6♥ is a three-pair double run.",
    category: "combinations",
  },
  {
    term: "Shedding Game",
    pronunciation: "/ˈʃɛdɪŋ geɪm/",
    definition:
      "A type of card game where the goal is to be the first player to get rid of all cards in your hand.",
    example: "Tiến Lên is a shedding game like UNO or Crazy Eights.",
    category: "game-types",
  },
  {
    term: "Climbing Game",
    pronunciation: "/ˈklaɪmɪŋ geɪm/",
    definition:
      "A card game where players must play higher-ranked cards or combinations to beat the previous play.",
    example:
      "In climbing games like Tiến Lên, you must play a higher pair to beat a pair.",
    category: "game-types",
  },
  {
    term: "Counter-clockwise",
    pronunciation: "/ˈkaʊntər ˈklɒkwaɪz/",
    definition:
      "The direction of play in Tiến Lên, opposite to the movement of clock hands.",
    example: "Players take turns counter-clockwise around the table.",
    category: "gameplay",
  },
  {
    term: "Instant Win",
    pronunciation: "/ˈɪnstənt wɪn/",
    definition:
      "Special hands in Tiến Lên that automatically win the game when dealt, such as four 2s or a dragon series.",
    example: "Getting four 2s is an instant win condition.",
    category: "winning",
  },
  {
    term: "Dragon Series",
    pronunciation: "/ˈdræɡən ˈsɪriz/",
    definition:
      "A complete sequence from 3 to 2 (3-4-5-6-7-8-9-10-J-Q-K-A-2) in any suits, which is an instant win.",
    example: "A dragon series contains all 13 different card ranks.",
    category: "winning",
  },
];

// Vietnamese terms with pronunciations and cultural context
export const vietnameseGlossary = [
  {
    term: "Tiến Lên",
    vietnamese: "Tiến lên",
    pronunciation: "/tiən˧ len˦/",
    literal: "Advance forward",
    definition:
      "The Vietnamese name for this popular card game, also known as Thirteen or Vietnamese Cards.",
    culturalNote:
      "The name reflects the climbing nature of the game where you must play higher cards.",
    category: "game-name",
  },
  {
    term: "Tứ Quý",
    vietnamese: "Tứ quý",
    pronunciation: "/tu˦˥ kwi˦/",
    literal: "Four precious",
    definition: "Four of a kind; four cards of the same rank.",
    example: "Tứ quý ba (four 3s) can beat a single 2.",
    category: "combinations",
  },
  {
    term: "Đôi Thông",
    vietnamese: "Đôi thông",
    pronunciation: "/doi˦ tʰɔŋ˦/",
    literal: "Consecutive pairs",
    definition: "A double run; consecutive pairs played together.",
    example: "Three đôi thông: 4-4, 5-5, 6-6.",
    category: "combinations",
  },
  {
    term: "Sảnh",
    vietnamese: "Sảnh",
    pronunciation: "/saɲ˦/",
    literal: "Hall/lobby",
    definition: "A straight or run; consecutive cards of different suits.",
    example: "Sảnh 5-6-7 beats sảnh 3-4-5.",
    category: "combinations",
  },
  {
    term: "Chặt",
    vietnamese: "Chặt",
    pronunciation: "/tʃat˧˥/",
    literal: "To chop/cut",
    definition:
      "To bomb or chop; using a special combination to beat higher cards.",
    example: "Chặt hai cô (chop the pair of 2s) with a four-pair double run.",
    category: "special-moves",
  },
  {
    term: "Bỏ Lượt",
    vietnamese: "Bỏ lượt",
    pronunciation: "/bo˧˩ luət˧˥/",
    literal: "Skip turn",
    definition: "To pass; choosing not to play cards on your turn.",
    example: "If you can't beat the current play, you must bỏ lượt.",
    category: "actions",
  },
  {
    term: "Ăn Trắng",
    vietnamese: "Ăn trắng",
    pronunciation: "/an˦ tʰraŋ˧˥/",
    literal: "Eat white/clean",
    definition:
      "To win a hand without the opponents playing any cards; a shutout victory.",
    culturalNote: "This is considered a particularly impressive win.",
    category: "winning",
  },
  {
    term: "Cù Lũ",
    vietnamese: "Cù lũ",
    pronunciation: "/ku˦ lu˦/",
    literal: "Flush group",
    definition:
      "Regional term for specific card combinations, varies by location.",
    culturalNote: "Different Vietnamese regions may use different terms.",
    category: "regional",
  },
  {
    term: "Hai Cô",
    vietnamese: "Hai cô",
    pronunciation: "/hai˦ ko˦/",
    literal: "Two ladies",
    definition: "Pair of 2s; the highest pair in standard play.",
    example: "Hai cô is very powerful and hard to beat.",
    category: "combinations",
  },
  {
    term: "Ba Đầu",
    vietnamese: "Ba đầu",
    pronunciation: "/ba˦ dau˦/",
    literal: "Three heads",
    definition: "Three of a kind; three cards of the same rank.",
    example: "Ba đầu tám (three 8s) beats ba đầu bảy (three 7s).",
    category: "combinations",
  },
];

// Categories for organizing the glossary
export const glossaryCategories = {
  "basic-terms": {
    name: "Basic Terms",
    description: "Fundamental card game terminology",
    icon: "🃏",
  },
  combinations: {
    name: "Card Combinations",
    description: "Different ways to play cards together",
    icon: "🎯",
  },
  "special-moves": {
    name: "Special Moves",
    description: "Bombs, chops, and other advanced plays",
    icon: "💣",
  },
  gameplay: {
    name: "Gameplay",
    description: "Rules and mechanics of play",
    icon: "🎲",
  },
  winning: {
    name: "Winning Conditions",
    description: "Ways to win the game",
    icon: "🏆",
  },
  vietnamese: {
    name: "Vietnamese Terms",
    description: "Traditional Vietnamese terminology",
    icon: "🇻🇳",
  },
  actions: {
    name: "Player Actions",
    description: "Things players can do during the game",
    icon: "▶️",
  },
  "game-types": {
    name: "Game Classification",
    description: "Types and categories of card games",
    icon: "🎮",
  },
};

// Export all glossary data
export const glossaryData = {
  basic: basicGlossary,
  custom: customGlossary,
  vietnamese: vietnameseGlossary,
  categories: glossaryCategories,
};
