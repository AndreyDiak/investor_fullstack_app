import { GameTemplate } from "./types";

export const gameTemplates: GameTemplate[] = [
  {
    job: {
      name: "Waiter",
      startSalary: 45_500,
      type: "waiter",
    },
    difficulty: "hard",
    credits: [
      {
        name: "Учеба",
        amount: 250_000,
        payment: 15_000,
        repaidAmount: 0,
      },
      {
        name: "Кредитная карта",
        amount: 100_000,
        payment: 10_500,
        repaidAmount: 0,
      },
    ],
    properties: [
      {
        name: "Бабушкино фамильное кольцо",
        price: 75_000,
        type: "jewelery",
      },
    ],
  },
  {
    job: {
      name: "Курьер",
      startSalary: 60_000,
      type: "courier",
    },
    difficulty: "normal",
    credits: [
      {
        name: "Кредитная карта",
        amount: 150_000,
        payment: 25_000,
        repaidAmount: 0,
      },
    ],
    properties: [],
  },
  {
    job: {
      name: "Кладовщик",
      startSalary: 80_000,
      type: "storekeeper",
    },
    difficulty: "easy",
    credits: [
      {
        name: "Интернет курс",
        amount: 200_000,
        payment: 35_000,
        repaidAmount: 0,
      },
    ],
    properties: [
      {
        name: "Старая машина",
        type: "car",
        price: 350_000,
      },
    ],
  },
];
