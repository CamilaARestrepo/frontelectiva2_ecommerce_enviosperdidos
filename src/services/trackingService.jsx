import { tokenService } from "../utils/tokenService";

const API_URL = import.meta.env.VITE_API_URL;

export const trackingService = {
  // Crear tracking
  createTracking: async (data) => {
    const token = tokenService.getToken();
    console.log("📦 TRACKING PAYLOAD ENVIADO:", data);

    const response = await fetch(`${API_URL}/tracking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    console.log("🔍 TRACKING RESPONSE OBJ:", response);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error al crear el tracking:", errorText);
      throw new Error("Error al crear el tracking");
    }

    return response.json();
  },

  // Obtener tracking por número de orden
  getTracking: async (orderNumber) => {
    const token = tokenService.getToken();
    const response = await fetch(`${API_URL}/tracking/${orderNumber}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error al obtener tracking: ${JSON.stringify(errorData)}`);
    }

    return response.json();
  },

  // Actualizar estado del tracking
  updateTrackingStatus: async (data) => {
    // data = { orderNumber, status, location, details, userId }
    const token = tokenService.getToken();

    const response = await fetch(`${API_URL}/tracking/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error al actualizar tracking:", errorText);
      throw new Error("Error al actualizar tracking");
    }

    return response.json();
  },
};
