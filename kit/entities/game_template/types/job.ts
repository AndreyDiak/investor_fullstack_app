export interface ITemplateJob {
  name: string;
  position: ITemplateJobPosition;
  salary: number;
  savings: number;
  // imgUrl: string;
}

export type ITemplateJobPosition =
  | "softwareDeveloper"
  | "medicalDoctor"
  | "architect"
  | "teacher"
  | "chef"
  | "electrician"
  | "accountant"
  | "graphicDesigner"
  | "nurse"
  | "mechanicalEngineer"
  | "lawyer"
  | "photographer"
  | "psychologist"
  | "plumber"
  | "marketingManager"
  | "pilot"
  | "veterinarian"
  | "dataScientist"
  | "interiorDesigner"
  | "pharmacist";

// ("Software Developer");
// ("Medical Doctor");
// ("Architect");
// ("Teacher");
// ("Chef");
// ("Electrician");
// ("Accountant");
// ("Graphic Designer");
// ("Nurse");
// ("Mechanical Engineer");
// ("Lawyer");
// ("Photographer");
// ("Psychologist");
// ("Plumber");
// ("Marketing Manager");
// ("Pilot");
// ("Veterinarian");
// ("Data Scientist");
// ("Interior Designer");
// ("Pharmacist");
