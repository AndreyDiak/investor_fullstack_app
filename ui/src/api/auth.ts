import { create } from "zustand";
import { http } from "./http";

export const authStore = create<AuthStore>(() => ({
  async signIn(data) {
    const { data: json } = await http.post("/auth/signin", data);
    if (json.status === 400) {
      throw Error(json.message);
    }
    return json;
  },
  async signUp(data) {
    const { data: json } = await http.post("/auth/signup", data);
    console.log({ json });
  },
}));

export interface AuthStore {
  signIn: (data: { username: string; password: string }) => Promise<void>;
  signUp: (data: {
    fullname: string;
    password: string;
    email: string;
  }) => Promise<void>;
}
