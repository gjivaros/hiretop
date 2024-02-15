import { strVal } from "@paroi/data-formatters-lib";
import axios from "axios";

const LOCAL_STORAGE_KEY = "HIRE_TOP";
export const fetchToken = () => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEY);

  return token;
};

export const setToken = (token: string) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, token);
};

export const delToken = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};

export const http = axios.create({
  baseURL: strVal(import.meta.env.VITE_API_URL),
  headers: {
    Authorization: `Bearer ${fetchToken()}`,
  },
});

http.interceptors.request.use((data) => {
  return {
    ...data,
    headers: { Authorization: `Bearer ${fetchToken()}` },
  } as any;
});
