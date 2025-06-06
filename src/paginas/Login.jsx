import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../Context/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import '../Estilos/Login.css';
import React from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa"


const Login = () => {
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/dashboard');
        }
    }, [navigate]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.email || !form.password) {
            toast.error('Por favor completa todos los campos');
            return;
        }

        setLoading(true);
        
        try {
            // Primero intentamos como administrador
            try {
                const adminResponse = await axios.post(
                    'https://tesis-agutierrez-jlincango-aviteri.onrender.com/api/login', 
                    form
                );

                if (adminResponse.data.token) {
                    localStorage.setItem('token', adminResponse.data.token);
                    localStorage.setItem('rol', 'Administrador');
                    setAuth({ 
                        ...adminResponse.data,
                        rol: 'Administrador' 
                    });
                    toast.success('Inicio de sesión exitoso como Administrador');
                    navigate('/dashboard');
                    return;
                }
            } catch (adminError) {
                
                const userResponse = await axios.post(
                    'https://tesis-agutierrez-jlincango-aviteri.onrender.com/api/usuario/login', 
                    form
                );

                if (userResponse.data.token) {
                    localStorage.setItem('token', userResponse.data.token);
                    localStorage.setItem('rol', 'Usuario');
                    setAuth({ 
                        ...userResponse.data,
                        rol: 'Usuario' 
                    });
                    toast.success('Inicio de sesión exitoso como Usuario');
                    navigate('/users/dashboard');
                    return;
                }
            }

            // Si ninguna de las dos funciona
            toast.error('Credenciales incorrectas o usuario no encontrado');
            
        } catch (error) {
            const errorMessage = error.response?.data?.msg || 
                'Ha ocurrido un error. Inténtalo de nuevo';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <ToastContainer />
            <div className="login-container">
                <div className="login-image"></div>
                <div className="login-form-container">
                    <div className="login-form">
                        <h1 className="login-title">BIENVENIDO</h1>
                        <small className="login-subtitle">
                            Bienvenido de vuelta, por favor ingresa tus datos.
                        </small>

                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <label htmlFor="email" className="input-label">Correo electrónico</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Ingresa tu correo electrónico."
                                    className="input-field"
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="password" className="input-label">Contraseña</label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Ingresa tu contraseña."
                                    className="input-field"
                                />
                                <span className='toggler-passwordl' onClick={togglePasswordVisibility}>
                                    {showPassword ? <FaEyeSlash/> : <FaEye />}
                                </span>
                            </div>

                            <div className="button-group">
                                <button type="submit" className="btn-primary" disabled={loading}>
                                    {loading ? 'Cargando...' : 'Iniciar sesión'}
                                </button>
                            </div>
                        </form>

                        <div className="divider">
                            <hr />
                            <p className="divider-text">O</p>
                            <hr />
                        </div>

                        <button className="btn-google">

                        </button>

                        <div className="forgot-password">
                            <Link to="/forgot/id" className="forgot-link">
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </div>

                        <div className="register-link">
                            <p>¿No tienes una cuenta?</p>
                            <Link to="/registro" className="btn-secondary">
                                Registro
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;