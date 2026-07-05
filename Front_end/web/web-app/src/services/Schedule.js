import { getToken } from "./LocalStorageService";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getSchedules() {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("Token not found. User is not authenticated.");
    }

    const response = await fetch(`${API_BASE_URL}/schedule`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to fetch schedules");
    }

    return await response.json();

  } catch (error) {
    console.error("❌ Error fetching schedules:", error);
    return null;
  }
}

export async function addSchedule(payload) {
  const token = getToken();

  try {
    const response = await fetch(`${API_BASE_URL}/schedule`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(payload),
    });


    const data = await response.json();

    return data;

  } catch (err) {
    console.error("❌ Lỗi fetch/addSchedule:", err);
    throw err;
  }
}
