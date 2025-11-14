
const API_URL = import.meta.env.VITE_API_URL;

export const GetCatalog = async () => {
  try {
    const response = await fetch(`${API_URL}/catalog`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error al obtener productos: ${response.status}`);
    }

    const data = await response.json();
    return data.catalog.catalogs;
  } catch (error) {
    console.error("Error en service productos:", error);
    return [];
  }
};
