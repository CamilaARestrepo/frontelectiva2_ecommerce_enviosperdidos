import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserFromToken } from "../../utils/authUtils";
import { getUserProfile } from "../../services/userService";
import { cartService } from "../../services/cartService";
import { orderService } from "../../services/orderService";
import ConfirmacionModal from "../../presentation/components/modals/ConfirmationModal";
import { trackingService } from "../../services/trackingService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CheckoutPage = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("PSE");
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [createdOrder, setCreatedOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = getUserFromToken();
    if (userData?.id) cargarUsuario(userData.id);

    const carrito = cartService.getCart();
    setCart(carrito);
    if (carrito.length > 0) {
      setTotal(
        carrito.reduce(
          (acc, producto) => acc + producto.price * (producto.reservedStock || 1),
          0
        )
      );
    }
  }, []);

  const cargarUsuario = async (userId) => {
    try {
      const data = await getUserProfile(userId);
      setUser(data);
      setFormData({
        country: data.country || "Colombia",
        state: data.state || "",
        city: data.city || "",
        neighborhood: data.neighborhood || "",
        address: data.address || "",
        postalCode: data.postalCode || "",
      });
    } catch (error) {
      console.error("Error cargando perfil:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePagar = async () => {
    if (!user) {
      toast.error("No hay usuario logueado.");
      return;
    }

    const orderData = {
      userId: user.id,
      products: cart.map((p) => ({
        productId: p.id,
        name: p.name,
        description: p.description,
        quantity: p.reservedStock || 1,
        price: p.price,
        categoryId: p.categoryId,
        categoryName: p.categoryName,
      })),
      shippingAddress: formData,
      paymentMethod,
    };

    try {
      const result = await orderService.createPreorder(user.id, orderData);
      setCreatedOrder(result);
      setShowModal(true);
    } catch (error) {
      console.error(error);
      toast.error("Error al crear la preorden.");
    }
  };

  const handleConfirmarCompra = async () => {
    try {
    const confirmedOrder = await orderService.confirmPreorder(user.id, createdOrder._id, user.email);
      toast.success("Compra confirmada con éxito.");
           console.log("✅ ConfirmPreorder retornó:", confirmedOrder);
        if (confirmedOrder?.order.orderNumber && confirmedOrder?.order.userId) {

      const trackingData = {
        orderNumber: confirmedOrder.order.orderNumber,
        userId: confirmedOrder.order.userId,
      };

      await trackingService.createTracking(trackingData);
      console.log("🚚 Tracking creado correctamente para la orden:", confirmedOrder.order.orderNumber);
    } else {
      console.warn("⚠️ Faltan datos para crear el tracking:", confirmedOrder);
    }
      cartService.clearCart();
      setShowModal(false);
      navigate("/orders");
    } catch (error) {
      console.error(error);
      toast.error("Error al confirmar la compra.");
    }
  };

  return (
    <>
      <div className="container py-4">
        <h2 className="mb-4 text-center text-2xl fw-bold">Confirmar Compra</h2>

        {user && (
          <div className="card mb-4 shadow-sm">
            <div className="card-header header-solid"> Datos del Usuario</div>
            <div className="card-body">
              <p>
                <strong>Nombre:</strong> {user.firstName} {user.lastName}
              </p>
              <p>
                <strong>Correo:</strong> {user.email}
              </p>
            </div>
          </div>
        )}

        <div className="card mb-4 shadow-sm">
          <div className="card-header header-solid">Dirección de Envío</div>
          <div className="card-body">
            <div className="row g-3">
              {["country", "state", "city", "neighborhood", "address", "postalCode"].map(
                (field) => (
                  <div className="col-md-6" key={field}>
                    <label className="form-label text-capitalize">{field}</label>
                    <input
                      type="text"
                      name={field}
                      value={formData[field] || ""}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        <div className="card mb-4 shadow-sm">
          <div className="card-header header-solid">Productos</div>
          <div className="card-body">
            {cart.length === 0 ? (
              <p>No hay productos en el carrito.</p>
            ) : (
              <ul className="list-group">
                {cart.map((p) => (
                  <li
                    key={p.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    {p.name}
                    <span className="badge bg-secondary">x{p.reservedStock}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="card mb-4 shadow-sm">
          <div className="card-header header-solid">Método de Pago</div>
          <div className="card-body">
            <select
              className="form-select"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="PSE">PSE</option>
              <option value="Consignación">Consignación</option>
              <option value="Tarjeta">Tarjeta</option>
            </select>
          </div>
        </div>

        <div className="text-center">
          <h4 className="mb-3">Total a Pagar: ${total.toLocaleString()}</h4>
          <button className="btn-minimal" onClick={handlePagar}>
            Pagar Ahora 
          </button>
        </div>
      </div>

      <ConfirmacionModal
        show={showModal}
        order={createdOrder}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmarCompra}
      />
    </>
  );
};

export default CheckoutPage;
