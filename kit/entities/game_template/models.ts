import { ITempalteCreditType } from "./types/credit";
import { ITemplateJobPosition } from "./types/job";

export const professionsMap: Record<ITemplateJobPosition, string> = {
  softwareDeveloper: "Программист",
  medicalDoctor: "Врач",
  architect: "Архитектор",
  teacher: "Учитель",
  chef: "Шеф-повар",
  electrician: "Электрик",
  accountant: "Бухгалтер",
  graphicDesigner: "Графический дизайнер",
  nurse: "Медсестра",
  mechanicalEngineer: "Инженер-механик",
  lawyer: "Юрист",
  photographer: "Фотограф",
  psychologist: "Психолог",
  plumber: "Сантехник",
  marketingManager: "Менеджер по маркетингу",
  pilot: "Пилот",
  veterinarian: "Ветеринар",
  dataScientist: "Специалист по данным",
  interiorDesigner: "Дизайнер интерьера",
  pharmacist: "Фармацевт",
};

export const creditsMap: Record<ITempalteCreditType, string> = {
  card: "Кредитная карта",
  medicine: "Медицинская страховка",
  mortgage: "Ипотека",
  study: "Кредит на образование",
};
