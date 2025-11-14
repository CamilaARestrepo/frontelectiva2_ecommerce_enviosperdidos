const API_URL = import.meta.env.VITE_API_URL;

export const inventoryService = {
 
  updateInventory: async (productId, data, token) => {
    try {
      const response = await fetch(`${API_URL}/admin/product/inventory/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al actualizar inventario");
      }

      return await response.json();
    } catch (error) {
      console.error("Error al actualizar inventario:", error);
      throw error;
    }
  },

  // Obtener inventario de un producto
  getInventoryByProductId: async (productId, token) => {
    try {
      const response = await fetch(`${API_URL}/user/product/inventory/${productId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          accept: "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al obtener inventario");
      }

      return await response.json();
    } catch (error) {
      console.error("Error al obtener inventario:", error);
      throw error;
    }
  },
};
