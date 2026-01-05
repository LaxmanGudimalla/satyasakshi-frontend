const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const apiRequest = async (endpoint, options = {}) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    },
    ...options
  });

  const data = await response.json();

  // 🔴 IMPORTANT: handle backend errors
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};
