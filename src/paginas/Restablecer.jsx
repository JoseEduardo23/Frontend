import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


export default function Restablecer() {
    // Paso 1: Extraer el token desde los parámetros de la URL
    const { token } = useParams();
    const [tokenback, setTokenback] = useState(false); 
    const [form, setform] = useState({
        password: "",
        confirmpassword: ""
    });

    // Paso 2: Manejar cambios en los campos del formulario
    const handleChange = (e) => {
        setform({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // Paso 3: Enviar datos al backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = `http://localhost:3000/api/nuevo-password/${token}`;
            const respuesta = await axios.post(url, form);
            console.log(respuesta);
            toast.success(respuesta.data.msg);
        } catch (error) {
            console.log(error.response?.data?.msg || "Error");
            toast.error(error.response?.data?.msg || "Error al restablecer la contraseña");
        }
    };

    // Verificar token al cargar el componente
    const verifyToken = async () => {
        try {
            const url = `http://localhost:3000/api/recuperar-password/${token}`;
            const respuesta = await axios.get(url);
            console.log(respuesta.data.msg);
            toast.success(respuesta.data.msg);
            setTokenback(true); 
        } catch (error) {
            console.log(error.response?.data?.msg || "Error");
            toast.error(error.response?.data?.msg || "Token inválido o expirado");
        }
    };

    useEffect(() => {
        verifyToken();
    }, []);

    return (
        <div>
            <h1>Restablecer Contraseña</h1>
            <ToastContainer />
            {tokenback ? (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="password">Nueva Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="confirmpassword">Confirmar Contraseña</label>
                    <input
                        type="password"
                        id="confirmpassword"
                        name="confirmpassword"
                        value={form.confirmpassword}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Restablecer</button>
                </form>
            ) : (
                <p>Verificando token, por favor espera...</p>
            )}
        </div>
    );
}