import React, { useEffect, useState } from "react";
import { GetCatalog } from "../../../src/services/CatalogService";
import { cartService } from "../../../src/services/cartService";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../../styles/Productos.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductos = async () => {
      const data = await GetCatalog();
      setProductos(data);
      setLoading(false);
    };
    fetchProductos();
  }, []);

  const handleAgregarCarrito = async (producto) => {
  const token = Cookies.get("token");
  const userId = Cookies.get("userId");

  if (!token) {
    navigate("/login");
    return;
  }

  try {
    const carritoActual = cartService.getCart();
    const existe = carritoActual.find((p) => p.id === producto.id);
    const cantidadAnterior = existe ? existe.reservedStock : 0;
    const nuevaCantidad = cantidadAnterior + 1; 

    if (cantidadAnterior > 0) {
      await cartService.actualizarProducto(producto.id, cantidadAnterior, 2);
    }


    await cartService.actualizarProducto(producto.id, nuevaCantidad, 1);

    if (existe) {
      existe.reservedStock = nuevaCantidad;
    } else {
      carritoActual.push({ ...producto, reservedStock: 1 });
    }

    cartService.saveCart(carritoActual);
    toast.success("Producto agregado al carrito ");
  } catch (error) {
    const mensaje = error.message.includes("Reserved stock cannot exceed available stock")
      ? "No hay suficiente inventario disponible para este producto"
      : "Ocurrió un error al agregar el producto al carrito: " + error;
  
    toast.error(mensaje)
  }
};


  if (loading)
    return (
      <section className="text-center container my-5">
        <h5>Cargando productos...</h5>
      </section>
    );
    

  return (
    <section className="text-center container my-5">
      <div className="row">
        {productos.map((producto) => (
          <div className="col-lg-3 col-md-6 mb-4" key={producto.id}>
            <div className="card h-100 shadow-sm producto-card">
              <img
                src={
                  producto.images?.[0] || "https://via.placeholder.com/300"
                }
                alt={producto.name}
                className="card-img-top producto-img"
              />
              <div className="card-body">
                <h5 className="card-title mb-2">{producto.name}</h5>
                <p className="text-muted">{producto.categoryName}</p>
                <h6 className="mb-3">
                  <strong>${producto.price.toLocaleString()}</strong>
                </h6>
                <button
                  className="btn-minimal"
                  onClick={() => handleAgregarCarrito(producto)}
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Productos;
