import { validateRegister } from "../../src/utils/registerValidation";
export const registerService = async (formData) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const validationErrors = validateRegister(formData);
  if (Object.keys(validationErrors).length > 0) {
    throw { validationErrors };
  }
  const payload = {
    ...formData,
    status: formData.status || "ACTIVE",
  };
  try {
    const response = await fetch(`${apiUrl}/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al registrar usuario");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en registerService:", error);
    throw error;
  }
};
