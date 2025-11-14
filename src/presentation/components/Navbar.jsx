import React, { useEffect, useState } from "react";
import logo from "../../assets/img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { getUserFromToken } from "../../utils/authUtils";

// Modales existentes
import CategoriaModal from "../components/modals/CategoriaModal";
import ModalProvider from "../components/modals/ProviderModal";
import ProductModal from "../components/modals/ProductModal";
import ProductUpdateModal from "../components/modals/ProductUpdateModal";
import ProductInventoryUpdateModal from "../components/modals/ProductInventoryUpdateModal";
import UserProfileModal from "../components/modals/UserProfileModal";

// Nuevo modal del carrito
import CarritoModal from "../components/modals/CarModal";

import "../../App.css";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showCategoriaModal, setShowCategoriaModal] = useState(false);
  const [showProviderModal, setShowProviderModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showProductUpdateModal, setShowProductUpdateModal] = useState(false);
  const [showProductInventoryUpdateModal, setShowProductInventoryUpdateModal] =
    useState(false);
  const [showUserProfileModal, setShowUserProfileModal] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [showCarritoModal, setShowCarritoModal] = useState(false); // 🛒 Nuevo estado para el modal de carrito

  const [cartCount, setCartCount] = useState(0); // 🔹 contador de productos en el carrito
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = Cookies.get("token");
      if (token) {
        const userData = getUserFromToken();
        setUser(userData);
      } else {
        setUser(null);
      }
    };

    checkAuth();

    // 🔁 Escuchar cambios cuando se guarda o borra el token
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);
  // 🔹 Aquí podrías actualizar el contador de carrito desde tu backend
  useEffect(() => {
    const storedCartCount = localStorage.getItem("cartCount");
    if (storedCartCount) {
      setCartCount(parseInt(storedCartCount));
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        <Link className="navbar-brand mt-2 mt-sm-0" to="/">
          <img src={logo} height="70" alt="Logo" loading="lazy" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenido del navbar */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            

            {user && (
              <li className="nav-item">
                <Link className="nav-link" to="/orders">
                  Mis Órdenes
                </Link>
              </li>
            )}
            {user?.roleId === "LOG" && (
              <li className="nav-item">
                <Link className="nav-link" to="/shipments">
                  Envíos
                </Link>
              </li>
            )}
            {user?.roleId === "admin" && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="configDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Configuración
                </a>
                <ul className="dropdown-menu" aria-labelledby="configDropdown">
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => setShowCategoriaModal(true)}
                    >
                      Crear categoría
                    </button>
                  </li>
                  <li
                    className={`dropdown-submenu ${showSubmenu ? "show" : ""}`}
                  >
                    <a
                      className="dropdown-item dropdown-toggle"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowSubmenu(!showSubmenu);
                      }}
                    >
                      Productos
                    </a>
                    <ul
                      className={`dropdown-menu ${showSubmenu ? "show" : ""}`}
                    >
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => setShowProductModal(true)}
                        >
                          Crear producto
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => setShowProductUpdateModal(true)}
                        >
                          Actualizar producto
                        </button>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => setShowProviderModal(true)}
                    >
                      Nuevo proveedor
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => setShowProductInventoryUpdateModal(true)}
                    >
                      Gestionar inventario
                    </button>
                  </li>
                </ul>
              </li>
            )}
          </ul>

          {/* Sección derecha */}
          <div className="d-flex align-items-center">
            {/* 🛒 Icono del carrito */}
            <button
              className="btn btn-link position-relative me-3"
              onClick={() => setShowCarritoModal(true)}
            >
              <i className="fas fa-shopping-cart fa-lg text-dark"></i>
              {cartCount > 0 && (
                <span
                  className="badge rounded-pill bg-danger position-absolute top-0 start-100 translate-middle"
                  style={{ fontSize: "0.75rem" }}
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* 👤 Perfil */}
            {user && (
              <button
                className="btn btn-outline-secondary me-2"
                onClick={() => setShowUserProfileModal(true)}
                title="Ver perfil"
              >
                <i className="fas fa-user"></i>
              </button>
            )}

            {/* 🔐 Sesión */}
            {user ? (
              <button
                className="btn btn-outline-danger ms-2"
                onClick={handleLogout}
              >
                Cerrar sesión
              </button>
            ) : (
              <button
                className="btn btn-outline-primary ms-2"
                onClick={() => navigate("/login")}
              >
                Iniciar sesión
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modales */}
      <CategoriaModal
        show={showCategoriaModal}
        onClose={() => setShowCategoriaModal(false)}
      />
      <ProductModal
        show={showProductModal}
        onClose={() => setShowProductModal(false)}
      />
      <ModalProvider
        show={showProviderModal}
        onClose={() => setShowProviderModal(false)}
      />
      <ProductUpdateModal
        show={showProductUpdateModal}
        onClose={() => setShowProductUpdateModal(false)}
      />
      <ProductInventoryUpdateModal
        show={showProductInventoryUpdateModal}
        onClose={() => setShowProductInventoryUpdateModal(false)}
      />
      <UserProfileModal
        show={showUserProfileModal}
        onClose={() => setShowUserProfileModal(false)}
      />

      {/* 🛒 Modal del carrito */}
      <CarritoModal
        show={showCarritoModal}
        onClose={() => setShowCarritoModal(false)}
      />
    </nav>
  );
};

export default Navbar;
