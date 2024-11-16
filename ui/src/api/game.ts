import { create } from "zustand";
import { Game, GameCreateInput } from "../entities/game/types";
import { http } from "../shared/api/http";

export const useGameStore = create<GameStore>((set) => ({
  data: undefined,
  fetch: async (gameId) => {
    const { data: game } = await http.get(`/games/${gameId}`);
    set({ data: game });
  },
  fetchMy: async () => {
    const { data } = await http.get<Game[]>("/games/my");
    return data;
  },
  create: async (input) => {
    const { data } = await http.post<Game>(`/games/create`, input);
    return data.id;
  },
  delete: async (gameId) => {
    await http.delete(`/games/${gameId}/delete`);
  },
}));

export interface GameStore {
  data?: Game;
  fetch: (gameId: string) => Promise<void>;
  fetchMy: () => Promise<Game[]>;
  create: (props: GameCreateInput) => Promise<string>;
  delete: (gameId: string) => Promise<void>;
}
