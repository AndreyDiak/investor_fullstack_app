import { CompanyTag, CompanyType } from "./../tag/types";

export interface Company {
  type: CompanyType;
  name: string;
  description: string;
  tags: CompanyTag[];
}
