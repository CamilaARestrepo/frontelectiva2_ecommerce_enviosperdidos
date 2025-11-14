import { tokenService } from "../utils/tokenService";
const API_URL = import.meta.env.VITE_API_URL;

export const findCategory = async () => {
  const token = tokenService.getToken();
  try {
    const response = await fetch(`${API_URL}/admin/product/categories`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener categorias");
    }

    const data = await response.json();
 
    return data; 
    
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createCategory = async (nombre) => {
  const token = tokenService.getToken();
  try {
    const response = await fetch(`${API_URL}/admin/product/categories`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: nombre }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.message || "Error al crear categoria");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
