import { create } from "zustand";
import { http } from "../shared/api/http";

export const useAuthStore = create<AuthStore>((set) => ({
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
    const { data } = await http.get("/auth/me");
    const user = {
      id: data.sub,
      username: data.username,
    };

    set({ data: user });

    return user;
  },
}));

export interface AuthStore {
  data?: AuthData;
  signIn: (data: SignInDto) => Promise<void>;
  signUp: (data: SignUpDto) => Promise<void>;
  signOut: () => Promise<void>;
  me: () => Promise<AuthData>;
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

export interface AuthData {
  id: string;
  username: string;
}
