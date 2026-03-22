// src/api/auth.ts
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  withCredentials: true,
});

export default API;

export const registerMember = (email: string, password: string) => {
  return API.post("/members/register", { email, password });
};

export const loginMember = (email: string, password: string) => {
  return API.post("/members/login", { email, password });
};