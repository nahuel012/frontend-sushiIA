const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

export const ProductService = {
  getAllProducts: async () => {
    try {
      const response = await fetch(`${API_URL}/products`);

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      return data;
    } catch (error) {
      console.error("error al traer los productos", error);
      throw error;
    }
  },
};
