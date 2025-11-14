// TrackingModal.jsx
import React from "react";

const TrackingModal = ({ show, tracking, onClose }) => {
  if (!show) return null;

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content border-0 shadow-lg rounded-3">
          {/* HEADER */}
          <div className="modal-header border-0">
            <h5 className="modal-title">Información del Tracking</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          {/* BODY */}
          <div className="modal-body">
            {tracking ? (
              <div className="tracking-info">
                
                <p>
                  <strong>Fecha:</strong> {tracking.trackingDate}
                </p>
                <p>
                  <strong>Estado Actual:</strong>{" "}
                  <span className={`status-badge ${tracking.currentStatus.toLowerCase()}`}>
                    {tracking.currentStatus}
                  </span>
                </p>

                <div className="status-history">
                  <strong>Historial de Estado:</strong>
                  <ul>
                    {tracking.statusHistory.map((status, idx) => (
                      <li key={idx}>
                        <span>{status.status}</span> -{" "}
                        <small>{new Date(status.timestamp).toLocaleString()}</small> -{" "}
                        <em>{status.changedBy}</em>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <p>No se encontró información de tracking.</p>
            )}
          </div>

          {/* FOOTER */}
          <div className="modal-footer border-0">
            <button className="btn-minimal" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingModal;
