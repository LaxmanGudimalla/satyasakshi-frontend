import { apiRequest } from "./api";

export const addRecoveredVehicle = (payload) => {
  return apiRequest("/recovered-vehicle", {
    method: "POST",
    body: JSON.stringify(payload)
  });
};
