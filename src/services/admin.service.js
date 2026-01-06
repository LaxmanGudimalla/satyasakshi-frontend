import { apiRequest } from "./api";

export const searchVehicleServiceHistory = (params) =>
  apiRequest(`/search-vehicle?${params}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
 
  
export const getRecoveredVehicle = (params) =>
  apiRequest(`/recovered-vehicle?${params}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
