import { getToken } from "./LocalStorageService";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;;
export async function getDrivers() {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("Token not found. User is not authenticated.");
    }

    const response = await fetch(`${API_BASE_URL}/driver`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });

    if (!response.ok) {
      // Nếu token hết hạn hoặc lỗi
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to get all driver");
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error fetching current user:", error);
    return null; // trả về null nếu có lỗi
  }
}

export async function addDriver(driverData) {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("Token not found. User is not authenticated.");
    }

    const response = await fetch(`${API_BASE_URL}/driver/createUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(driverData),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || "Failed to create driver");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating driver:", error);
    throw error; // để context xử lý lỗi
  }
}

export async function getMyInfo() {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("Token not found. User is not authenticated.");
    }

    const response = await fetch(`${API_BASE_URL}/driver/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || "Failed to get driver");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error creating driver:", error);
    throw error; // để context xử lý lỗi
  }
}