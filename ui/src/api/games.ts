import { create } from "zustand";
import { Game } from "../entities/game/types";
import { http } from "../shared/api/http";

export const useGameStore = create<GamesStore>((set) => ({
  fetch: async () => {
    const { data: games } = await http.get("/games");
    set({ data: games });
  },
}));

export interface GamesStore {
  data?: Game[];
  fetch: () => Promise<void>;
}
