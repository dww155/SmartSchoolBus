import { getToken } from "./LocalStorageService";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export async function getBuses() {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("Token not found. User is not authenticated.");
    }

    const response = await fetch(`${API_BASE_URL}/bus`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to get all buses");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching all buses:", error);
    return null;
  }
}

export async function addBus(bus) {
  const token = getToken();
  if (!token) {
    throw new Error("Token not found. User is not authenticated.");
  }

  const response = await fetch(
    `${API_BASE_URL}/bus`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(bus),
    } 
  )

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to add bus");
  }

  const data = await response.json();
  return data;
}