import { tokenService } from "./tokenService";
import { jwtDecode } from "jwt-decode"; // asegúrate de importar con llaves

export const getUserFromToken = () => {
  const token = tokenService.getToken();
  if (!token) return null;

  try {
    // Decodifica el JWT y devuelve el payload
    const decoded = jwtDecode(token);

    // Si el token expiró, lo eliminamos y retornamos null
    const now = Date.now() / 1000;
    if (decoded.exp && decoded.exp < now) {
      console.warn("Token expirado, eliminando cookie...");
      tokenService.removeToken();
      return null;
    }

    return decoded; // contiene { id, email, firstName, lastName, roleId, iat, exp }
  } catch (err) {
    console.error("Error al decodificar token:", err);
    return null;
  }
};
