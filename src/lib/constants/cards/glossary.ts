// Glossary terms organized by category
// Basic terms that can be safely looked up via dictionary API
export const basicGlossary = {
  suits: ["spades", "hearts", "diamonds", "clubs", "suit"],
  cardTypes: ["ace", "king", "queen", "jack", "joker", "deuce", "court", "pip"],
  basicTerms: ["deck", "deal", "shuffle", "card", "discard"],
  actions: ["trump"],
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
  cardValues: [
    {
      term: "Deck of Cards",
      vietnamese: "Bộ bài",
      pronunciation: "/boˆ˦ baː˦/",
      literal: "Set of cards",
      definition: "A complete set of 52 playing cards used in Tiến Lên.",
      example: "Mỗi ván chơi cần một bộ bài đầy đủ 52 lá.",
      category: "card-values",
    },
    {
      term: "Cards",
      vietnamese: "Bài",
      pronunciation: "/baː˦/",
      literal: "Cards",
      definition: "Individual playing cards in the deck.",
      example: "Mỗi người chơi được chia 13 lá bài.",
      category: "card-values",
    },
    {
      term: "King",
      vietnamese: "Vua",
      pronunciation: "/vuə˦/",
      literal: "King",
      definition: "The King card, ranked second highest after Ace in Tiến Lên.",
      example: "Vua cơ có thể đánh sau quân Dame.",
      category: "card-values",
    },
    {
      term: "Queen",
      vietnamese: "Nữ hoàng",
      pronunciation: "/nɯ˦˥ hoɐŋ˦/",
      literal: "Female monarch",
      definition: "The Queen card, also called Dame in some regions.",
      example: "Nữ hoàng bích là quân cao thứ ba trong bộ bài.",
      category: "card-values",
    },
    {
      term: "Jack",
      vietnamese: "Quân lính",
      pronunciation: "/kwan˦ liŋ˦/",
      literal: "Soldier card",
      definition: "The Jack card, lowest of the face cards.",
      example: "Quân lính đỏ có thể đánh sau số 10.",
      category: "card-values",
    },
    {
      term: "Ace",
      vietnamese: "Quân át",
      pronunciation: "/kwan˦ aːt˧˥/",
      literal: "Ace card",
      definition:
        "The Ace card, second highest rank in Tiến Lên, only beaten by 2.",
      example: "Quân át chỉ thua quân 2 trong Tiến Lên.",
      category: "card-values",
    },
    {
      term: "Court Card",
      vietnamese: "Quân chữ",
      pronunciation: "/kwan˦ tʃɯ˦/",
      literal: "Letter card",
      definition:
        "Face cards (Jack, Queen, King) as opposed to numbered cards.",
      example: "Quân chữ bao gồm J, Q, K trong bộ bài.",
      category: "card-values",
    },
  ],
  suits: [
    {
      term: "Suits",
      vietnamese: "Chất",
      pronunciation: "/tʃaːt˧˥/",
      literal: "Quality/nature",
      definition:
        "The four different symbols on cards: spades, hearts, diamonds, clubs.",
      example: "Có bốn chất khác nhau trong bộ bài.",
      category: "suits",
    },
    {
      term: "Clubs",
      vietnamese: "Nhép",
      pronunciation: "/ɲeːp˧˥/",
      literal: "Clubs",
      definition: "The clubs suit, represented by black clover-like symbols.",
      example: "Quân 3 nhép là lá bài thấp nhất.",
      category: "suits",
    },
    {
      term: "Diamonds",
      vietnamese: "Rô",
      pronunciation: "/roː˦/",
      literal: "Diamond",
      definition: "The diamonds suit, represented by red diamond symbols.",
      example: "Át rô là lá bài rất mạnh.",
      category: "suits",
    },
    {
      term: "Hearts",
      vietnamese: "Cơ",
      pronunciation: "/kɤː˦/",
      literal: "Heart",
      definition: "The hearts suit, represented by red heart symbols.",
      example: "2 cơ là lá bài mạnh nhất trong Tiến Lên.",
      category: "suits",
    },
    {
      term: "Spades",
      vietnamese: "Bích",
      pronunciation: "/biːt˧˥/",
      literal: "Spades",
      definition:
        "The spades suit, represented by black spade symbols. 3 of Spades starts the game.",
      example: "3 bích phải được đánh trong lượt đầu tiên.",
      category: "suits",
    },
  ],
  combinations: [
    {
      term: "Tứ Quý",
      vietnamese: "Tứ quý",
      pronunciation: "/tu˦˥ kwi˦/",
      literal: "Four precious",
      definition:
        "Four of a kind; four cards of the same rank. Also called 'Bom'.",
      example: "Tứ quý ba (four 3s) can beat a single 2.",
      category: "combinations",
    },
    {
      term: "Sáp",
      vietnamese: "Sáp",
      pronunciation: "/saːp˧˥/",
      literal: "Wax/mold",
      definition:
        "Three of a kind; three cards of the same rank. Also called 'Ba lá'.",
      example: "Sáp tám (three 8s) beats sáp bảy (three 7s).",
      category: "combinations",
    },
    {
      term: "Ba Lá",
      vietnamese: "Ba lá",
      pronunciation: "/ba˦ laː˦/",
      literal: "Three cards",
      definition:
        "Three of a kind; same as 'Sáp'. Alternative term for triple.",
      example: "Ba lá J có thể đánh sau ba lá 10.",
      category: "combinations",
    },
    {
      term: "Liêng",
      vietnamese: "Liêng",
      pronunciation: "/liəŋ˦/",
      literal: "Sequence",
      definition:
        "Three consecutive cards, not necessarily the same suit. A straight.",
      example: "Liêng 5-6-7 đánh được sau liêng 3-4-5.",
      category: "combinations",
    },
    {
      term: "Đôi",
      vietnamese: "Đôi",
      pronunciation: "/doi˦/",
      literal: "Pair",
      definition: "A pair; two cards of the same rank. Also called 'Cạ'.",
      example: "Đôi K đánh được sau đôi Q.",
      category: "combinations",
    },
    {
      term: "Cạ",
      vietnamese: "Cạ",
      pronunciation: "/ka˦/",
      literal: "Pair",
      definition: "Alternative term for a pair; two cards of the same rank.",
      example: "Cạ át là đôi bài rất mạnh.",
      category: "combinations",
    },
    {
      term: "Đôi Thông",
      vietnamese: "Đôi thông",
      pronunciation: "/doi˦ tʰɔŋ˦/",
      literal: "Consecutive pairs",
      definition:
        "A double run; consecutive pairs played together. Also called 'Sảnh đôi'.",
      example: "Three đôi thông: 4-4, 5-5, 6-6.",
      category: "combinations",
    },
    {
      term: "Sảnh Đôi",
      vietnamese: "Sảnh đôi",
      pronunciation: "/saɲ˦ doi˦/",
      literal: "Double hall",
      definition:
        "Double run; sequence of consecutive pairs, like 3-3-4-4-5-5.",
      example: "Sảnh đôi từ 7 đến 9 có thể chặt đôi 2.",
      category: "combinations",
    },
    {
      term: "Dãy Đôi",
      vietnamese: "Dãy đôi",
      pronunciation: "/zaːj˦ doi˦/",
      literal: "Double sequence",
      definition: "Alternative term for double run; consecutive pairs.",
      example: "Dãy đôi 3 cặp: J-J, Q-Q, K-K.",
      category: "combinations",
    },
    {
      term: "Sảnh",
      vietnamese: "Sảnh",
      pronunciation: "/saɲ˦/",
      literal: "Hall/lobby",
      definition:
        "A straight or run; consecutive cards of different suits. Also called 'Dãy' or 'Liêng'.",
      example: "Sảnh 5-6-7 beats sảnh 3-4-5.",
      category: "combinations",
    },
    {
      term: "Dãy",
      vietnamese: "Dãy",
      pronunciation: "/zaːj˦/",
      literal: "Sequence/series",
      definition:
        "A sequence of consecutive cards. More general term for straight.",
      example: "Dãy từ 8 đến J gồm 4 lá bài liên tiếp.",
      category: "combinations",
    },
    {
      term: "Sảnh Rồng",
      vietnamese: "Sảnh rồng",
      pronunciation: "/saɲ˦ roːŋ˦/",
      literal: "Dragon straight",
      definition:
        "A long sequence from 3 to Ace of the same suit; dragon series.",
      example: "Sảnh rồng từ 3 đến Át cùng chất là bài thắng tức thì.",
      category: "combinations",
    },
    {
      term: "Bom",
      vietnamese: "Bom",
      pronunciation: "/bom˦/",
      literal: "Bomb",
      definition:
        "Four of a kind or sequence of three or more pairs that can beat other combinations.",
      example: "Bom tứ quý có thể chặt đôi 2.",
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
      definition:
        "Three of a kind; three cards of the same rank. Same as 'Sáp'.",
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
        "To bomb or chop; using a special combination to beat higher cards. Also called 'Chém'.",
      example: "Chặt hai cô (chop the pair of 2s) with a four-pair double run.",
      category: "special-moves",
    },
    {
      term: "Chém",
      vietnamese: "Chém",
      pronunciation: "/tʃeːm˦/",
      literal: "To hack/slash",
      definition:
        "Alternative term for 'Chặt'; to cut someone's play, often referring to beating a 2 or bomb.",
      example: "Chém đôi át bằng tứ quý 4.",
      category: "special-moves",
    },
  ],
  actions: [
    {
      term: "Đánh Bài",
      vietnamese: "Đánh bài",
      pronunciation: "/daːɲ˦ baː˦/",
      literal: "Play cards",
      definition:
        "To play cards; the general action of placing cards on the table.",
      example: "Đến lượt bạn đánh bài rồi.",
      category: "actions",
    },
    {
      term: "Chia Bài",
      vietnamese: "Chia bài",
      pronunciation: "/tʃia˦ baː˦/",
      literal: "Divide cards",
      definition:
        "To deal cards; distributing cards to players at the start of the game.",
      example: "Người ngồi bên trái sẽ chia bài.",
      category: "actions",
    },
    {
      term: "Bỏ Lượt",
      vietnamese: "Bỏ lượt",
      pronunciation: "/bo˧˩ luət˧˥/",
      literal: "Skip turn",
      definition:
        "To pass; choosing not to play cards on your turn. Also simply called 'Bỏ'.",
      example: "If you can't beat the current play, you must bỏ lượt.",
      category: "actions",
    },
    {
      term: "Bỏ",
      vietnamese: "Bỏ",
      pronunciation: "/bo˧˩/",
      literal: "Skip/abandon",
      definition: "Short form of 'Bỏ lượt'; to pass your turn.",
      example: "Tôi bỏ, không đánh được.",
      category: "actions",
    },
    {
      term: "Rút Bài",
      vietnamese: "Rút bài",
      pronunciation: "/ruːt˧˥ baː˦/",
      literal: "Draw cards",
      definition: "To draw a card; not used in standard Tiến Lên.",
      example: "Trong một số biến thể, người chơi có thể rút bài.",
      category: "actions",
    },
    {
      term: "Bỏ Bài",
      vietnamese: "Bỏ bài",
      pronunciation: "/bo˧˩ baː˦/",
      literal: "Discard cards",
      definition: "To discard a card or fold; giving up cards.",
      example: "Bỏ bài khi không thể theo được.",
      category: "actions",
    },
    {
      term: "Đi Trước",
      vietnamese: "Đi trước",
      pronunciation: "/di˦ tɯɤk˧˥/",
      literal: "Go first",
      definition: "To lead; playing the first card or combination in a trick.",
      example: "Người có 3 bích sẽ đi trước.",
      category: "actions",
    },
    {
      term: "Đánh Trước",
      vietnamese: "Đánh trước",
      pronunciation: "/daːɲ˦ tɯɤk˧˥/",
      literal: "Play first",
      definition: "Alternative term for leading; playing first in a round.",
      example: "Ai thắng lượt trước sẽ đánh trước.",
      category: "actions",
    },
    {
      term: "Theo Bài",
      vietnamese: "Theo bài",
      pronunciation: "/tʰeːo˦ baː˦/",
      literal: "Follow cards",
      definition:
        "To follow the card; playing after the leader with a matching or higher combination.",
      example: "Bạn phải theo bài với đôi cao hơn.",
      category: "actions",
    },
    {
      term: "Đánh Tiếp",
      vietnamese: "Đánh tiếp",
      pronunciation: "/daːɲ˦ tiəp˧˥/",
      literal: "Play next",
      definition: "To play next; continuing the sequence of play.",
      example: "Sau khi A đánh, B sẽ đánh tiếp.",
      category: "actions",
    },
    {
      term: "Tráo Kỹ Bài",
      vietnamese: "Tráo kỹ bài",
      pronunciation: "/trao˦ kiː˦ baː˦/",
      literal: "Shuffle cards well",
      definition: "To shuffle cards thoroughly before dealing.",
      example: "Hãy tráo kỹ bài trước khi chia.",
      category: "actions",
    },
    {
      term: "Xáo Bài",
      vietnamese: "Xáo bài",
      pronunciation: "/sao˦ baː˦/",
      literal: "Mix cards",
      definition: "Simple term for shuffling cards.",
      example: "Xáo bài trước khi bắt đầu ván mới.",
      category: "actions",
    },
  ],
  winning: [
    {
      term: "Hết Bài",
      vietnamese: "Hết bài",
      pronunciation: "/heːt˧˥ baː˦/",
      literal: "Out of cards",
      definition: "To have no more cards left and thus win the round.",
      example: "Người đầu tiên hết bài sẽ thắng ván.",
      category: "winning",
    },
    {
      term: "Tới Trắng",
      vietnamese: "Tới trắng",
      pronunciation: "/toj˦ tʰraŋ˧˥/",
      literal: "Reach white/clean",
      definition:
        "General term for instant win in Tiến Lên; winning immediately after cards are dealt.",
      example: "Có sảnh rồng là tới trắng, thắng ngay.",
      category: "winning",
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
  ],
  handQuality: [
    {
      term: "Bài Đẹp",
      vietnamese: "Bài đẹp",
      pronunciation: "/baː˦ deːp˧˥/",
      literal: "Beautiful cards",
      definition:
        "A good hand; cards that are strong or form good combinations.",
      example: "Có nhiều đôi và sảnh, đây là bài đẹp.",
      category: "hand-quality",
    },
    {
      term: "Bài Xấu",
      vietnamese: "Bài xấu",
      pronunciation: "/baː˦ sɤu˦/",
      literal: "Ugly cards",
      definition:
        "A terrible hand; cards that are weak or don't form combinations.",
      example: "Toàn bài lẻ, không có đôi nào, bài xấu quá.",
      category: "hand-quality",
    },
  ],
  gameTypes: [
    {
      term: "Bài Tiến Lên",
      vietnamese: "Bài Tiến lên",
      pronunciation: "/baː˦ tiən˧ len˦/",
      literal: "Advance forward cards",
      definition: "Full name for the card game Tiến Lên; a shedding-type game.",
      example: "Chúng ta chơi bài Tiến lên nhé.",
      category: "game-types",
    },
    {
      term: "Tá Lả",
      vietnamese: "Tá lả",
      pronunciation: "/taː˦ laː˦/",
      literal: "Bridge",
      definition:
        "Bridge card game; referenced when talking about bridge-size cards.",
      example: "Bài tá lả nhỏ hơn bài poker một chút.",
      category: "game-types",
    },
    {
      term: "Xì Tố",
      vietnamese: "Xì tố",
      pronunciation: "/si˦ to˦/",
      literal: "Poker",
      definition:
        "Poker card game; referenced when talking about poker-size cards.",
      example: "Bài xì tố có kích thước tiêu chuẩn.",
      category: "game-types",
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
  suits: {
    name: "Card Suits",
    description: "The four suits in a deck of cards",
    icon: "♠️",
  },
  "hand-quality": {
    name: "Hand Quality",
    description: "Terms describing the strength of a hand",
    icon: "⭐",
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
  regional: {
    name: "Regional Terms",
    description: "Terms that vary by location",
    icon: "🗺️",
  },
};

// Export all glossary data
export const glossaryData = {
  basic: basicGlossary,
  custom: customGlossary,
  vietnamese: vietnameseGlossary,
  categories: glossaryCategories,
};
