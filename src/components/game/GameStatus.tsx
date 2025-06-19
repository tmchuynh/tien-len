"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Player } from "@/lib/interfaces/player";
import { cn } from "@/lib/utils";

interface GameStatusProps {
  players: Player[];
  gamePhase: "waiting" | "playing" | "finished";
  winner?: string;
  onNewGame?: () => void;
  onLeaveGame?: () => void;
  className?: string;
}

export function GameStatus({
  players,
  gamePhase,
  winner,
  onNewGame,
  onLeaveGame,
  className,
}: GameStatusProps) {
  return (
    <div
      className={cn(
        "bg-white border rounded-lg p-4 shadow-sm w-fit m-8",
        className
      )}
    >
      {/* Game phase indicator */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">Game Status</h3>
        <Badge variant={gamePhase === "playing" ? "default" : "secondary"}>
          {gamePhase === "waiting" && "Waiting"}
          {gamePhase === "playing" && "In Progress"}
          {gamePhase === "finished" && "Finished"}
        </Badge>
      </div>

      {/* Winner announcement */}
      {winner && (
        <div className="bg-yellow-50 mb-4 p-3 border border-yellow-200 rounded-lg">
          <div className="text-center">
            <div className="font-bold text-lg text-yellow-800">🏆 Winner!</div>
            <div className="text-yellow-700">{winner} has won the game!</div>
          </div>
        </div>
      )}

      {/* Players list */}
      <div className="space-y-2 mb-4">
        <h4 className="font-medium text-gray-600 text-sm">Players</h4>
        {players.map((player, index) => (
          <div
            key={player.name}
            className={cn(
              "flex items-center justify-between p-2 rounded-lg border",
              player.isActive && "bg-blue-50 border-blue-200",
              player.hasFinished && "bg-green-50 border-green-200",
              !player.isActive &&
                !player.hasFinished &&
                "bg-gray-50 border-gray-200"
            )}
          >
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "w-2 h-2 rounded-full",
                  player.isActive && "bg-blue-500",
                  player.hasFinished && "bg-green-500",
                  !player.isActive && !player.hasFinished && "bg-gray-400"
                )}
              />
              <span
                className={cn(
                  "font-medium text-sm",
                  player.hasFinished && "line-through text-gray-500"
                )}
              >
                {player.name}
              </span>
              {player.hasFinished && (
                <Badge variant="outline" className="text-xs">
                  Finished
                </Badge>
              )}
            </div>
            <span className="text-gray-600 text-sm">
              {player.cardCount} cards
            </span>
          </div>
        ))}
      </div>

      {/* Game actions */}
      {gamePhase === "finished" && (
        <div className="flex gap-2">
          {onNewGame && (
            <Button size="sm" onClick={onNewGame} className="flex-1">
              New Game
            </Button>
          )}
          {onLeaveGame && (
            <Button
              size="sm"
              variant="outline"
              onClick={onLeaveGame}
              className="flex-1"
            >
              Leave Game
            </Button>
          )}
        </div>
      )}

      {gamePhase === "waiting" && (
        <div className="text-center text-gray-500 text-sm">
          Waiting for all players to join...
        </div>
      )}
    </div>
  );
}
