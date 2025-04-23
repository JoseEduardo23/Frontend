import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import '../../Estilos/Pet_visualizar.css'
import axios from "axios";
import iconPets from '../../assets/IconPet.png'

const Pet_visualizar = () => {
    const { id } = useParams()
    const [mascota, setMascota] = useState(null)
    const [mensaje, setMensaje] = useState([])

    useEffect(() => {
        const consultarMascota = async () => {
            try {
                const token = localStorage.getItem('token')
                const url = `${import.meta.env.VITE_BACKEND_URL}api/mascota/listar/${id}`
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const respuesta = await axios.get(url, options);
                setMascota(respuesta.data)
            } catch (error) {
                toast.error(error.response.data.msg)
            }
        }
        if (id) {
            consultarMascota();
        }
    }, [id])
    if (!mascota) {
        return <div>Cargando ...</div>;
    }
    return (
        <>
            <ToastContainer />
            <div className="pet-visualizar">
                <div className="header-section">
                    <h1 className="pet-title">Datos de {mascota.nombre}</h1>
                    <div className="divider"></div>
                </div>

                <div className="pet-profile-container">
                    <div className="pet-info-column">
                        <div className="info-card">
                            <div className="info-group">
                                <span className="info-label">Nombre</span>
                                <span className="info-value">{mascota.nombre}</span>
                            </div>
                            <div className="info-group">
                                <span className="info-label">Raza</span>
                                <span className="info-value">{mascota.raza}</span>
                            </div>
                            <div className="info-group">
                                <span className="info-label">Edad</span>
                                <span className="info-value">{mascota.edad} años</span>
                            </div>
                            <div className="info-group">
                                <span className="info-label">Actividad</span>
                                <span className="info-value">{mascota.actividad}</span>
                            </div>
                            <div className="info-group">
                                <span className="info-label">Peso</span>
                                <span className="info-value">{mascota.peso} kg</span>
                            </div>
                        </div>
                    </div>

                    <div className="pet-image-column">
                        <div className="image-frame">
                            <img
                                src={iconPets}
                                alt={`Foto de ${mascota.nombre}`}
                                className="pet-profile-image"
                            />
                            <div className="image-overlay"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Pet_visualizar;