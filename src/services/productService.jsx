import { tokenService } from "../utils/tokenService";
const API_URL = import.meta.env.VITE_API_URL;
export const createProduct = async (producto) => {
    const token = tokenService.getToken();
  try {
    const response = await fetch(`${API_URL}/admin/product`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(producto),
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.message || "Error al crear producto");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const updateProduct = async (productId, producto) => {
  const token = tokenService.getToken();
  try {
    const response = await fetch(`${API_URL}/admin/product/${productId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(producto),
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.message || "Error al actualizar producto");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const findProducts = async () => {
  const token = tokenService.getToken();
  try {
    const response = await fetch(`${API_URL}/admin/product`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener productos");
    }

    const data = await response.json();
    
    return data; 

  } catch (error) {
    console.error(error);
    throw error;
  }
};