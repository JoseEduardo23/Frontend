import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import '../Estilos/Restablecer.css';
import key from '../assets/key.png'
import { Link } from 'react-router-dom';
import AuthContext from '../Context/AuthProvider';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Restablecer() {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(null);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { token } = useParams();
  const [tokenback, setTokenback] = useState(false);
  const [form, setform] = useState({
    password: "",
    confirmpassword: ""
  });

  const handleChange = (e) => {
    const {name, value} =e.target
    if (name === "password") {
      if (!/(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}/.test(value)) {
        setPasswordError(<p>Debe contener una mayúscula, <br />
          un número y un carácter especial</p>);
      } else {
        setPasswordError(null);
      }
    }
    setform({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}api/usuario/nuevo-password/${token}`;
      const respuesta = await axios.post(url, form);
      toast.success(respuesta.data.msg);
    } catch (error) {
      toast.error(error.response?.data?.msg || "Error al restablecer la contraseña");
    }
  };

  const verifyToken = async () => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}api/usuario/recuperar-password/${token}`;
      const respuesta = await axios.get(url);
      toast.success(respuesta.data.msg);
      setTokenback(true);
    } catch (error) {
      toast.error(error.response?.data?.msg || "Token inválido o expirado");
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <>
      <ToastContainer autoClose={5000} />

      <div className="rest-container">
        <div className="rest-card">
          <div className="rest-header">
            <img src={key} className="rest-icon" alt="Key icon" />
            <h1 className="rest-title">Restablecer Contraseña</h1>
          </div>

          {tokenback ? (
            <form onSubmit={handleSubmit} className="rest-form">
              <div className="rest-group">
                <label htmlFor="password" className="rest-label">
                  Nueva Contraseña
                </label>
                <div className="password-input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="rest-input"
                    placeholder="Ingresa tu nueva contraseña"
                  />
                  <span className='toggleRe-password' onClick={togglePasswordVisibility}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                  {passwordError && <p className='error-m' style={{ color: "red", fontSize: "12px" }}>{passwordError}</p>}
                </div>
                
                <div className="rest-strength"></div>
              </div>

              <div className="rest-group">
                <label htmlFor="confirmpassword" className="rest-label">
                  Confirmar Contraseña
                </label>
                <div className="password-input-container">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmpassword"
                    name="confirmpassword"
                    value={form.confirmpassword}
                    onChange={handleChange}
                    className="rest-input"
                    placeholder="Confirma tu contraseña"

                  />
                  <span className='toggleRe-password' onClick={toggleConfirmPasswordVisibility}>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>

              <div className='rest-botones'>
                <button type="submit" className="rest-button">
                  <span>Actualizar Contraseña</span>
                  <svg className="rest-arrow" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>
                <Link to="/login">
                  <button type='button' className='resta-button'>
                    <span>Iniciar Sesión</span>
                    <svg className='rest-arrow' viewBox='0 0 24 24'>
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </Link>
              </div>
            </form>
          ) : (
            <div className="rest-loading">
              <div className="rest-spinner"></div>
              <p className="rest-loading-text">Verificando token, por favor espera...</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}