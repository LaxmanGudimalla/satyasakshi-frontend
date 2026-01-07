import { apiRequest } from "./api";

export const createAdmin = (payload) =>
  apiRequest("/admins", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("SUPER_ADMIN_token")}`
    },
    body: JSON.stringify(payload)
  });


export const getAdmins = ({ page, limit }) =>
  apiRequest(`/admins?page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("SUPER_ADMIN_token")}`
    }
  });