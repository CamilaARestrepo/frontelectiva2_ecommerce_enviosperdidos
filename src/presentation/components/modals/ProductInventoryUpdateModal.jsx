import React, { useEffect, useState } from "react";
import { findProducts } from "../../../services/productService";
import { inventoryService} from "../../../services/inventoryService";
import { tokenService } from "../../../utils/tokenService";
import "../../../styles/CategoriaModal.css";

const ProductInventoryUpdateModal = ({ show, onClose }) => {
  const token = tokenService.getToken();
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    if (show) {
      findProducts(token)
        .then((res) => {
          setProductos(res.products || []);
        })
        .catch((error) => {
          console.error("Error cargando productos:", error);
          setMensaje("Error cargando lista de productos");
        });
    }
  }, [show, token]);

  const handleSelectChange = async (e) => {
    const productoId = e.target.value;
    const producto = productos.find((p) => p.id === productoId);

    if (!productoId || !producto) {
      setProductoSeleccionado(null);
      return;
    }
     
    try {
      const response = await inventoryService.getInventoryByProductId(productoId, token);
      const inventario = response.invetory;
      setProductoSeleccionado({
        ...producto,
        price: inventario.price,
        stock: inventario.stock,
      });
    } catch (error) {
      console.error("Error al obtener inventario:", error);
      setMensaje("No se pudo cargar inventario del producto");
      setProductoSeleccionado(producto);
    }
  };

  const handleChange = (e) => {
    setProductoSeleccionado({
      ...productoSeleccionado,
      [e.target.name]: e.target.value,
    });
  };

  const handleActualizarInventario = async () => {
    if (!productoSeleccionado) {
      setMensaje("Por favor selecciona un producto");
      return;
    }

    const data = {
      price: parseFloat(productoSeleccionado.price),
      stock: parseInt(productoSeleccionado.stock),
    };

    try {
      await inventoryService.updateInventory(productoSeleccionado.id, data, token);
      setMensaje("Inventario actualizado con éxito");
      setTimeout(() => {
        setMensaje("");
        setProductoSeleccionado(null);
        onClose();
      }, 1500);
    } catch (error) {
      console.error("Error al actualizar inventario:", error);
      setMensaje(error.message || "Error al actualizar inventario");
    }
  };

  if (!show) return null;

  return (
    <div className="categoria-modal-overlay">
      <div className="categoria-modal">
        {/* Header */}
        <div className="categoria-modal-header">
          <h5>Actualizar Inventario</h5>
          <button type="button" className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="categoria-modal-body">
          <select
            className="input-minimal"
            onChange={handleSelectChange}
            value={productoSeleccionado?.id || ""}
          >
            <option value="">Seleccionar producto</option>
            {productos.map((prod) => (
              <option key={prod.id} value={prod.id}>
                {prod.name}
              </option>
            ))}
          </select>

          {productoSeleccionado && (
            <>
              <input
                type="number"
                className="input-minimal"
                name="price"
                placeholder="Precio"
                value={productoSeleccionado.price || ""}
                onChange={handleChange}
              />
              <input
                type="number"
                className="input-minimal"
                name="stock"
                placeholder="Stock disponible"
                value={productoSeleccionado.stock || ""}
                onChange={handleChange}
              />
            </>
          )}

          {mensaje && (
            <p
              className={`modal-message ${
                mensaje.includes("éxito") ? "text-success" : "text-danger"
              }`}
            >
              {mensaje}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="categoria-modal-footer">
          <button className="btn-minimal" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn-minimal" onClick={handleActualizarInventario}>
            Actualizar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductInventoryUpdateModal;
