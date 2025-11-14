// src/pages/Auth/Login.jsx
import React, { useState, useEffect } from "react";
import logo from "../../assets/img/logo.png";
import { loginService } from "../../services/authService";
import { registerService } from "../../services/registerService";
import { useForm } from "react-hook-form";
import { validateRegister } from "../../utils/registerValidation";
import { locationService } from "../../services/locationService";
import "../../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
   const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // React Hook Form para registro
  // FORMULARIO DE LOGIN
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    reset: resetLogin,
    formState: { errors: loginErrors },
  } = useForm();

  // FORMULARIO DE REGISTRO
  const {
    register: registerRegister,
    handleSubmit: handleSubmitRegister,
    setError: setErrorRegister,
    clearErrors: clearErrorsRegister,
    formState: { errors: registerErrors },
    reset: resetRegister,
  } = useForm({ mode: "onBlur" });

  // LOGIN

  const handleTabClick = (tab) => setActiveTab(tab);

  const onLoginSubmit  = async (data) => {

    setLoading(true);
    setLoginError(null);

    try {
      const result = await loginService(
        data.email,
        data.password,
        data.remember
      );
       navigate("/"); 
      console.log(" Login exitoso:", result);

  
      resetLogin();
    } catch (error) {
      console.error("Error en login:", error);
      setLoginError(error.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  // Registro dependencias dropdowns
  const [countries] = useState(locationService.getCountries());
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("COL");
  const [selectedState, setSelectedState] = useState("ANT");

  // Actualizar departamentos al cambiar país
  useEffect(() => {
    const statesList = locationService.getStates(selectedCountry);
    setStates(statesList);
    setSelectedState(statesList[0]?.code || "");
  }, [selectedCountry]);

  // Actualizar municipios al cambiar departamento
  useEffect(() => {
    const citiesList = locationService.getCities(selectedState);
    setCities(citiesList);
  }, [selectedState]);

  // REGISTER
  const onRegisterSubmit = async (data) => {

    clearErrorsRegister();
    const validationErrors = validateRegister(data);

    if (Object.keys(validationErrors).length > 0) {
      Object.entries(validationErrors).forEach(([field, message]) => {
        setErrorRegister(field, { type: "manual", message });
      });
      return;
    }
    data.country = selectedCountry;
    data.state = selectedState;

    setLoading(true);
    try {
      const response = await registerService(data);
      toast.success("Usuario registrado correctamente ");
      resetRegister();
      setActiveTab("login");
    } catch (err) {
      console.error("Error en registro:", err);
      toast.error(err.message || "Error al registrar usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "900px" }}>
      {/* Tabs */}
      <ul className="nav nav-pills nav-justified mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "login" ? "active" : ""}`}
            onClick={() => handleTabClick("login")}
          >
            Login
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "register" ? "active" : ""}`}
            onClick={() => handleTabClick("register")}
          >
            Register
          </button>
        </li>
      </ul>

      {/* LOGIN */}
      {activeTab === "login" && (
        <section className="text-center text-lg-start">
          <div className="card mb-3 shadow-lg border-0">
            <div className="row g-0 d-flex align-items-center">
              <div className="col-lg-4 d-none d-lg-flex">
                <img
                  src={logo}
                  alt="logo"
                  className="w-100 rounded-top rounded-lg-start"
                  style={{ objectFit: "cover", height: "100%" }}
                />
              </div>
              <div className="col-lg-8">
                <div className="card-body py-5 px-md-5">
                  <h3 className="mb-4 text-center">Inicia sesión</h3>
                  <form onSubmit={handleSubmitLogin(onLoginSubmit )}>
                    {/* Email */}
                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id="loginEmail"
                        className="form-control"
                        {...registerLogin("email", {
                          required: "El correo es obligatorio",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Correo inválido",
                          },
                        })}
                      />
                      <label className="form-label" htmlFor="loginEmail">
                        Correo electrónico
                      </label>
                      {loginErrors.email && (
                        <p className="text-danger">
                          {loginErrors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Password */}
                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="loginPassword"
                        className="form-control"
                        {...registerLogin("password", {
                          required: "La contraseña es obligatoria",
                          minLength: {
                            value: 6,
                            message: "Debe tener al menos 6 caracteres",
                          },
                        })}
                      />
                      <label className="form-label" htmlFor="loginPassword">
                        Contraseña
                      </label>
                      {loginErrors.password && (
                        <p className="text-danger">
                          {loginErrors.password.message}
                        </p>
                      )}
                    </div>

                    {/* Recordarme */}
                    <div className="row mb-4">
                      <div className="col d-flex justify-content-center">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="rememberCheck"
                            {...registerLogin("remember")}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="rememberCheck"
                          >
                            Recordarme
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Error general */}
                    {loginError && (
                      <div className="alert alert-danger">{loginError}</div>
                    )}

                    {/* Botón */}
                    <button
                      type="submit"
                      className="btn btn-primary btn-block w-100"
                      disabled={loading}
                    >
                      {loading ? "Cargando..." : "Ingresar"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* REGISTER */}
      {activeTab === "register" && (
        <div className="card p-4 shadow">
          <h3 className="text-center mb-4">Registro de usuario</h3>
          <form
            onSubmit={handleSubmitRegister((data) => {
             
              onRegisterSubmit(data);
            })}
          >
            <div className="row mb-3">
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  {...registerRegister("firstName")}
                  placeholder="Nombre"
                  className="form-control"
                />
                {registerErrors.firstName && (
                  <small className="text-danger">
                    {registerErrors.firstName.message}
                  </small>
                )}
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  {...registerRegister("lastName")}
                  placeholder="Apellido"
                  className="form-control"
                />
                {registerErrors.lastName && (
                  <small className="text-danger">
                    {registerErrors.lastName.message}
                  </small>
                )}
              </div>
            </div>

            <input
              type="email"
              {...registerRegister("email")}
              placeholder="Correo electrónico"
              className="form-control mb-3"
            />
            {registerErrors.email && (
              <small className="text-danger">
                {registerErrors.email.message}
              </small>
            )}

            <input
              type="password"
              {...registerRegister("password")}
              placeholder="Contraseña"
              className="form-control mb-3"
            />
            {registerErrors.password && (
              <small className="text-danger">
                {registerErrors.password.message}
              </small>
            )}

            {/* Tipo de documento */}
            <select
              {...registerRegister("idType")}
              className="form-control mb-3"
            >
              <option value="">Selecciona tipo de documento</option>
              <option value="CC">CC</option>
              <option value="CE">CE</option>
              <option value="TI">TI</option>
              <option value="NIT">NIT</option>
            </select>

            <input
              type="text"
              {...registerRegister("idNumber")}
              placeholder="Número de documento"
              className="form-control mb-3"
            />

            <input
              type="text"
              {...registerRegister("phone")}
              placeholder="Teléfono"
              className="form-control mb-3"
            />
            <select
              {...registerRegister("gender")}
              className="form-control mb-3"
            >
              <option value="">Selecciona género</option>
              <option value="F">Femenino</option>
              <option value="M">Masculino</option>
              <option value="O">Otro</option>
            </select>
            <select
              {...registerRegister("roleId")}
              className="form-control mb-3"
            >
              <option value="">Selecciona rol</option>
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
              <option value="LOG">LOG</option>
            </select>

            {/* País */}
            <select
              className="form-control mb-3"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              {countries.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* Departamento */}
            <select
              {...registerRegister("departmentId")}
              className="form-control mb-3"
            >
              {states.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.name}
                </option>
              ))}
            </select>

            {/* Municipio */}
            <select
              {...registerRegister("cityId")}
              className="form-control mb-3"
            >
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <input
              type="text"
              {...registerRegister("neighborhood")}
              placeholder="Barrio"
              className="form-control mb-3"
            />

            <input
              type="text"
              {...registerRegister("address")}
              placeholder="Dirección"
              className="form-control mb-3"
            />

            <input
              type="text"
              {...registerRegister("postalCode")}
              placeholder="Código postal"
              className="form-control mb-4"
            />

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
              onClick={() => console.log("🖱️ Clic en botón de registro")}
            >
              {loading ? "Registrando..." : "Registrarse"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
