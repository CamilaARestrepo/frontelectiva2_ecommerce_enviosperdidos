const API_URL = import.meta.env.VITE_API_URL;
import { tokenService } from "../utils/tokenService";

export const findSuppliers = async () => {
  const token = tokenService.getToken();
  try {
    const response = await fetch(`${API_URL}/admin/product//provider`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener proveedores");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createSupplier = async (nombre) => {
  const token = tokenService.getToken();
  try {
    const response = await fetch(`${API_URL}/admin/product/provider`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: nombre }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.message || "Error al crear proveedor");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
