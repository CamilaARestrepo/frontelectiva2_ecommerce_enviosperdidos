export const locationService = {
  getCountries: () => [
    { code: "COL", name: "Colombia" },
    { code: "BRA", name: "Brasil" },
  ],

  getStates: (countryCode) => {
    if (countryCode === "COL") {
      return [
        { code: "ANT", name: "Antioquia" },
        { code: "CUN", name: "Cundinamarca" },
        { code: "VAL", name: "Valle del Cauca" },
        { code: "ATL", name: "Atlántico" },
        { code: "SUC", name: "Sucre" },
      ];
    }
    if (countryCode === "BRA") {
      return [
        { code: "SP", name: "São Paulo" },
        { code: "RJ", name: "Rio de Janeiro" },
      ];
    }
    return [];
  },

  getCities: (stateCode) => {
    const cities = {
      ANT: ["Medellín", "Bello", "Envigado", "Itagüí", "Rionegro"],
      CUN: ["Bogotá", "Soacha", "Chía", "Zipaquirá", "Facatativá"],
      VAL: ["Cali", "Palmira", "Buenaventura", "Tuluá", "Jamundí"],
      ATL: ["Barranquilla", "Soledad", "Malambo", "Galapa", "Sabanalarga"],
      SUC: ["Sincelejo", "Córdoba", "Tolú", "Sampués", "San Onofre"],
      SP: ["São Paulo", "Campinas", "Santos", "Guarulhos", "São Bernardo"],
      RJ: ["Rio de Janeiro", "Niterói", "Petropolis", "Duque de Caxias", "Nova Iguaçu"],
    };
    return cities[stateCode] || [];
  },
};
