# Proyecto Frontend - Ecommerce
📝 Descripción General

Este proyecto corresponde al frontend de un Ecommerce, desarrollado con React + Vite. La aplicación permite a los usuarios navegar, agregar productos al carrito, autenticarse mediante un sistema basado en cookies (para almacenar el token) y gestionar compras.

Además, el proyecto incluye un módulo administrativo, donde un administrador puede gestionar:

Inventario

Productos

Estados y flujo de pedidos

La arquitectura y la organización del código buscan mantener un proyecto escalable, claro y fácil de mantener.

🚀 Tecnologías Utilizadas

React 18

Vite

React Router

Cookies (js-cookie)

Axios para consumo de API

MDB React UI Kit (si aplica)

React Toastify para notificaciones

📦 Funcionalidades Principales
🛒 Cliente

Ver catálogo de productos

Agregar productos al carrito

Manejo de sesión mediante tokens almacenados en cookies

Flujo básico de compra

🔐 Autenticación

Inicio de sesión

Persistencia de sesión con cookies

Protección de rutas privadas

🛠️ Administrador

Gestión de productos

Gestión de inventario

Edición, creación y eliminación de productos

Control de pedidos (si aplica)

🏗️ Arquitectura del Proyecto

El frontend está organizado bajo una arquitectura por capas, permitiendo mantener una separación clara entre componentes, servicios, rutas y lógica de negocio. Esto facilita la escalabilidad, mantenibilidad y orden del código.

Las principales capas son:

components/ → Componentes reutilizables

pages/ → Vistas principales del sistema

services/ → Lógica para comunicación con APIs externas

context/ → Manejo de estados globales

router/ → Definición de rutas públicas y privadas

styles/ → Hojas de estilo

hooks/ → Custom hooks

📂 Estructura del Proyecto (base)
src/
  components/
  pages/
  services/
  hooks/
  context/
  styles/
  router/
⚙️ Instalación y Ejecución
1️⃣ Clonar el repositorio
git clone <url-repo>
cd <nombre-proyecto>
2️⃣ Instalar dependencias
npm install
3️⃣ Ejecutar en modo desarrollo
npm run dev
4️⃣ Construir para producción
npm run build
🔌 Variables de Entorno

El proyecto utiliza un archivo .env para configurar valores sensibles y rutas del sistema. Gracias al soporte nativo de Vite, las variables requieren el prefijo VITE_.

Ejemplo de archivo .env:

VITE_API_URL=https://tudominio.com/api
VITE_ENV=development

Estas variables permiten desacoplar la configuración del código y adaptar fácilmente el frontend a distintos ambientes (desarrollo, pruebas o producción).

Crear un archivo .env con propiedades como:

VITE_API_URL=https://tudominio.com/api

Donde VITE_API_URL apunta al backend .NET.

🍪 Manejo de Cookies

El proyecto utiliza js-cookie para:

Guardar token de autenticación

Guardar información del carrito (si aplica)

Ejemplo de uso:

Cookies.set("token", token, { expires: 1 });
🛠️ Scripts Disponibles

npm run dev: Ejecuta el entorno de desarrollo

npm run build: Construye la aplicación

npm run preview: Previsualiza la versión de producción

🧪 Buenas Prácticas Implementadas

Separación de lógica en services

Manejo de rutas en archivo centralizado

Componentización limpia

Reutilización de estilos
