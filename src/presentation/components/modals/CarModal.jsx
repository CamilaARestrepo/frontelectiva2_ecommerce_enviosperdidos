import React, { useState, useEffect } from "react";
import { cartService } from "../../../../src/services/cartService";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "../../../styles/Car.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const CartModal = ({ show, onClose }) => {
  const [carrito, setCarrito] = useState([]);
  const navigate = useNavigate();
  const userId = Cookies.get("userId");

  useEffect(() => {
    if (show) {
      const cart = cartService.getCart();
      setCarrito(cart);
    }
  }, [show]);

  const handleCantidad = async (productId, action) => {
    try {
      const producto = carrito.find((p) => p.id === productId);
      if (!producto) return;

      const cantidadAnterior = producto.reservedStock;
      const nuevaCantidad =
        action === 1 ? cantidadAnterior + 1 : Math.max(cantidadAnterior - 1, 1);

      if (cantidadAnterior > 0)
        await cartService.actualizarProducto(productId, cantidadAnterior, 2);
      if (nuevaCantidad > 0)
        await cartService.actualizarProducto(productId, nuevaCantidad, 1);

      const actualizado = carrito.map((p) =>
        p.id === productId ? { ...p, reservedStock: nuevaCantidad } : p
      );
      setCarrito(actualizado);
      cartService.saveCart(actualizado);

      toast.info(`Cantidad de ${producto.name} actualizada a ${nuevaCantidad}`);
    } catch (err) {
      console.error(err);
      toast.error("Error al actualizar cantidad");
    }
  };

  const handleEliminar = async (productId) => {
    try {
      const producto = carrito.find((p) => p.id === productId);
      if (!producto) return;

      if (producto.reservedStock > 0)
        await cartService.actualizarProducto(
          productId,
          producto.reservedStock,
          2
        );

      const actualizado = carrito.filter((p) => p.id !== productId);
      setCarrito(actualizado);
      cartService.saveCart(actualizado);

      toast.success(`${producto.name} eliminado del carrito`);
    } catch (err) {
      console.error(err);
      toast.error("Error al eliminar producto");
    }
  };

  if (!show) return null;

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div
        className="cart-panel"
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="cart-header">
          <h5>Tu carrito</h5>
          <button className="btn-close" onClick={onClose}></button>
        </div>

        <div className="cart-body">
          {carrito.length === 0 ? (
            <p className="text-center">Tu carrito está vacío</p>
          ) : (
            carrito.map((producto) => (
              <div className="cart-item" key={producto.id}>
                <span>{producto.name}</span>
                <div className="cart-item-buttons">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => handleCantidad(producto.id, 1)}
                  >
                    <i className="bi bi-plus"></i>
                  </button>
                  <span style={{ margin: "0 0.5rem" }}>
                    {producto.reservedStock}
                  </span>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => handleCantidad(producto.id, 2)}
                  >
                    <i className="bi bi-dash"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleEliminar(producto.id)}
                  >
                     <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <button className="btn-minimal"onClick={onClose}>
            Cerrar
          </button>
          <button
             className="btn-minimal"
            onClick={() => {
              onClose();
              navigate("/confirmacion");
            }}
          >
            Finalizar compra
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
