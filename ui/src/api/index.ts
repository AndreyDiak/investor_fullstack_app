import { StoreApi } from "zustand";
import { AuthStore, useAuthStore } from "./auth";
import { GamesStore, useGameStore } from "./games";

class Api {
  auth: StoreApi<AuthStore>;
  games: StoreApi<GamesStore>;

  constructor() {
    this.auth = useAuthStore;
    this.games = useGameStore;
  }
}

export const api = new Api();
