import React from "react";
import { Card } from "@nextui-org/react";
import { motion } from "framer-motion";
import { chef } from "../../assets";

export const About = () => {
  const features = [
    {
      title: "Tradición Japonesa",
      description:
        "Nuestros chefs mantienen viva la esencia y técnicas tradicionales del sushi.",
      icon: "🎌",
    },
    {
      title: "Innovación Digital",
      description:
        "Nigiri, nuestro asistente virtual, hace que ordenar sea una experiencia única y personalizada.",
      icon: "🤖",
    },
    {
      title: "Calidad Premium",
      description:
        "Seleccionamos los ingredientes más frescos para garantizar el mejor sabor.",
      icon: "✨",
    },
    {
      title: "Servicio 24/7",
      description:
        "Nuestro asistente virtual está siempre disponible para atenderte.",
      icon: "⏰",
    },
  ];

  return (
    <section id="about" className="min-h-screen py-20 bg-background">
      <div className="container-custom relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 uppercase">
            <span className="gradient-text">Fusionando</span> la tradición con
            el futuro
          </h2>
          <p className="text-content/70 text-lg">
            En SushiIA, combinamos la auténtica tradición japonesa con la más
            avanzada tecnología para brindarte una experiencia gastronómica
            única.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{feature.icon}</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-content/70">{feature.description}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-6 uppercase">
              <span className="gradient-text">Nuestra</span> Historia
            </h3>
            <p className="text-content/70 mb-4">
              Nacimos con la visión de hacer que el auténtico sushi japonés sea
              accesible para todos, en cualquier momento. Nuestra pasión por la
              gastronomía japonesa nos llevó a buscar formas innovadoras de
              llevar esta experiencia a tu hogar.
            </p>
            <p className="text-content/70">
              Con la incorporación de Nigiri, nuestro asistente virtual,
              revolucionamos la forma de ordenar sushi, haciendo que cada pedido
              sea una experiencia personalizada y sin complicaciones.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative h-[400px] rounded-xl overflow-hidden"
          >
            <div className="flex justify-center items-center">
              <img
                src={chef}
                alt="Nuestro equipo"
                className="relative max-w-full h-[400px] object-cover z-10"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
