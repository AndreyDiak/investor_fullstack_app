import { PlayerCredit } from "../credit/types";
import { PlayerJob } from "../job/types";
import { PlayerMood } from "../mood/types";

export interface Game {
  id: string;
  ownerId: string;
  day: number;
  balance: number;
  job: PlayerJob;
  mood: PlayerMood;
  credits: PlayerCredit[];
  statistics: unknown;
}
