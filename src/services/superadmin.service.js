import { apiRequest } from "./api";

export const createAdmin = (payload) =>
  apiRequest("/admins", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify(payload)
  });


export const getAdmins = () =>
  apiRequest("/admins", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
