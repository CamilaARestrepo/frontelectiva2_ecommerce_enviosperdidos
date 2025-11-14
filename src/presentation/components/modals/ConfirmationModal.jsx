import React from "react";
import "../../../styles/CategoriaModal.css"; // reutilizamos el estilo del otro modal

const ConfirmacionModal = ({ show, order, onClose, onConfirm }) => {
  if (!show || !order) return null;

  return (
    <div className="categoria-modal-overlay">
      <div className="categoria-modal" style={{ maxWidth: "500px" }}>
        {/* Encabezado */}
        <div className="categoria-modal-header">
          <h5>Confirmar Compra</h5>
          <button type="button" className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Cuerpo */}
        <div className="categoria-modal-body">
          <p className="text-center mb-2">
            <strong>Total:</strong>{" "}
            <span className="text-success fw-bold">
              ${order.total?.toLocaleString() || "0"}
            </span>
          </p>

          <div
            style={{
              maxHeight: "180px",
              overflowY: "auto",
              borderTop: "1px solid #eee",
              marginTop: "10px",
              paddingTop: "8px",
            }}
          >
            {order.products?.map((p) => (
              <div
                key={p.productId}
                className="d-flex justify-content-between small py-1"
              >
                <span>{p.name}</span>
                <span>x{p.quantity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="categoria-modal-footer">
          <button className="btn-minimal" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn-minimal" onClick={onConfirm}>
            Confirmar Compra
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmacionModal;
