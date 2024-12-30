export const FooterComponent = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-subtle py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <h4 className="text-xl font-bold">
              <span className="text-primary">Sushi</span>
              <span className="text-secondary">IA</span>
              <span className="ml-2">🍣</span>
            </h4>
            <p className="text-content/70">
              Fusionando la tradición japonesa con la innovación tecnológica
              para brindarte la mejor experiencia.
            </p>
          </div>

          <div>
            <h5 className="font-semibold mb-4">Enlaces Rápidos</h5>
            <ul className="space-y-2">
              <li>
                <a
                  href="#menu"
                  className="text-content/70 hover:text-primary transition-theme"
                >
                  Menú
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-content/70 hover:text-primary transition-theme"
                >
                  Nosotros
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-content/70 hover:text-primary transition-theme"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold mb-4">Horarios</h5>
            <ul className="space-y-2 text-content/70">
              <li>Lunes a Domingo</li>
              <li>11:30 - 23:00</li>
              <li className="font-medium text-primary">Delivery y Pick-up</li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold mb-4">Contacto</h5>
            <ul className="space-y-2 text-content/70">
              <li>📍 Av. Sushi Master 123</li>
              <li>📞 555-SUSHIA</li>
              <li>📧 info@sushiia.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-content/10 pt-8">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <p className="text-content/70 text-sm">
              © {currentYear} SushiIA. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
