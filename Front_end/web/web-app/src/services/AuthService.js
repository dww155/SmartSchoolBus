import { setToken, getToken } from "./LocalStorageService";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function login(username, password) {
    const response = await fetch(
      `${API_BASE_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            userName: username.trim(),
            password: password.trim()
          }
        ),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Login failed");
    }

    const { data } = await response.json();
    if (data?.result) {
      return data.result;
    }

    return false;
}

export async function introspect(tokenString) {
  const response = await fetch(
    `${API_BASE_URL}/auth/introspect`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        {
          token: tokenString  
        }
      ),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Introspection failed");
  }

  const data = await response.json();

  return data.data.valid;
}