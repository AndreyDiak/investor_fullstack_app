export interface ITemplateCredit {
  name: string;
  type: ITempalteCreditType;
  total: number;
  payment: number;
  repaidAmount: number;
}

export type ITempalteCreditType =
  // кредитная карточка
  | "card"
  // обучение
  | "study"
  // ипотека
  | "mortgage"
  // кредит на медицину
  | "medicine";
