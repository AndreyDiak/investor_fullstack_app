import { ITemplateCredit } from "./types/credit";
import { ITemplateJob } from "./types/job";

export interface IGameTemplate {
  job: ITemplateJob;
  difficulty: ITemplateDifficulty;
  credits: ITemplateCredit[];
}

export type ITemplateDifficulty = "easy" | "normal" | "hard";
