# SushiIA - Restaurante de Sushi con Asistente Virtual 🍣

## Descripción

SushiIA es una aplicación web moderna para un restaurante de sushi que combina la tradición culinaria japonesa con tecnología de vanguardia. La aplicación cuenta con un asistente virtual llamado Nigiri que facilita el proceso de pedidos y brinda atención personalizada 24/7.

## Características Principales 🌟

- **Diseño Responsive**: Interfaz adaptable a todos los dispositivos
- **Tema Claro/Oscuro**: Sistema de temas implementado con Tailwind CSS
- **Chat en Tiempo Real**: Asistente virtual Nigiri con WebSocket
- **Animaciones Fluidas**: Implementadas con Framer Motion
- **Gestión de Estado**: Manejo eficiente con React Hooks
- **Componentes UI**: Utiliza NextUI para una interfaz moderna
- **API REST**: Comunicación con backend para productos y pedidos

## Tecnologías Utilizadas 💻

- **Frontend**:

  - React 18.3.1
  - Vite 6.0.5
  - Tailwind CSS 3.4.17
  - NextUI 2.6.10
  - Framer Motion 11.15.0
  - Socket.io-client 4.8.1

- **Herramientas de Desarrollo**:
  - ESLint 9.17.0
  - PostCSS 8.4.49
  - Autoprefixer 10.4.20

## Estructura del Proyecto 📁

```
src/
├── assets/            # Recursos estáticos
├── components/        # Componentes React
│   ├── About/        # Sección Sobre Nosotros
│   ├── ChatBubble/   # Componente del Chat
│   ├── Contact/      # Sección de Contacto
│   ├── Footer/       # Pie de página
│   ├── Hero/         # Sección principal
│   ├── Menu/         # Sección del menú
│   └── Navbar/       # Barra de navegación
├── context/          # Contextos de React
│   └── ThemeContext  # Contexto para el tema
├── hooks/            # Hooks personalizados
│   ├── useChat      # Hook para el chat
│   └── useProducts  # Hook para productos
└── services/         # Servicios de API
    ├── products/     # Servicios de productos
    └── socket/       # Servicios de WebSocket
```

## Características Detalladas 🔍

### Temas Claro/Oscuro

- Sistema de temas personalizado
- Persistencia en localStorage
- Detección automática de preferencias del sistema

### Asistente Virtual Nigiri

- Chat en tiempo real con WebSocket
- Persistencia de conversaciones
- Indicador de escritura
- Notificaciones de mensajes nuevos
- Gestión de pedidos integrada

### Menú Interactivo

- Categorización de productos
- Filtrado dinámico
- Animaciones de transición
- Carga de datos desde API

## Configuración del Proyecto 🚀

1. **Instalación de dependencias**

```bash
npm install
```

2. **Variables de entorno**
   Renombrar el archivo `.env.examples` a `.env`

```env
VITE_API_URL=http://tu-api-url
```

3. **Desarrollo local**

```bash
npm run dev
```

4. **Construcción para producción**

```bash
npm run build
```

## Comandos Disponibles 📝

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
