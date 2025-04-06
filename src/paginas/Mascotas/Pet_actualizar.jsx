import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Mensaje from "../../components/Alertas/Mensaje";
import axios from "axios";
import Pet_register from "./Pet_register";

const Pet_actualizar = () => {
    const { id } = useParams();
    const [mascota, setMascota] = useState(null); 
    const [mensaje, setMensaje] = useState({});

    useEffect(() => {
        const consultarMascota = async() => {
            try {
                const token = localStorage.getItem('token')
                const url = `${import.meta.env.VITE_BACKEND_URL}api/mascota/listar/${id}`;
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const respuesta = await axios.get(url, options)

                if(respuesta.data) {
                    setMascota(respuesta.data)
                } else {
                    setMensaje({request: "Mascota no encontrada", tipo: false})
                }
            } catch(error) {
                setMensaje({request: error.response?.data?.msg || "Error al cargar mascota", tipo: false})
            }
        }
        consultarMascota();
    }, [id])

    return (
        <div>
            <h1>Actualiza los datos de tu mascota</h1>
            <hr />
            {mascota ? (
                <Pet_register mascota={mascota} isUpdate={true} id={id} />
            ) : (
                Object.keys(mensaje).length > 0 && 
                <Mensaje tipo={mensaje.tipo}>{mensaje.request}</Mensaje>
            )}
        </div>
    )
}

export default Pet_actualizar;