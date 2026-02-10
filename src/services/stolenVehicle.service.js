import { apiRequest } from "./api";

export const addCustomerStolenVehicle = (payload) => {
  return apiRequest("/customer-stolen-vehicle", {
    method: "POST",
    body: JSON.stringify(payload)
  });
};
