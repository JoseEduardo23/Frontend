import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../Context/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import '../Estilos/Login.css';
import React from 'react';

const Login = () => {
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Redirigir si ya está autenticado
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validación de los campos
        if (!form.email || !form.password) {
            toast.error('Por favor completa todos los campos');
            return;
        }

        setLoading(true);
        try {
            const url = `https://tesis-agutierrez-jlincango-aviteri.onrender.com/api/login`;
            const respuesta = await axios.post(url, form);

            if (respuesta.data.token) {
                localStorage.setItem('token', respuesta.data.token);
                setAuth(respuesta.data);
                toast.success('Inicio de sesión exitoso');
                navigate('/dashboard');
            }
        } catch (error) {
            const errorMessage =
                error.response?.data?.msg || 'Ha ocurrido un error. Inténtalo de nuevo';
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
                                <label htmlFor="email" className="input-label">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    className="input-field"
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="password" className="input-label">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Tu contraseña"
                                    className="input-field"
                                />
                            </div>

                            <div className="button-group">
                                <button type="submit" className="btn-primary" disabled={loading}>
                                    {loading ? 'Cargando...' : 'Login'}
                                </button>
                            </div>
                        </form>

                        <div className="divider">
                            <hr />
                            <p className="divider-text">OR</p>
                            <hr />
                        </div>

                        <button className="btn-google">
                            
                        </button>

                        <div className="forgot-password">
                            <Link to="/forgot/id" className="forgot-link">
                                Forgot your password?
                            </Link>
                        </div>

                        <div className="register-link">
                            <p>Don't have an account?</p>
                            <Link to="/register" className="btn-secondary">
                                Register
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;