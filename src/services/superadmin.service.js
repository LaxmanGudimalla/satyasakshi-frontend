import { apiRequest } from "./api";

<<<<<<< HEAD
=======
<<<<<<<< HEAD:src/services/admin.service.js
export const searchVehicleServiceHistory = (params) =>
  apiRequest(`/search-vehicle?${params}`, {
========
>>>>>>> 6049493a8f7fee8c2d28082ac628613289ecb271
export const createAdmin = (payload) =>
  apiRequest("/admins", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify(payload)
  });


<<<<<<< HEAD
export const getAdmins = () =>
  apiRequest("/admins", {
=======
export const getAdmins = ({ page, limit }) =>
  apiRequest(`/admins?page=${page}&limit=${limit}`, {
>>>>>>>> 6049493a8f7fee8c2d28082ac628613289ecb271:src/services/superadmin.service.js
>>>>>>> 6049493a8f7fee8c2d28082ac628613289ecb271
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
