import React, { useEffect, useState } from "react";
import {
  getUserProfile,
  updateUserProfile,
} from "../../../services/userService";
import { getUserFromToken } from "../../../utils/authUtils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserProfileModal = ({ show, onClose }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (show) {
      const userData = getUserFromToken();
      if (userData?.id) {
        cargarPerfil(userData.id);
      }
    }
  }, [show]);

  const cargarPerfil = async (userId) => {
    try {
      setLoading(true);
      const data = await getUserProfile(userId);
      setUserProfile(data);
      setFormData(data);
    } catch (error) {
      console.error("Error al cargar perfil:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await updateUserProfile(userProfile._id || userProfile.id, formData);
      toast.success("Perfil actualizado correctamente");
      setEditing(false);
      await cargarPerfil(userProfile._id || userProfile.id);
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      toast.error("Error al actualizar perfil");
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        className="modal-dialog modal-fullscreen d-flex justify-content-center align-items-center"
        style={{ maxWidth: "900px" }}
      >
        <div className="modal-content border-0 shadow-lg rounded-4">
          {/* HEADER */}
          <div className="modal-header bg-dark text-white border-0">
            <h5 className="modal-title fw-bold">Perfil del Usuario</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          {/* BODY */}
          <div className="modal-body p-4">
            {loading ? (
              <div className="text-center p-3">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="mt-2">Cargando perfil...</p>
              </div>
            ) : userProfile ? (
              <form>
                <div className="row g-4">
                  {/* Campos no editables */}
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        value={formData.firstName || ""}
                        readOnly
                      />
                      <label htmlFor="firstName">Nombre</label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        value={formData.lastName || ""}
                        readOnly
                      />
                      <label htmlFor="lastName">Apellido</label>
                    </div>
                  </div>

                  {/* Campos editables */}
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        id="email"
                        value={formData.email || ""}
                        onChange={handleChange}
                        readOnly={!editing}
                      />
                      <label htmlFor="email">Correo</label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        name="phone"
                        className="form-control"
                        id="phone"
                        value={formData.phone || ""}
                        onChange={handleChange}
                        readOnly={!editing}
                      />
                      <label htmlFor="phone">Teléfono</label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        name="country"
                        className="form-control"
                        id="country"
                        value={formData.country || ""}
                        onChange={handleChange}
                        readOnly={!editing}
                      />
                      <label htmlFor="country">País</label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        name="state"
                        className="form-control"
                        id="state"
                        value={formData.state || ""}
                        onChange={handleChange}
                        readOnly={!editing}
                      />
                      <label htmlFor="state">Departamento</label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        name="city"
                        className="form-control"
                        id="city"
                        value={formData.city || ""}
                        onChange={handleChange}
                        readOnly={!editing}
                      />
                      <label htmlFor="city">Ciudad</label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        name="neighborhood"
                        className="form-control"
                        id="neighborhood"
                        value={formData.neighborhood || ""}
                        onChange={handleChange}
                        readOnly={!editing}
                      />
                      <label htmlFor="neighborhood">Barrio</label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        name="postalCode"
                        className="form-control"
                        id="postalCode"
                        value={formData.postalCode || ""}
                        onChange={handleChange}
                        readOnly={!editing}
                      />
                      <label htmlFor="postalCode">Código Postal</label>
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              <p className="text-danger text-center">
                No se pudo obtener la información del usuario.
              </p>
            )}
          </div>

          {/* FOOTER */}
          <div className="modal-footer border-0 d-flex justify-content-between">
            {!editing ? (
              <button className="btn-minimal" onClick={() => setEditing(true)}>
                Editar
              </button>
            ) : (
              <button className="btn-minimal" onClick={handleSave}>
                Guardar cambios
              </button>
            )}
            <button className="btn-minimal" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
