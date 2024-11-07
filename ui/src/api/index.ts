import { StoreApi } from "zustand"
import { AuthStore, useAuthStore } from "./auth"
import { GamesStore, useGamesStore } from "./games"
import { JobsStore, useJobsStore } from "./job"

class Api {
  auth: StoreApi<AuthStore>;
  games: StoreApi<GamesStore>;
  jobs: StoreApi<JobsStore>;

  constructor() {
    this.auth = useAuthStore;
    this.games = useGamesStore;
    this.jobs = useJobsStore;
  }
}

export const api = new Api();
