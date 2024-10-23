import { create } from "zustand";
import { http } from "./http";

export const authStore = create<AuthStore>(() => ({
  async signIn(data) {
    const { data: json } = await http.post("/auth/signin", data);
    localStorage.setItem("access_token", json.accessToken);
  },
  async signUp(data) {
    const { data: json } = await http.post("/auth/signup", data);
    return json;
  },
  async signOut() {
    await http.post("/auth/signout");
    localStorage.removeItem("access_token");
  },
  async me() {
    const res = await http.get("/auth/me");
    console.log({ res });
  },
}));

export interface AuthStore {
  signIn: (data: SignInDto) => Promise<void>;
  signUp: (data: SignUpDto) => Promise<void>;
  signOut: () => Promise<void>;
  me: () => Promise<unknown>;
}

export interface SignInDto {
  username: string;
  password: string;
}

export interface SignUpDto {
  username: string;
  password: string;
  email: string;
}
