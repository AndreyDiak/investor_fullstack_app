import { StoreApi } from "zustand";
import { AuthStore, useAuthStore } from "./auth";
import { GamesStore, useGamesStore } from "./games";

class Api {
  auth: StoreApi<AuthStore>;
  games: StoreApi<GamesStore>;

  constructor() {
    this.auth = useAuthStore;
    this.games = useGamesStore;
  }
}

export const api = new Api();
