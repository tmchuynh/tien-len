"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export default function HowToPlay() {
  return (
    <div className="bg-gradient-to-br min-h-screen table-felt">
      <div className="mx-auto px-4 py-8 container">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="drop-shadow-2xl mb-4 font-bold font-serif text-5xl text-white">
            🃏 How to Play Tiến Lên 🇻🇳
          </h1>
          <p className="mx-auto mb-6 max-w-3xl text-green-100 text-lg">
            Master the classic Vietnamese card game with this comprehensive
            guide. Learn the rules, strategies, and special moves to become a
            Tiến Lên champion!
          </p>
          <Link href="/">
            <Button variant="card" size="lg" className="mb-6">
              ← Back to Home
            </Button>
          </Link>
        </div>

        {/* Rules Content */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-5 bg-green-800/30 backdrop-blur-sm mb-8 w-full">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-green-600 text-white"
            >
              🎯 Overview
            </TabsTrigger>
            <TabsTrigger
              value="setup"
              className="data-[state=active]:bg-green-600 text-white"
            >
              🎮 Setup
            </TabsTrigger>
            <TabsTrigger
              value="gameplay"
              className="data-[state=active]:bg-green-600 text-white"
            >
              🎲 Gameplay
            </TabsTrigger>
            <TabsTrigger
              value="combinations"
              className="data-[state=active]:bg-green-600 text-white"
            >
              🃏 Cards
            </TabsTrigger>
            <TabsTrigger
              value="strategy"
              className="data-[state=active]:bg-green-600 text-white"
            >
              💡 Strategy
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm p-6">
              <h2 className="mb-4 font-bold text-3xl text-green-800">
                🎯 Game Overview
              </h2>
              <div className="space-y-4">
                <p className="text-lg">
                  <strong>Tiến lên</strong> (pronounced "tee-en len"), also
                  known as <strong>Thirteen</strong> or
                  <strong> Vietnamese Cards</strong>, is Vietnam's most popular
                  card game. It's a shedding-type card game where the objective
                  is to be the first player to get rid of all cards in your
                  hand.
                </p>

                <div className="gap-4 grid grid-cols-2 md:grid-cols-4 my-6">
                  <div className="bg-green-100 p-4 rounded-lg text-center">
                    <div className="mb-2 text-2xl">👥</div>
                    <div className="font-semibold">4 Players</div>
                    <div className="text-gray-600 text-sm">Standard game</div>
                  </div>
                  <div className="bg-blue-100 p-4 rounded-lg text-center">
                    <div className="mb-2 text-2xl">🃏</div>
                    <div className="font-semibold">52 Cards</div>
                    <div className="text-gray-600 text-sm">No jokers</div>
                  </div>
                  <div className="bg-purple-100 p-4 rounded-lg text-center">
                    <div className="mb-2 text-2xl">⏰</div>
                    <div className="font-semibold">15-30 min</div>
                    <div className="text-gray-600 text-sm">Per round</div>
                  </div>
                  <div className="bg-orange-100 p-4 rounded-lg text-center">
                    <div className="mb-2 text-2xl">🏆</div>
                    <div className="font-semibold">First Out</div>
                    <div className="text-gray-600 text-sm">Wins the game</div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm p-6">
              <h3 className="mb-4 font-bold text-2xl text-green-800">
                📊 Card & Suit Rankings
              </h3>
              <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-lg">
                    Card Values (Low to High)
                  </h4>
                  <div className="bg-gray-100 p-4 rounded-lg text-center">
                    <code className="font-mono text-lg">
                      3 → 4 → 5 → 6 → 7 → 8 → 9 → 10 → J → Q → K → A → 2
                    </code>
                  </div>
                  <p className="mt-2 text-gray-600 text-sm">
                    <strong>Note:</strong> 2s are the most powerful cards in the
                    game!
                  </p>
                </div>
                <div>
                  <h4 className="mb-3 font-semibold text-lg">
                    Suit Rankings (Low to High)
                  </h4>
                  <div className="bg-gray-100 p-4 rounded-lg text-center">
                    <code className="text-lg">
                      ♠️ Spades → ♣️ Clubs → ♦️ Diamonds → ♥️ Hearts
                    </code>
                  </div>
                  <p className="mt-2 text-gray-600 text-sm">
                    Suit ranking only matters when comparing cards of the same
                    value
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Setup Tab */}
          <TabsContent value="setup" className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm p-6">
              <h2 className="mb-4 font-bold text-3xl text-green-800">
                🎮 Game Setup
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="mb-3 font-semibold text-xl">
                    🧰 Equipment Needed
                  </h3>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-center">
                      <span className="mr-2">🃏</span> One standard 52-card deck
                      (remove jokers)
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">🪑</span> 4 players seated around a
                      table
                    </li>
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="mb-3 font-semibold text-xl">
                    🎯 Dealing Process
                  </h3>
                  <ol className="space-y-3 ml-4 list-decimal">
                    <li>
                      <strong>🎲 Determine the Dealer:</strong> Cut the deck to
                      see who gets the highest card
                    </li>
                    <li>
                      <strong>🔀 Shuffle and Deal:</strong> The dealer shuffles
                      and deals 13 cards face-down to each player
                      counter-clockwise
                    </li>
                    <li>
                      <strong>🥇 First Hand:</strong> The player with the{" "}
                      <strong>3 of Spades ♠️</strong> always starts the first
                      hand
                    </li>
                    <li>
                      <strong>🔄 Subsequent Hands:</strong> The winner of the
                      previous hand starts the next round
                    </li>
                  </ol>
                </div>

                <div className="bg-yellow-100 p-4 border-yellow-400 border-l-4 rounded">
                  <div className="flex items-center">
                    <span className="mr-3 text-2xl">⚠️</span>
                    <div>
                      <h4 className="font-semibold">Important Starting Rule</h4>
                      <p>
                        The first play of the very first hand MUST include the 3
                        of Spades ♠️
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Gameplay Tab */}
          <TabsContent value="gameplay" className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm p-6">
              <h2 className="mb-4 font-bold text-3xl text-green-800">
                🎲 How to Play
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="mb-3 font-semibold text-xl">
                    🚀 Starting the Game
                  </h3>
                  <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="mb-2 font-semibold">🥇 First Hand</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Player with 3♠️ must play first</li>
                        <li>• Must include 3♠️ in opening play</li>
                        <li>• Can play 3♠️ alone or in combination</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="mb-2 font-semibold">🔄 Later Hands</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Winner of previous hand starts</li>
                        <li>• No 3♠️ requirement</li>
                        <li>• Can play any legal combination</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="mb-3 font-semibold text-xl">
                    🔄 Turn Structure
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <Badge variant="outline" className="mt-1">
                        1
                      </Badge>
                      <div>
                        <h4 className="font-semibold">Direction of Play</h4>
                        <p className="text-gray-600">
                          Play proceeds counter-clockwise around the table
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <Badge variant="outline" className="mt-1">
                        2
                      </Badge>
                      <div>
                        <h4 className="font-semibold">Player Options</h4>
                        <ul className="ml-4 text-gray-600">
                          <li>
                            • <strong>▶️ Play:</strong> Beat the previous
                            combination with a higher one
                          </li>
                          <li>
                            • <strong>⏸️ Pass:</strong> Cannot or choose not to
                            play
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <Badge variant="outline" className="mt-1">
                        3
                      </Badge>
                      <div>
                        <h4 className="font-semibold">Round Ending</h4>
                        <p className="text-gray-600">
                          When 3 consecutive players pass, the round ends and
                          the last player to play starts fresh
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm p-6">
              <h3 className="mb-4 font-bold text-2xl text-green-800">
                💣 Special Moves: Bombs & Chops
              </h3>
              <div className="space-y-4">
                <div className="bg-red-50 p-4 border border-red-200 rounded-lg">
                  <h4 className="mb-2 font-semibold text-lg">
                    🎯 Against Solo 2s
                  </h4>
                  <ul className="space-y-1">
                    <li>
                      • <strong>💣 Any Four of a Kind</strong> beats a solo 2
                    </li>
                    <li>
                      • <strong>🔪 3-Pair Double Run</strong> beats a solo 2
                    </li>
                  </ul>
                </div>
                <div className="bg-orange-50 p-4 border border-orange-200 rounded-lg">
                  <h4 className="mb-2 font-semibold text-lg">
                    🎯 Against Pair of 2s
                  </h4>
                  <ul className="space-y-1">
                    <li>
                      • <strong>💥 4-Pair Double Run</strong> (eight consecutive
                      pairs)
                    </li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-4 border border-purple-200 rounded-lg">
                  <h4 className="mb-2 font-semibold text-lg">
                    🏆 Ultimate Power
                  </h4>
                  <ul className="space-y-1">
                    <li>
                      • <strong>🚀 Four 2s</strong> cannot be beaten - automatic
                      win!
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Combinations Tab */}
          <TabsContent value="combinations" className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm p-6">
              <h2 className="mb-4 font-bold text-3xl text-green-800">
                🃏 Legal Card Combinations
              </h2>

              <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="mb-2 font-semibold text-lg">1️⃣ Singles</h4>
                    <p className="mb-2 text-gray-600 text-sm">
                      One card played alone
                    </p>
                    <div className="bg-white p-2 rounded text-center">
                      <span className="text-lg">7♥️, Q♠️, 2♣️</span>
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="mb-2 font-semibold text-lg">2️⃣ Pairs</h4>
                    <p className="mb-2 text-gray-600 text-sm">
                      Two cards of the same rank
                    </p>
                    <div className="bg-white p-2 rounded text-center">
                      <span className="text-lg">8♠️8♦️, K♥️K♣️</span>
                    </div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="mb-2 font-semibold text-lg">3️⃣ Triples</h4>
                    <p className="mb-2 text-gray-600 text-sm">
                      Three cards of the same rank
                    </p>
                    <div className="bg-white p-2 rounded text-center">
                      <span className="text-lg">9♠️9♥️9♦️</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="mb-2 font-semibold text-lg">4️⃣ Quads</h4>
                    <p className="mb-2 text-gray-600 text-sm">
                      Four cards of the same rank
                    </p>
                    <div className="bg-white p-2 rounded text-center">
                      <span className="text-lg">J♠️J♥️J♦️J♣️</span>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="mb-2 font-semibold text-lg">
                      🏃‍♂️ Runs (Straights)
                    </h4>
                    <p className="mb-2 text-gray-600 text-sm">
                      3+ consecutive cards
                    </p>
                    <div className="bg-white p-2 rounded text-center">
                      <span className="text-lg">5♠️6♥️7♦️</span>
                    </div>
                    <p className="text-red-600 text-xs">Cannot contain 2s</p>
                  </div>

                  <div className="bg-pink-50 p-4 rounded-lg">
                    <h4 className="mb-2 font-semibold text-lg">
                      🏃‍♂️🏃‍♂️ Double Runs
                    </h4>
                    <p className="mb-2 text-gray-600 text-sm">
                      3+ consecutive pairs
                    </p>
                    <div className="bg-white p-2 rounded text-center">
                      <span className="text-lg">4♠️4♥️ 5♣️5♦️ 6♠️6♥️</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 mt-6 p-4 rounded-lg">
                <h4 className="mb-2 font-semibold">🏆 Beating Rules</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Must play the same type and number of cards</li>
                  <li>• Your combination must be higher in rank</li>
                  <li>• If ranks are equal, highest suit wins</li>
                </ul>
              </div>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm p-6">
              <h3 className="mb-4 font-bold text-2xl text-green-800">
                ⚡ Instant Win Conditions
              </h3>
              <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                <div className="bg-yellow-50 p-4 border border-yellow-300 rounded-lg">
                  <h4 className="mb-2 font-semibold">🔥 Four 2s</h4>
                  <p className="text-sm">All four deuces in your hand</p>
                </div>
                <div className="bg-blue-50 p-4 border border-blue-300 rounded-lg">
                  <h4 className="mb-2 font-semibold">🐉 Dragon Series</h4>
                  <p className="text-sm">Complete sequence 3-A-2</p>
                </div>
                <div className="bg-green-50 p-4 border border-green-300 rounded-lg">
                  <h4 className="mb-2 font-semibold">👥 Six Doubles</h4>
                  <p className="text-sm">Six pairs of any ranks</p>
                </div>
                <div className="bg-purple-50 p-4 border border-purple-300 rounded-lg">
                  <h4 className="mb-2 font-semibold">🔴⚫ All One Color</h4>
                  <p className="text-sm">All 13 cards same color</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Strategy Tab */}
          <TabsContent value="strategy" className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm p-6">
              <h2 className="mb-4 font-bold text-3xl text-green-800">
                💡 Strategy Tips
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="mb-3 font-semibold text-xl">
                    🎯 General Strategy
                  </h3>
                  <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="mb-2 font-semibold">🔢 Card Counting</h4>
                      <p className="text-sm">
                        Keep track of what cards have been played to make better
                        decisions
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="mb-2 font-semibold">💣 Save Bombs</h4>
                      <p className="text-sm">
                        Hold special combinations for crucial moments
                      </p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="mb-2 font-semibold">👀 Watch Opponents</h4>
                      <p className="text-sm">
                        Note their remaining card counts and playing patterns
                      </p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <h4 className="mb-2 font-semibold">🎵 Control Tempo</h4>
                      <p className="text-sm">
                        Try to start new rounds when possible
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="mb-3 font-semibold text-xl">🎮 Game Phases</h3>
                  <div className="space-y-4">
                    <div className="pl-4 border-green-400 border-l-4">
                      <h4 className="font-semibold text-lg">🌅 Early Game</h4>
                      <ul className="space-y-1 mt-2 text-sm">
                        <li>• Get rid of low cards when possible</li>
                        <li>• Build potential runs and pairs</li>
                        <li>• Observe opponents' playing styles</li>
                      </ul>
                    </div>

                    <div className="pl-4 border-yellow-400 border-l-4">
                      <h4 className="font-semibold text-lg">🌆 Mid Game</h4>
                      <ul className="space-y-1 mt-2 text-sm">
                        <li>• Balance offense and defense</li>
                        <li>• Save powerful combinations for key moments</li>
                        <li>• Pay attention to what others pass on</li>
                      </ul>
                    </div>

                    <div className="pl-4 border-red-400 border-l-4">
                      <h4 className="font-semibold text-lg">🌃 Late Game</h4>
                      <ul className="space-y-1 mt-2 text-sm">
                        <li>• Count exactly what cards are left</li>
                        <li>• Block opponents from winning</li>
                        <li>• Use bombs strategically to secure victory</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 p-4 border border-red-200 rounded-lg">
                  <h4 className="mb-2 font-semibold text-lg">
                    2️⃣ Playing with 2s
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>
                      • Save 2s for end game - they're your most powerful cards
                    </li>
                    <li>
                      • Don't waste 2s in early rounds unless absolutely
                      necessary
                    </li>
                    <li>• Know when to bomb 2s vs. when to let them go</li>
                    <li>• Remember: Four 2s = instant win!</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm p-6">
              <h3 className="mb-4 font-bold text-2xl text-green-800">
                🇻🇳 Cultural Notes
              </h3>
              <div className="space-y-4">
                <p>
                  Tiến lên is more than just a card game in Vietnamese culture:
                </p>
                <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                  <div className="bg-yellow-50 p-3 rounded">
                    <span className="font-semibold">👨‍👩‍👧‍👦 Family Bonding:</span>{" "}
                    Essential part of family gatherings
                  </div>
                  <div className="bg-red-50 p-3 rounded">
                    <span className="font-semibold">🎊 Tet Tradition:</span>{" "}
                    Commonly played during Vietnamese New Year
                  </div>
                  <div className="bg-blue-50 p-3 rounded">
                    <span className="font-semibold">👥 Social Game:</span>{" "}
                    Brings people together across generations
                  </div>
                  <div className="bg-green-50 p-3 rounded">
                    <span className="font-semibold">📚 Teaching Tool:</span>{" "}
                    Used to teach children strategy and math
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Reference Card */}
        <Card className="bg-white/90 backdrop-blur-sm mt-8 p-6">
          <h3 className="mb-4 font-bold text-2xl text-green-800">
            📚 Quick Reference
          </h3>
          <div className="gap-6 grid grid-cols-1 md:grid-cols-3 text-sm">
            <div>
              <h4 className="mb-2 font-semibold">🔢 Card Order</h4>
              <div className="bg-gray-100 p-2 rounded">
                3 - 4 - 5 - 6 - 7 - 8 - 9 - 10 - J - Q - K - A - 2
              </div>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">🏅 Suit Order</h4>
              <div className="bg-gray-100 p-2 rounded">
                ♠️ Spades - ♣️ Clubs - ♦️ Diamonds - ♥️ Hearts
              </div>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">💣 Special Beats</h4>
              <ul className="space-y-1 text-xs">
                <li>• Quad beats solo 2</li>
                <li>• 3-pair run beats solo 2</li>
                <li>• Four 2s = Auto Win 🏆</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Link href="/play">
            <Button variant="winner" size="lg" className="px-8 py-4 text-lg">
              🎮 Start Playing Now
            </Button>
          </Link>
          <Link href="/glossary">
            <Button variant="dealer" size="lg" className="px-8 py-4 text-lg">
              📖 Game Glossary
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
