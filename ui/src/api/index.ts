import { StoreApi } from "zustand";
import { AuthStore, useAuthStore } from "./auth";
import { GameStore, useGameStore } from "./game";
import { JobsStore, useJobsStore } from "./job";
import { TempateStore, useTemplateStore } from "./template";

class Api {
  auth: StoreApi<AuthStore>;
  game: StoreApi<GameStore>;
  jobs: StoreApi<JobsStore>;
  template: StoreApi<TempateStore>;

  constructor() {
    this.auth = useAuthStore;
    this.game = useGameStore;
    this.jobs = useJobsStore;
    this.template = useTemplateStore;
  }
}

export const api = new Api();
