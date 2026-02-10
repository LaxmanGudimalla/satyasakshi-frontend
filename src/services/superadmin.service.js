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


 /* =====================================
   VEHICLE VERIFICATION APIs
===================================== */

// Pending Lists
export const getPendingRecovered = () =>
  apiRequest("/super-admin/pending-recovered", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("SUPER_ADMIN_token")}`
    }
  });

export const getPendingStolen = () =>
  apiRequest("/super-admin/pending-stolen", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("SUPER_ADMIN_token")}`
    }
  });


// Approve
export const approveRecovered = (id) =>
  apiRequest(`/super-admin/approve-recovered/${id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("SUPER_ADMIN_token")}`
    }
  });

export const approveStolen = (id) =>
  apiRequest(`/super-admin/approve-stolen/${id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("SUPER_ADMIN_token")}`
    }
  });


// Reject
export const rejectRecovered = (id) =>
  apiRequest(`/super-admin/reject-recovered/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("SUPER_ADMIN_token")}`
    }
  });

export const rejectStolen = (id) =>
  apiRequest(`/super-admin/reject-stolen/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("SUPER_ADMIN_token")}`
    }
  });
