import { StoreApi } from "zustand";
import { AuthStore, authStore } from "./auth";

class Api {
  auth: StoreApi<AuthStore>;

  constructor() {
    this.auth = authStore;
  }
}

export const api = new Api();
