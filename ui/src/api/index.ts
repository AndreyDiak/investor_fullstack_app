import { StoreApi } from "zustand";
import { AuthStore, useAuthStore } from "./auth";

class Api {
  auth: StoreApi<AuthStore>;

  constructor() {
    this.auth = useAuthStore;
  }
}

export const api = new Api();
