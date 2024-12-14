import { CompanyTag } from "./../tag/types";

export interface Company {
  type: string;
  name: string;
  description: string;
  tags: CompanyTag[];
}
