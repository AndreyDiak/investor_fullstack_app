import { PlayerCredit } from "../credit/types"
import { Job } from "../job/types"
import { PlayerMood } from "../mood/types"

export interface Game {
  id: string;
  ownerId: string;
  day: number;
  balance: number;
  job: Job;
  mood: PlayerMood;
  credits: PlayerCredit[];
}

export interface GameCreateInput {
  jobId: string;
  creditIds: string[];
  mood: PlayerMood;
  balance: number;
}
