import { getToken } from "./LocalStorageService";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Lấy toàn bộ danh sách điểm dừng (JSON thuần)
 */
export async function getBusStops() {
  const token = getToken();
  if (!token) throw new Error("Token not found. User is not authenticated.");

  const response = await fetch(`${API_BASE_URL}/bus-stop`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to fetch bus stops");
  }

  return await response.json(); // JSON thuần
}

export async function addBusStop(busStop) {
  const token = getToken();
  if (!token) throw new Error("Token not found. User is not authenticated.");

  const response = await fetch(`${API_BASE_URL}/bus-stop`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(busStop),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to add bus stop");
  }

  return await response.json();
}


export async function deleteBusStop(id) {
  const token = getToken();
  if (!token) throw new Error("Token not found. User is not authenticated.");

  const response = await fetch(`${API_BASE_URL}/bus-stop/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to delete bus stop");
  }

  return true;
}