import { createStore } from "zustand";
import { Game } from "../entities/game/types";

export const gamesStore = createStore<GamesStore>(() => ({
  fetch: async () => {},
}));

interface GamesStore {
  data?: Game[];
  fetch: () => Promise<void>;
}
