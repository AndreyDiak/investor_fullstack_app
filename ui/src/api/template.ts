import { GameTemplate } from "@kit/entities";
import { create } from "zustand";
import { http } from "../shared/api/http";

export const useTemplateStore = create<TempateStore>((set) => ({
  data: undefined,
  fetch: async () => {
    const { data: games } = await http.get("/templates");
    set({ data: games });
    return games;
  },
}));

export interface TempateStore {
  data?: GameTemplate[];
  fetch: () => Promise<GameTemplate[]>;
}
