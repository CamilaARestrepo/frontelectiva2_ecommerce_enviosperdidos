
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
-   **Fech** para consumo de API
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
  assets/               # Imágenes, íconos, fuentes, etc.
  presentation/         # Contenedor principal de la capa visual
    components/         # Componentes reutilizables (modales...)
    pages/              # Vistas o pantallas completas (Home, Login)
    services/           # Servicios para comunicación con la API 
    styles/             # Archivos CSS o módulos de estilos
    utils/              # Funciones auxiliares 

  App.jsx               # Componente raíz principal
  App.css               # Estilos globales
  index.css             # Estilos base
  main.jsx              # Punto de entrada del proyecto
```

------------------------------------------------------------------------

## ⚙️ Instalación y Ejecución

### 1️⃣ Clonar el repositorio

``` bash
git clone <https://github.com/CamilaARestrepo/frontelectiva2_ecommerce_enviosperdidos.git>
cd <frontendecommerce>
```

### 2️⃣ Instalar dependencias

``` bash
yarn
```

### 3️⃣ Ejecutar en modo desarrollo

``` bash
yarn dev
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
autenticación - Guardar información del carrito 

Ejemplo de uso:

``` js
Cookies.set("token", token, { expires: 1 });
```

