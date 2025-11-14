# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Proyecto Frontend - Ecommerce

## 📝 Descripción General

Este proyecto corresponde al **frontend de un Ecommerce**, desarrollado
con **React + Vite**. La aplicación permite a los usuarios navegar,
agregar productos al carrito, autenticarse mediante un sistema basado en
**cookies** (para almacenar el token) y gestionar compras.

Además, el proyecto incluye un **módulo administrativo**, donde un
administrador puede gestionar: - Inventario - Productos - Estados y
flujo de pedidos

La arquitectura y la organización del código buscan mantener un proyecto
escalable, claro y fácil de mantener.

------------------------------------------------------------------------

## 🚀 Tecnologías Utilizadas

-   **React 18**
-   **Vite**
-   **React Router**
-   **Cookies (js-cookie)**
-   **Axios** para consumo de API
-   **MDB React UI Kit** (si aplica)
-   **React Toastify** para notificaciones

------------------------------------------------------------------------

## 🏗️ Arquitectura del Proyecto

El frontend está organizado bajo una **arquitectura por capas**,
permitiendo mantener una separación clara entre componentes, servicios,
rutas y lógica de negocio. Esto facilita la escalabilidad,
mantenibilidad y orden del código.

Las principales capas son: - **components/** → Componentes
reutilizables - **pages/** → Vistas principales del sistema -
**services/** → Lógica para comunicación con APIs externas -
**context/** → Manejo de estados globales - **router/** → Definición de
rutas públicas y privadas - **styles/** → Hojas de estilo - **hooks/** →
Custom hooks

## 📂 Estructura del Proyecto (base)

``` bash
src/
  components/
  pages/
  services/
  hooks/
  context/
  styles/
  router/
```

------------------------------------------------------------------------

## ⚙️ Instalación y Ejecución

### 1️⃣ Clonar el repositorio

``` bash
git clone <url-repo>
cd <nombre-proyecto>
```

### 2️⃣ Instalar dependencias

``` bash
npm install
```

### 3️⃣ Ejecutar en modo desarrollo

``` bash
npm run dev
```

### 4️⃣ Construir para producción

``` bash
npm run build
```

------------------------------------------------------------------------

## 🔌 Variables de Entorno

El proyecto utiliza un archivo **.env** para configurar valores
sensibles y rutas del sistema. Gracias al soporte nativo de **Vite**,
las variables requieren el prefijo `VITE_`.

Ejemplo de archivo `.env`:

    VITE_API_URL=https://tudominio.com/api
    VITE_ENV=development

Estas variables permiten desacoplar la configuración del código y
adaptar fácilmente el frontend a distintos ambientes (desarrollo,
pruebas o producción).

------------------------------------------------------------------------

## 🍪 Manejo de Cookies

El proyecto utiliza **js-cookie** para: - Guardar token de
autenticación - Guardar información del carrito (si aplica)

Ejemplo de uso:

``` js
Cookies.set("token", token, { expires: 1 });
```

------------------------------------------------------------------------

## 🛠️ Scripts Disponibles

-   `npm run dev`: Ejecuta el entorno de desarrollo
-   `npm run build`: Construye la aplicación
-   `npm run preview`: Previsualiza la versión de producción

------------------------------------------------------------------------

## 🧪 Buenas Prácticas Implementadas

-   Separación de lógica en **services**
-   Manejo de rutas en archivo centralizado
-   Componentización limpia
-   Reutilización de estilos

------------------------------------------------------------------------

## 📧 Contacto

Si deseas soporte o realizar mejoras, puedes comunicarte conmigo.
