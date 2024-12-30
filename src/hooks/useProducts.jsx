import { useState } from "react";
import { ProductService } from "../services/products/products.service";

export const useProducts = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await ProductService.getAllProducts();

      setProducts(response.data);

      return;
    } catch (error) {
      setError(error.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    getProducts,
    loading,
    error,
    products,
  };
};
