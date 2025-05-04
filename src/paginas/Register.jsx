import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import engranaje from '../assets/engranaje.png'
import '../Estilos/Register.css'
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const Register = () => {

    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        direccion: "",
        telefono: "",
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);
    const [nombreError, setNombreError] = useState(null);
    const [apellidoError, setApellidoError] = useState(null);
    const [direccionError, setDireccionError] = useState(null);
    const [telefonoError, setTelefonoError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [showPassword, setShowPassword] = useState(false)
    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }


    const handleChange = (e) => {

        const { name, value } = e.target;

        if (name === "nombre") {

            const charCount = value.length;
            if (charCount > 10) {
                setNombreError("Exceso de carácteres.");
                return;
            }

            if (!/^[A-Za-z\s]*$/.test(value)) {
                setNombreError("El nombre no debe tener números");
            } else {
                setNombreError(null);
            }
        }
        if (name === "apellido") {

            const charCount = value.length;
            if (charCount > 10) {
                setApellidoError("Exceso de carácteres.");
                return;
            }

            if (!/^[A-Za-z\s]*$/.test(value)) {
                setApellidoError("El apellido no debe tener números");
            } else {
                setApellidoError(null);
            }
        }
        if (name === "direccion") {
            const charCount = value.length;
            if (charCount > 25) {
                setDireccionError("Exceso de carácteres.");
                return;
            } else {
                setDireccionError(null);
            }
        }

        if (name === "telefono") {
            const numberCount = value.length;
            if (numberCount > 15) {
                setTelefonoError("Exceso de numeros")
                return;
            } else if (/[^0-9]/.test(value)) {
                setTelefonoError("Solo debe contener números.");
            }

        }

        if (name === "password") {
            if (!/(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}/.test(value)) {
                setPasswordError(<p>Debe contener una mayúscula, <br />
                    un número y un carácter especial</p>);
            } else {
                setPasswordError(null);
            }
        }


        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const [mensaje, setMensaje] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (Object.values(form).includes("") || nombreError || apellidoError || direccionError || telefonoError) {
            setError("Por favor, corrige los errores antes de enviar el formulario de registro.");
            return;
        }

        setLoading(true);

        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}api/usuario/registro`;
            const respuesta = await axios.post(url, form);
            toast.success(respuesta.data.msg)
            console.log(respuesta);
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.msg || 'Ha ocurrido un error, intentelo de nuevo')
        } finally{
            setLoading(false);
        }
    };

    return (
        <>
            <div className="container">
                <div className='engra'>
                    <img src={engranaje} alt="" className='engr' />
                    <p>
                        Registrate es gratis!
                    </p>
                </div>
                {Object.keys(mensaje).length > 0 && (
                    <div className={`message ${mensaje.tipo}`}>
                        {mensaje.respuesta}
                    </div>
                )}
                <div className="formcontainer">
                    <h1 className="title">BIENVENIDO</h1>

                    <form className='register-form' onSubmit={handleSubmit}>
                        {error && <div className='error-message'>{error}</div>}
                        
                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold" htmlFor="nombre">Nombre:</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={form.nombre || ""}
                                onChange={handleChange}
                                placeholder="Ingresa tu nombre"
                                className="input"
                            />
                            {nombreError && <p className='error-m' style={{ color: "red", fontSize: "12px" }}>{nombreError}</p>}

                        </div>

                        <div className="inp">
                            <label className="mb-2 block text-sm font-semibold" htmlFor="apellido">Apellido:</label>
                            <input
                                type="text"
                                id="apellido"
                                name="apellido"
                                value={form.apellido || ""}
                                onChange={handleChange}
                                placeholder="Ingresa tu apellido"
                                className="input"

                            />
                            {apellidoError && <p className='error-m' style={{ color: "red", fontSize: "12px" }}>{apellidoError}</p>}

                        </div>

                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold" htmlFor="direccion">Dirección</label>
                            <input
                                type="text"
                                id="direccion"
                                name="direccion"
                                value={form.direccion || ""}
                                onChange={handleChange}
                                placeholder="Ingresa tu dirección"
                                className="input"

                            />
                            {direccionError && <p className='error-m' style={{ color: "red", fontSize: "12px" }}>{direccionError}</p>}

                        </div>

                        <div className="inp">
                            <label className="mb-2 block text-sm font-semibold" htmlFor="telefono">Teléfono:</label>
                            <input
                                type="tel"
                                id="telefono"
                                name="telefono"
                                value={form.telefono || ""}
                                onChange={handleChange}
                                placeholder="Ingresa tu teléfono"
                                className="input"

                            />
                            {telefonoError && <p className='error-m' style={{ color: "red", fontSize: "12px" }}>{telefonoError}</p>}

                        </div>

                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold" htmlFor="email">Correo electrónico:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={form.email || ""}
                                onChange={handleChange}
                                placeholder="Ingresa tu correo"
                                className="input"

                            />
                        </div>

                        <div className="inp">
                            <label className="mb-2 block text-sm font-semibold" htmlFor="password">Contraseña:</label>
                            <div className="password-container">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={form.password || ""}
                                    onChange={handleChange}
                                    placeholder='Ingrese su contraseña'
                                    className="input"
                                />
                                <span className="toggle-passwordr" onClick={togglePasswordVisibility}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            {passwordError && <p className='error-m' style={{ color: "red", fontSize: "12px" }}>{passwordError}</p>}
                        </div>

                        <div className="butt-cont">
                            <button type="submit" className="btn-primary" disabled={loading}>
                                {loading ? 'Cargando...' : 'Registrarse'}
                            </button>
                        </div>

                    </form>

                    <div className="link-container">
                        <p>¿Ya tienes una cuenta?</p>
                        <Link to="/login" className="link">Iniciar sesión</Link>
                    </div>
                </div>

            </div>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={true} />
        </>
    );
};