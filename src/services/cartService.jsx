import Cookies from "js-cookie";
import { tokenService } from "../utils/tokenService";

const API_URL = import.meta.env.VITE_API_URL;
const CART_KEY = "cart";

export const cartService = {
  actualizarProducto: async (productId, reservedStock, action) => {
    try {
      const token = tokenService.getToken();
      const userId = tokenService.getUserIdFromToken(); 

      if (!userId) {
        throw new Error("No se pudo obtener el userId del token.");
      }

      const response = await fetch(
        `${API_URL}/user/cart/product/inventory/hold/${productId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reservedStock, action, userId }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const message =
          errorData?.error ||
          errorData?.message ||
          "Error desconocido al actualizar producto.";

        if (
          message.includes("Reserved stock cannot exceed available stock")
        ) {
          throw new Error("No hay suficiente inventario disponible.");
        }

        if (message.includes("No matching reservation found")) {
          throw new Error("No hay reserva previa para este producto.");
        }

        throw new Error(message);
      }

      return await response.json();
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      throw error;
    }
  },


  saveCart: (cart) => {
      console.log("🛒 Guardando carrito:", cart);
      Cookies.set(CART_KEY, JSON.stringify(cart), {
      expires: 1, // 1 día
       path: "/",
      //sameSite: "strict",
      //encode: (value) => value, // evita doble codificación
    });
  },

  // 🔹 Obtiene el carrito desde cookies
  getCart: () => {
    const raw = Cookies.get(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  },

  // 🔹 Elimina un producto específico del carrito
  removeProduct: (productId) => {
    const cart = cartService.getCart();
    const updatedCart = cart.filter((item) => item.id !== productId);
    cartService.saveCart(updatedCart); // guarda el nuevo carrito
    return updatedCart;
  },

  // 🔹 Limpia el carrito completo
  clearCart: () => {
    Cookies.remove(CART_KEY);
  },
};
