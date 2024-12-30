import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import { sushi } from "../../assets";

export const Hero = () => {
  return (
    <div id="home" className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20" />

      <div className="container-custom relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-16 md:py-24">
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="gradient-text">Descubre</span> la fusión perfecta
              entre el
              <span className="gradient-text">
                {" "}
                Sushi y la Inteligencia Artificial
              </span>
            </motion.h1>
            <motion.p
              className="text-content/80 mb-8 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Experimenta una nueva forma de ordenar sushi. Nuestro asistente
              virtual Nigiri te guiará en una experiencia única y personalizada.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Button
                size="lg"
                className="bg-primary text-white font-semibold"
                radius="full"
              >
                Ordenar Ahora 🍣
              </Button>
              <Button
                size="lg"
                variant="bordered"
                className="border-primary text-primary font-semibold hover:bg-primary/10"
                radius="full"
                href="#menu"
                as="a"
              >
                Ver Menú
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative h-[300px] md:h-[400px] lg:h-[500px] order-first lg:order-last flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-accent/20 dark:bg-accent/10 blur-3xl"
              animate={{
                scale: [1, 1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.img
              src={sushi}
              alt="Selección de sushi premium"
              className="relative max-w-full h-auto object-contain z-10 drop-shadow-2xl"
              animate={{
                y: [-10, 10, -10],
                rotate: [0, 0, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-t border-content/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {[
            {
              title: "Delivery Rápido",
              description: "30-45 minutos a tu puerta",
            },
            {
              title: "Atención 24/7",
              description: "Nigiri siempre disponible",
            },
            {
              title: "Calidad Premium",
              description: "Ingredientes frescos y seleccionados",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
            >
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-content/70">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
