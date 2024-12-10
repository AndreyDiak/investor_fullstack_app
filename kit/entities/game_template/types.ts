export interface GameTemplate {
  _id: string;
  job: TemplateJob;
  difficulty: TemplateDifficulty;
  credits: TemplateCredit[];
  properties: TemplateProperty[];
}

export type TemplateDifficulty = "easy" | "normal" | "hard";

export type JobVariant = "waiter" | "courier" | "storekeeper" | "taxi";
export type PropertyVariant = "jewelery" | "car" | "flat";
export type CreditVariant = "card" | "study" | "mortgage" | "casinoDebt";

export interface TemplateJob {
  name: string;
  startSalary: number;
  type: JobVariant;
  savings: number;
  imgUrl: string;
}

export interface TemplateCredit {
  name: string;
  type: CreditVariant;
  amount: number;
  repaidAmount: number;
  payment: number;
  imgUrl: string | undefined;
}

export interface TemplateProperty {
  name: string;
  type: PropertyVariant;
  price: number;
  imgUrl: string | undefined;
}
