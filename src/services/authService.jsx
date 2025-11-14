import { tokenService } from "../utils/tokenService";
export const loginService = async (email, password,remember = false) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  try {
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include"
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al iniciar sesión");
    }
    const data = await response.json(); 
    if (data.token) {
      tokenService.setToken(data.token, remember);
    }
    return data;
  } catch (error) {
    console.error("Error en loginService:", error);
    throw error;
  }
};
