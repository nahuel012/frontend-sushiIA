import React, { useState } from "react";
import { Card, Input, Textarea, Button } from "@nextui-org/react";
import { motion } from "framer-motion";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // No Se comunica con el backend, es solo de ejemplo
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 uppercase">
            <span className="gradient-text">Contáctanos</span>
          </h2>
          <p className="text-content/70 text-lg">
            ¿Tienes alguna pregunta o sugerencia? No dudes en contactarnos.
            Estamos aquí para ayudarte.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">
                Información de Contacto
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="font-medium">Dirección</p>
                    <p className="text-content/70">Av. Sushi Master 123</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📞</span>
                  <div>
                    <p className="font-medium">Teléfono</p>
                    <p className="text-content/70">555-SUSHIA</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⏰</span>
                  <div>
                    <p className="font-medium">Horario</p>
                    <p className="text-content/70">
                      11:30 - 23:00, todos los días
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Área de Delivery</h3>
              <p className="text-content/70 mb-4">
                Realizamos entregas en un radio de 5 km desde nuestro local.
                Tiempo estimado de entrega: 30-45 minutos.
              </p>
              <div className="w-full h-48 bg-subtle rounded-lg flex items-center justify-center">
                <span className="text-content/50">Mapa</span>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="h-full"
          >
            <Card className="p-6 h-full flex flex-col justify-center">
              <h3 className="text-xl font-semibold mb-6">
                Envíanos un mensaje
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  type="text"
                  label="Nombre"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  variant="bordered"
                  isRequired
                />
                <Input
                  type="email"
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  variant="bordered"
                  isRequired
                />
                <Textarea
                  label="Mensaje"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  variant="bordered"
                  minRows={4}
                  isRequired
                />
                <Button
                  type="submit"
                  className="w-full bg-primary text-white font-semibold"
                  size="lg"
                >
                  Enviar Mensaje
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
