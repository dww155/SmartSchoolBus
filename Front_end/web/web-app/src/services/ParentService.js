import { getToken } from "./LocalStorageService";

const API_URL = import.meta.env.VITE_API_BASE_URL;;
export async function getParents() {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("Token not found. User is not authenticated.");
    }

    const response = await fetch(`${API_URL}/parent`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // gửi token trong header
      },
    });

    if (!response.ok) {
      // Nếu token hết hạn hoặc lỗi
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to fetch user info");
    }

    const data = await response.json();
    return data; // trả về thông tin người dùng

  } catch (error) {
    console.error("Error fetching current user:", error);
    return null; // trả về null nếu có lỗi
  }
}

export async function addParent(parentData) {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("Token not found. User is not authenticated.");
    }

    const response = await fetch(`${API_URL}/parent/createUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // gửi token trong header
      },
      body: JSON.stringify(parentData) // gửi dữ liệu parent
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to create parent");
    }

    const data = await response.json();
    return data; // trả về parent vừa tạo

  } catch (error) {
    console.error("Error creating parent:", error);
    return null;
  }
}

export async function getMyInfo() {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("Token not found. User is not authenticated.");
    }

    const response = await fetch(`${API_URL}/parent/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // gửi token trong header
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to create parent");
    }

    const data = await response.json();
    return data.data; // trả về parent vừa tạo
  } catch (error) {
    console.error("Error creating parent:", error);
    return null;
  }
}

export async function registerStudentSchedule(studentId, scheduleData) {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("Token not found. User is not authenticated.");
    }

    const response = await fetch(`${API_URL}/student/schedule/${studentId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(scheduleData)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to register schedule");
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error registering student schedule:", error);
    return null;
  }
}
