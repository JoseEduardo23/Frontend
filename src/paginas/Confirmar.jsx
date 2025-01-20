import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Mensaje from '../components/Alertas/Mensaje';
import logoDog from '../assets/fondo1.jpg';
import '../Estilos/Confirmar.css';

export const Confirmar = () => {
    const { token } = useParams();
    const [mensaje, setMensaje] = useState("");
    const navigate = useNavigate();

    // Verificar el token cuando se monte el componente
    const verifyToken = async () => {
        try {
            const url = `http://localhost:3000/api/confirmar-token/${token}`;
            const respuesta = await axios.get(url);
            // Si la verificación fue exitosa, mostramos el mensaje de éxito
            setMensaje({ respuesta: respuesta.data.msg, tipo: false });
            navigate('restablecer')
        }
        catch (error) {
            console.log(error);
            // Si hay un error, mostramos el mensaje de error
            setMensaje({ respuesta: error.response?.data?.msg || "Hubo un error al confirmar el token", tipo: true });
        }
    };

    useEffect(() => {
        verifyToken();
    }, [token, navigate]);

    return (
        <div className="confirm-container">
            {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
            
            <img className="confirm-logo" src={logoDog} alt="image description" />
            
            <div className="confirm-text-container">
                {/* Mensaje de confirmación o error */}
                {mensaje.tipo === false ? (
                    <div>
                        <p className="confirm-thank-you">Muchas Gracias</p>
                        <p className="confirm-message">Tu cuenta ha sido confirmada. Ya puedes iniciar sesión.</p>
                        <Link to="/login" className="confirm-login-button">Ir al Login</Link>
                    </div>
                ) : (
                    <div>
                        <p className="confirm-thank-you">Lo siento, ocurrió un error al confirmar tu cuenta.</p>
                        <p className="confirm-message">{mensaje.respuesta}</p>
                    </div>
                )}
            </div>
        </div>
    );
};