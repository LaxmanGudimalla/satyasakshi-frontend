import { apiRequest } from "./api";

export const login = (payload) =>
  apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload)
  });

export const signup = (payload) =>
  apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload)
  });
