import { companyTags, companyType } from "./models";

export type CompanyTag = (typeof companyTags)[number];

export type CompanyType = (typeof companyType)[number];
