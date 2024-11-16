export interface GameTemplate {
  job: TemplateJob;
  difficulty: TemplateDifficulty;
  credits: TemplateCredit[];
  properties: TemplateProperty[];
}

export type TemplateDifficulty = "easy" | "normal" | "hard";

export type JobVariant = "waiter" | "courier" | "storekeeper";
export type PropertyVariant = "jewelery" | "car" | "apartment";

export interface TemplateJob {
  name: string;
  startSalary: number;
  type: JobVariant;
}

export interface TemplateCredit {
  name: string;
  amount: number;
  repaidAmount: number;
  payment: number;
}

export interface TemplateProperty {
  name: string;
  type: PropertyVariant;
  price: number;
}
