import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import '../Estilos/Restablecer.css';
import key from '../assets/key.png'

export default function Restablecer() {
    const { token } = useParams();
    const [tokenback, setTokenback] = useState(false); 
    const [form, setform] = useState({
        password: "",
        confirmpassword: ""
    });

    const handleChange = (e) => {
        setform({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = `${VITE_URL_BACKEND}/nuevo-password/${token}`;
            const respuesta = await axios.post(url, form);
            toast.success(respuesta.data.msg);
        } catch (error) {
            toast.error(error.response?.data?.msg || "Error al restablecer la contraseña");
        }
    };

    const verifyToken = async () => {
        try {
            const url = `${URL_BACKEND}/recuperar-password/${token}`;
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
        <div className="restablecer-container">
            <h1 className="restablecer-title">Restablecer Contraseña</h1>
            <ToastContainer />
            {tokenback ? (
                <form onSubmit={handleSubmit} className="restablecer-form">
                    <label htmlFor="password" className="form-label">Nueva Contraseña</label>
                    <input
                        placeholder='Enter your new password'
                        type="password"
                        id="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                    <label htmlFor="confirmpassword" className="form-label">Confirmar Contraseña</label>
                    <input
                        type="password"
                        placeholder='Confirm you password'
                        id="confirmpassword"
                        name="confirmpassword"
                        value={form.confirmpassword}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                    <img src={key} className='key' alt="" />
                    <input className='Res-button' type="submit" value="ENVIAR"/>
                    
                </form>
            ) : (
                <p className="restablecer-message">Verificando token, por favor espera...</p>
            )}
        </div>
    );
}