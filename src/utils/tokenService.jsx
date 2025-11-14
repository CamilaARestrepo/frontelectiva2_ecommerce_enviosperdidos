import Cookies from "js-cookie";

const TOKEN_KEY = "token";

export const tokenService = {
  // Guarda el token en cookies
  setToken: (token, remember = false) => {
    Cookies.set(TOKEN_KEY, token, {
      expires: remember ? 7 : 1, // 7 días si marcó "Recordarme", 1 día si no
      secure: false, // cambia a true si usas HTTPS
      sameSite: "strict",
    });
  },

  // Obtiene el token de cookies
  getToken: () => {
    return Cookies.get(TOKEN_KEY);
  },

  // Elimina el token (logout)
  removeToken: () => {
    Cookies.remove(TOKEN_KEY);
  },

  // Verifica si hay sesión activa
  isAuthenticated: () => {
    return !!Cookies.get(TOKEN_KEY);
  },
   getUserIdFromToken: () => {
    const token = Cookies.get(TOKEN_KEY);
    if (!token) return null;

    try {
      const payloadBase64 = token.split(".")[1];
      const payload = JSON.parse(atob(payloadBase64));
      console.log("🧩 Payload del token:", payload);
      return payload.id || payload.userId || payload.sub; // depende del backend
    } catch (error) {
      console.error("❌ Error decodificando token:", error);
      return null;
    }
  },
};
