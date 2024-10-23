import { create } from "zustand";
import { http } from "./http";

export const authStore = create<AuthStore>(() => ({
  async signIn(data) {
    const { data: json } = await http.post("/auth/signin", data);
    console.log({ json });
    if (json.status === 400 || json.status === 404) {
      throw Error(json.message);
    }
    return json;
  },
  async signUp(data) {
    const { data: json } = await http.post("/auth/signup", data);
    if (json.status === 400) {
      throw Error(json.message);
    }
    return json;
  },
}));

export interface AuthStore {
  signIn: (data: SignInDto) => Promise<void>;
  signUp: (data: SignUpDto) => Promise<void>;
}

export interface SignInDto {
  username: string;
  password: string;
}

export interface SignUpDto {
  fullname: string;
  password: string;
  email: string;
}
