// Glossary terms organized by category
// Basic terms that can be safely looked up via dictionary API
export const basicGlossary = {
  suits: ["spades", "hearts", "diamonds", "clubs", "suit"],
  cardTypes: ["ace", "king", "queen", "jack", "joker", "deuce", "court", "pip"],
  basicTerms: ["deck", "deal", "shuffle", "card", "discard"],
  actions: ["trump"],
  combinations: [],
  gameTerms: ["trick", "bluff"],
};

// Complex Tiến Lên specific terms that need custom definitions
export const customGlossary = {
  combinations: [
    {
      term: "Double Run",
      pronunciation: "/ˈdʌbəl rʌn/",
      definition:
        "A sequence of consecutive pairs in Tiến Lên, requiring at least three pairs (6 cards total).",
      example: "4♠4♥ 5♣5♦ 6♠6♥ is a three-pair double run.",
      category: "combinations",
    },
    {
      term: "Four of a Kind",
      pronunciation: "/fɔːr ʌv ə kaɪnd/",
      definition:
        "Four cards of the same rank. In Tiến Lên, this is one of the most powerful combinations that can bomb higher-ranked single cards or pairs.",
      example:
        "Four Jacks can bomb a single 2 of Hearts, which is normally the highest single card.",
      category: "combinations",
    },
    {
      term: "Three of a Kind",
      pronunciation: "/θriː ʌv ə kaɪnd/",
      definition: "Three cards of the same rank, also called a triplet or set.",
      example: "Three 8s is a valid play in Tiến Lên.",
      category: "combinations",
    },
    {
      term: "Triple",
      pronunciation: "/ˈtrɪpəl/",
      definition:
        "Another term for three of a kind; three cards of the same rank. A common combination in Tiến Lên.",
      example:
        "A triple of 7s beats a triple of 6s but loses to a triple of 8s.",
      category: "combinations",
    },
    {
      term: "Pair",
      pronunciation: "/pɛr/",
      definition:
        "Two cards of the same rank played together. One of the most common combinations in Tiến Lên.",
      example:
        "A pair of Kings beats a pair of Queens, but pair of 2s beats all other pairs.",
      category: "combinations",
    },
    {
      term: "Straight",
      pronunciation: "/streɪt/",
      definition:
        "A sequence of consecutive cards in rank order, also called a run. Must be at least 3 cards in Tiến Lên.",
      example: "5-6-7-8 is a four-card straight that beats 3-4-5-6.",
      category: "combinations",
    },
    {
      term: "Run",
      pronunciation: "/rʌn/",
      definition:
        "A sequence of consecutive cards of any suits. The basic building block for many Tiến Lên combinations.",
      example: "3♠ 4♥ 5♦ is a three-card run, the minimum length allowed.",
      category: "combinations",
    },
    {
      term: "Sequence",
      pronunciation: "/ˈsiːkwəns/",
      definition:
        "A series of cards in consecutive rank order, same as a straight or run in Tiến Lên.",
      example: "J-Q-K-A forms a four-card sequence.",
      category: "combinations",
    },
    {
      term: "Flush",
      pronunciation: "/flʌʃ/",
      definition:
        "Cards all of the same suit. While important in poker, flushes are not used as combinations in Tiến Lên.",
      example:
        "Five hearts would be a flush in poker, but in Tiến Lên only rank matters for combinations.",
      category: "combinations",
    },
  ],
  specialMoves: [
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
  ],
  cardValues: [
    {
      term: "Rank",
      pronunciation: "/ræŋk/",
      definition:
        "The numerical or face value of a card (3, 4, 5... J, Q, K, A, 2). In Tiến Lên, 3 is lowest and 2 is highest.",
      example:
        "The rank of a card determines its strength, with 2 being the highest rank.",
      category: "card-values",
    },
    {
      term: "Spot",
      pronunciation: "/spɒt/",
      definition:
        "A numbered card (3-10), as opposed to face cards. Also refers to the pip symbols on cards.",
      example: "The 7 of hearts is a spot card with seven heart symbols.",
      category: "card-values",
    },
    {
      term: "Trey",
      pronunciation: "/treɪ/",
      definition:
        "A card with the rank of 3. In Tiến Lên, the 3 of Spades is the lowest card and leads the first hand.",
      example:
        "The trey of spades must be played in the opening hand of Tiến Lên.",
      category: "card-values",
    },
    {
      term: "Face",
      pronunciation: "/feɪs/",
      definition:
        "The front side of a card showing its rank and suit, or referring to face cards (J, Q, K).",
      example: "Keep your cards face down until it's your turn to play.",
      category: "card-values",
    },
    {
      term: "Value",
      pronunciation: "/ˈvæljuː/",
      definition:
        "The worth or strength of a card or combination. In Tiến Lên, this follows the rank order 3-4-5-6-7-8-9-10-J-Q-K-A-2.",
      example: "A pair of Aces has higher value than a pair of Kings.",
      category: "card-values",
    },
  ],
  actions: [
    {
      term: "Follow",
      pronunciation: "/ˈfɒloʊ/",
      definition:
        "To play a card or combination that matches or beats the previous play. Required in Tiến Lên unless you pass.",
      example: "You must follow with a higher pair or pass your turn.",
      category: "actions",
    },
    {
      term: "Fold",
      pronunciation: "/foʊld/",
      definition:
        "To withdraw from the current hand or trick, same as passing. Not used in traditional Tiến Lên terminology.",
      example:
        "When you can't beat the current play, you effectively fold by passing.",
      category: "actions",
    },
    {
      term: "Lead",
      pronunciation: "/liːd/",
      definition:
        "To play the first card or combination in a trick. In Tiến Lên, the winner of the previous trick leads.",
      example:
        "After winning a trick, you lead the next one with any valid combination.",
      category: "actions",
    },
    {
      term: "Beat",
      pronunciation: "/biːt/",
      definition:
        "To play a higher-ranked card or combination than the previous play.",
      example: "You can beat a pair of 7s with a pair of 8s or higher.",
      category: "actions",
    },
    {
      term: "Play",
      pronunciation: "/pleɪ/",
      definition:
        "To place cards from your hand onto the table as your turn's action.",
      example: "You can play a single card, pair, triple, or run on your turn.",
      category: "actions",
    },
    {
      term: "Pass",
      pronunciation: "/pæs/",
      definition:
        "To skip your turn without playing cards, used when you cannot or choose not to beat the current play.",
      example: "If you can't beat the four of a kind, you must pass.",
      category: "actions",
    },
  ],
  gameTypes: [
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
  ],
  gameplay: [
    {
      term: "Counter-clockwise",
      pronunciation: "/ˈkaʊntər ˈklɒkwaɪz/",
      definition:
        "The direction of play in Tiến Lên, opposite to the movement of clock hands.",
      example: "Players take turns counter-clockwise around the table.",
      category: "gameplay",
    },
    {
      term: "Follow Suit",
      pronunciation: "/ˈfɒloʊ suːt/",
      definition:
        "Playing a card of the same suit as the first card played. Not required in Tiến Lên.",
      example:
        "Unlike trick-taking games, Tiến Lên doesn't require you to follow suit.",
      category: "gameplay",
    },
    {
      term: "Eldest Hand",
      pronunciation: "/ˈeldɪst hænd/",
      definition:
        "The player who plays first, usually the one with the 3 of Spades in the first hand of Tiến Lên.",
      example:
        "The eldest hand must include the 3 of Spades in their first play.",
      category: "gameplay",
    },
  ],
  winning: [
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
    {
      term: "Go Out",
      pronunciation: "/ɡoʊ aʊt/",
      definition:
        "To play your last card and win the hand by getting rid of all cards.",
      example: "The first player to go out wins the hand in Tiến Lên.",
      category: "winning",
    },
  ],
  cardHandling: [
    {
      term: "Hand",
      pronunciation: "/hænd/",
      definition:
        "The cards dealt to and held by a player during a game. In Tiến Lên, each player typically receives 13 cards.",
      example: "Arrange your hand by rank to better see possible combinations.",
      category: "card-handling",
    },
    {
      term: "Draw",
      pronunciation: "/drɔː/",
      definition:
        "To take a card from the deck. Not used in standard Tiến Lên as all cards are dealt at the start.",
      example:
        "Unlike some card games, Tiến Lên doesn't involve drawing cards during play.",
      category: "card-handling",
    },
    {
      term: "Pack",
      pronunciation: "/pæk/",
      definition:
        "Another term for a deck of cards, commonly used in British English.",
      example: "Tiến Lên is played with a standard 52-card pack.",
      category: "card-handling",
    },
    {
      term: "Cut",
      pronunciation: "/kʌt/",
      definition:
        "To divide the deck into two parts and reverse their order before dealing, used to prevent cheating.",
      example:
        "The player to the dealer's right typically cuts the deck before dealing.",
      category: "card-handling",
    },
    {
      term: "Stock",
      pronunciation: "/stɒk/",
      definition:
        "The remaining cards in the deck after dealing. Not applicable in Tiến Lên as all cards are dealt.",
      example:
        "In draw games, players take from the stock, but Tiến Lên uses all 52 cards.",
      category: "card-handling",
    },
    {
      term: "Bridge Size",
      pronunciation: "/brɪdʒ saɪz/",
      definition:
        "A narrow playing card format measuring 2.25 inches wide, contrasted with poker-size cards.",
      example: "Bridge-size cards are easier to hold in large hands.",
      category: "card-handling",
    },
    {
      term: "Poker Size",
      pronunciation: "/ˈpoʊkər saɪz/",
      definition:
        "Standard playing card format measuring 2.5 inches wide, the most common size.",
      example: "Most Tiến Lên games use poker-size cards.",
      category: "card-handling",
    },
    {
      term: "Fan",
      pronunciation: "/fæn/",
      definition:
        "A spread of cards held in a semi-circular shape, with overlapping cards showing the indices.",
      example: "Players fan their cards to see all their options.",
      category: "card-handling",
    },
  ],
};

// Vietnamese terms with pronunciations and cultural context
export const vietnameseGlossary = {
  gameName: [
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
  ],
  combinations: [
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
  ],
  specialMoves: [
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
  ],
  actions: [
    {
      term: "Bỏ Lượt",
      vietnamese: "Bỏ lượt",
      pronunciation: "/bo˧˩ luət˧˥/",
      literal: "Skip turn",
      definition: "To pass; choosing not to play cards on your turn.",
      example: "If you can't beat the current play, you must bỏ lượt.",
      category: "actions",
    },
  ],
  winning: [
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
  ],
  regional: [
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
  ],
};

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
  "card-handling": {
    name: "Card Handling",
    description: "Physical handling and card formats",
    icon: "🤹",
  },
  "card-values": {
    name: "Card Values",
    description: "Ranks, suits, and card hierarchy",
    icon: "🔢",
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
  "game-terms": {
    name: "General Game Terms",
    description: "Common card game terminology",
    icon: "🎯",
  },
};

// Export all glossary data
export const glossaryData = {
  basic: basicGlossary,
  custom: customGlossary,
  vietnamese: vietnameseGlossary,
  categories: glossaryCategories,
};
