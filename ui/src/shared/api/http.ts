import axios from "axios";

// const PORT = import.meta.env.VITE_BACKEND_PORT;
// console.log({PORT})
const DEV_PORT = 4444;
const PROD_PORT = 4000;
export const http = axios.create({
  baseURL: `http://localhost:${PROD_PORT}/v1`,
  withCredentials: true,
});

http.interceptors.response.use(
  (res) => {
    if (res.data.status === 404 || res.data.status === 400) {
      throw Error(res.data.message);
    }
    return res;
  },
  (err) => {
    if (err.response) {
      const rawMessage = err?.response?.data?.message;
      const [message] = Array.isArray(rawMessage) ? rawMessage : [rawMessage];
      throw new Error(message);
    } else {
      throw new Error(err.message);
    }
  }
);

http.interceptors.request.use((req) => {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }
  return req;
});
