import { tokenService } from "../utils/tokenService";

const API_URL = import.meta.env.VITE_API_URL;

export const orderService = {
  createPreorder: async (userId, orderData) => {
    const token = tokenService.getToken();
    const response = await fetch(`${API_URL}/user/${userId}/preorder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error("Error al crear la preorden", errorText);
    }
    const data = await response.json();
    if (!data || !data.order._id)
      throw new Error("Respuesta inválida del servidor");
    return data.order;
  },

  getUserOrders: async (userId) => {
    const token = tokenService.getToken();
    const response = await fetch(`${API_URL}/orders/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Error al obtener órdenes del usuario");
    return response.json();
  },

  confirmPreorder: async (userId, orderId, email) => {
    const token = tokenService.getToken();
    const response = await fetch(
      `${API_URL}/user/${userId}/preorder/${orderId}/confirm`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ emailNotification: email }),
      }
    );
  
    if (!response.ok) throw new Error("Error al confirmar la orden");
    return response.json();
  },
};
