import { tokenService } from "../utils/tokenService";
const API_URL = import.meta.env.VITE_API_URL;

export const getUserProfile = async (userId) => {
  const token = tokenService.getToken();

  try {
    const response = await fetch(`${API_URL}/user/profile/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.message || "Error al obtener perfil del usuario");
    }

    const data = await response.json();

    return data.user;
  } catch (error) {
    console.error("Error al obtener perfil:", error);
    throw error;
  }
};

export const updateUserProfile = async (userId, data) => {
  const token = tokenService.getToken();
  const response = await fetch(`${API_URL}/user/profile/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Error al actualizar perfil");
  }

  return response.json();
};
