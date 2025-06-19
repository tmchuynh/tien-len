import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="bg-gradient-to-br min-h-screen table-felt">
      {/* Hero Section */}
      <main className="mx-auto px-4 py-16 container">
        <div className="mb-16 text-center">
          <h1 className="drop-shadow-2xl mb-4 font-bold font-serif text-6xl text-white">
            🂡 Tiến Lên 🂮
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-green-100 text-xl">
            The classic Vietnamese card game. Challenge your friends in this
            strategic climbing game where the goal is to be the first to play
            all your cards!
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button variant="winner" size="lg" className="px-8 py-4 text-lg">
              🎮 Start New Game
            </Button>
            <Button variant="dealer" size="lg" className="px-8 py-4 text-lg">
              📖 Learn Rules
            </Button>
            <Button variant="card" size="lg" className="px-8 py-4 text-lg">
              👥 Join Game
            </Button>
          </div>
        </div>

        {/* Sample Cards Display */}
        <div className="mb-16">
          <h2 className="mb-8 font-bold text-3xl text-center text-white">
            Experience Premium Card Graphics
          </h2>

          {/* Bridge Size Cards */}
          <div className="mb-8">
            <Badge variant="dealer" className="mb-4 px-4 py-2 text-lg">
              Bridge Size Cards
            </Badge>
            <div className="flex flex-wrap justify-center gap-4">
              <Card
                variant="card-red"
                size="bridge-size"
                suit="hearts"
                value="A"
              />
              <Card
                variant="card-black"
                size="bridge-size"
                suit="spades"
                value="K"
              />
              <Card
                variant="card-red"
                size="bridge-size"
                suit="diamonds"
                value="Q"
              />
              <Card
                variant="card-black"
                size="bridge-size"
                suit="clubs"
                value="J"
              />
              <Card variant="card-back" size="bridge-size" />
            </div>
          </div>

          {/* Poker Size Cards */}
          <div className="mb-8">
            <Badge variant="poker-chip" className="mb-4 px-4 py-2 text-lg">
              Poker Size Cards
            </Badge>
            <div className="flex flex-wrap justify-center gap-4">
              <Card
                variant="card-red"
                size="poker-size"
                suit="hearts"
                value="10"
              />
              <Card
                variant="card-black"
                size="poker-size"
                suit="spades"
                value="9"
              />
              <Card
                variant="card-red"
                size="poker-size"
                suit="diamonds"
                value="8"
              />
              <Card
                variant="card-black"
                size="poker-size"
                suit="clubs"
                value="7"
              />
              <Card
                variant="card-selected"
                size="poker-size"
                suit="hearts"
                value="3"
              />
            </div>
          </div>
        </div>

        {/* Game Features */}
        <div className="gap-8 grid md:grid-cols-3 mb-16">
          <div className="bg-white/10 backdrop-blur-sm p-6 border border-white/20 rounded-xl">
            <div className="mb-4 text-4xl">🎯</div>
            <h3 className="mb-2 font-bold text-white text-xl">
              Strategic Gameplay
            </h3>
            <p className="text-green-100">
              Master the art of card combinations and timing. Plan your moves
              carefully to outsmart your opponents.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-6 border border-white/20 rounded-xl">
            <div className="mb-4 text-4xl">👥</div>
            <h3 className="mb-2 font-bold text-white text-xl">
              Multiplayer Fun
            </h3>
            <p className="text-green-100">
              Play with 2-4 players online or locally. Challenge friends or meet
              new opponents from around the world.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-6 border border-white/20 rounded-xl">
            <div className="mb-4 text-4xl">🏆</div>
            <h3 className="mb-2 font-bold text-white text-xl">
              Tournament Mode
            </h3>
            <p className="text-green-100">
              Compete in ranked matches and tournaments. Climb the leaderboards
              and earn exclusive rewards.
            </p>
          </div>
        </div>

        {/* Game Statistics */}
        <div className="text-center">
          <h2 className="mb-8 font-bold text-3xl text-white">
            Game Statistics
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            <Badge variant="chip-red" className="px-6 py-3 text-lg">
              🎮 1,247+ Games Played
            </Badge>
            <Badge variant="chip-blue" className="px-6 py-3 text-lg">
              👥 328+ Active Players
            </Badge>
            <Badge variant="chip-green" className="px-6 py-3 text-lg">
              🏆 89+ Tournaments
            </Badge>
            <Badge variant="winner" className="px-6 py-3 text-lg">
              ⭐ 4.8/5 Rating
            </Badge>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-sm py-8 border-white/20 border-t">
        <div className="mx-auto px-4 text-center container">
          <p className="mb-4 text-green-100">
            Experience the most authentic Vietnamese card game online
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button variant="outline" size="sm">
              🎲 Other Games
            </Button>
            <Button variant="outline" size="sm">
              📱 Mobile App
            </Button>
            <Button variant="outline" size="sm">
              💬 Support
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
