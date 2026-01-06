import { apiRequest } from "./api";

export const searchVehicleServiceHistory = (params) =>
  apiRequest(`/search-vehicle?${params}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });

export const searchReRegistration = ({ registrationNumber, chassisNumber, engineNumber }) => {
  const params = new URLSearchParams();

  if (registrationNumber) params.append("registrationNumber", registrationNumber);
  if (chassisNumber) params.append("chassisNumber", chassisNumber);
  if (engineNumber) params.append("engineNumber", engineNumber);

  return apiRequest(`/driving-licence?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
};

export const getRecoveredVehicle = (params) =>
  apiRequest(`/recovered-vehicle?${params}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
