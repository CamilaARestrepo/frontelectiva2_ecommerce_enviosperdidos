export const apiService = async (endpoint, method = "GET", data = null) => {
  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api"; // Ajusta el puerto según tu backend
  const url = `${baseUrl}${endpoint}`;

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Error en la petición al servidor: ${response.status}`);
  }

  return response.json();
};
