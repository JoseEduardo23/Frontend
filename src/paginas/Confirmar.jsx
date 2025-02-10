import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Mensaje from '../components/Alertas/Mensaje'
import React from 'react'
import logoDog from '../assets/confirm.png'
import '../Estilos/Confirmar.css'


export const Confirmar = () => {
    const { token } = useParams()
    const [mensaje, setMensaje] = useState("")

    // Verificación del token
    const verifyToken = async () => {
        try {
            console.log("Token: ", token);
            const url = `${import.meta.env.VITE_BACKEND_URL}api/confirmar/${token}`;
            const respuesta = await axios.get(url);
            setMensaje({ respuesta: respuesta.data.msg, tipo: false });
            console.log(respuesta);
        } catch (error) {
            console.log("Error:", error);
            setMensaje({ respuesta: error.response?.data?.msg || "Hubo un error al confirmar el token", tipo: true });
        }
    }

    useEffect(() => {
        verifyToken() 
    }, [token])  

    return (
        <div className="confirm-container">

            {/* Mensaje de confirmación */}
            <img className="confirm-logo" src={logoDog} alt="Logo de confirmación" />

            <div className="confirm-text-container">
                {/* Mensaje principal */}
                <p className="confirm-thank-you">Muchas Gracias</p>
                <p className="confirm-message">Tu cuenta ha sido confirmada. Ya puedes iniciar sesión.</p>
                <Link to="/login" className="confirm-login-button">Ir al Login</Link>
            </div>
        </div>
    )
}
