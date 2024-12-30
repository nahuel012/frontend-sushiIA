import React, { useState, useEffect } from "react";
import { Card, CardBody, CardFooter, Button, Spinner } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import { useProducts } from "../../hooks/useProducts";

export const Menu = () => {
  const { products, loading, error, getProducts } = useProducts();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const uniqueCategories = [
        ...new Set(products.map((product) => product.category.name)),
      ];
      setCategories(uniqueCategories);
      setSelectedCategory(uniqueCategories[0]);
    }
  }, [products]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-danger min-h-[400px] flex items-center justify-center">
        <p>Error al cargar el menú: {error}</p>
      </div>
    );
  }

  return (
    <section id="menu" className="py-20 bg-background">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-center mb-4 uppercase gradient-text">
            Nuestro Menú
          </h2>
          <p className="text-content/70 text-center mb-12 max-w-2xl mx-auto">
            Descubre nuestra exquisita variedad de especialidades japonesas,
            desde rolls artesanales hasta deliciosos platos tradicionales,
            preparados con los mejores ingredientes.
          </p>

          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                className={`${
                  selectedCategory === category
                    ? "bg-primary text-white"
                    : "bg-default-100"
                } uppercase`}
                radius="full"
                size="sm"
                onPress={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-wrap gap-6 justify-center"
          >
            {products
              .filter((product) => product.category.name === selectedCategory)
              .map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardBody className="p-0">
                      {product.image ? (
                        <img
                          src="https://picsum.photos/400/300"
                          alt={product.name}
                          className="w-full h-48 object-cover"
                        />
                      ) : (
                        <div className="w-full h-48 bg-subtle flex items-center justify-center">
                          <span className="text-content/50">Sin imagen</span>
                        </div>
                      )}
                      <div className="p-4">
                        <h4 className="text-lg font-semibold">
                          {product.name}
                        </h4>
                        <p className="text-content/70 text-sm mt-1">
                          {product.description}
                        </p>
                      </div>
                    </CardBody>
                    <CardFooter className="flex justify-end px-4 pb-4">
                      <span className="text-lg font-bold text-primary">
                        ${product.price.toLocaleString()}
                      </span>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
