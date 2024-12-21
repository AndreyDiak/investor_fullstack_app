import { create } from "zustand";
import { http } from "../shared/api/http";

const typeToDirName: Record<AssetType, string> = {
  company: "companies",
  template: "templates",
};

export const useAssetsStore = create<AssetStore>(() => ({
  add: async (type, data) => {
    await http.post(`/assets/add`, {
      data,
      type: typeToDirName[type],
    });
  },
}));

export interface AssetStore {
  // data?:
  add: (type: AssetType, data?: unknown) => Promise<void>;
}

export enum AssetType {
  company = "company",
  template = "template",
}
