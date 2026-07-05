import { getToken } from "./LocalStorageService";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; ;
export async function getRoutes() {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("Token not found. User is not authenticated.");
    }

    const response = await fetch(`${API_BASE_URL}/route`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      },
    });

    if (!response.ok) {
      // Nếu token hết hạn hoặc lỗi
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to get all routes");
    }

    const data = await response.json();
    return data; 

  } catch (error) {
    console.error("Error fetching current user:", error);
    return null; // trả về null nếu có lỗi
  }
}

export async function addRoute(payload) {
  const token = getToken();
  console.log("📦 Thêm tuyến với payload:", payload);

  try {
    const res = await fetch(`${API_BASE_URL}/route`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(payload),
    });

    console.log("📦 Phản hồi từ server:", res);

    const data = await res.json();
    console.log("📦 Dữ liệu JSON từ server:", data);
    return data;

  } catch (err) {
    console.error("❌ Lỗi fetch/addRoute:", err);
    throw err;
  }
}
