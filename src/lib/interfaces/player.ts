import { LocalCard } from "./cards";

export interface Player {
  id: string;
  name: string;
  cardCount: number;
  isActive: boolean;
  hasFinished: boolean;
  cards?: LocalCard[]; // Only for current player
}
