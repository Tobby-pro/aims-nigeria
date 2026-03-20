// src/api/auth.ts
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export default API; // ✅ THIS MAKES IT REUSABLE

export const registerMember = (email: string, password: string) => {
  return API.post("/members/register", { email, password });
};

export const loginMember = (email: string, password: string) => {
  return API.post("/members/login", { email, password });
};