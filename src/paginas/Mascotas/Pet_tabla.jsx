import { useEffect, useState } from "react";
import { MdDelete, MdInfo, MdUpdate } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import '../../Estilos/Pet_tabla.css';
import petImg from '../../../src/assets/Dog-perfil.png'
import { useNavigate } from "react-router-dom";

const Pet_table = () => {
    const [mascotas, setMascota] = useState([]);
    const [modalEliminarVisible, setModalEliminarVisible] = useState(false)
    const [petEliminar, setPetEliminar] = useState(false)
    const navigate = useNavigate();

    const listarMascotas = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            const respuesta = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/mascota/listar`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (Array.isArray(respuesta.data)) {
                setMascota(respuesta.data);
            } else {
                toast.warning("No hay mascotas registradas");
                setMascota([]);
            }
        } catch (error) {
            if (error.response?.status === 401 || error.response?.status === 403) {
                localStorage.removeItem('token');
                navigate('/login');
            } else {
                toast.error("Error al cargar las mascotas");
            }
        }
    };

    const handleDelete = async (id) => {
        try {
            const confirmar = window.confirm("¿Estás seguro de eliminar esta mascota?");
            if (!confirmar) return;

            const token = localStorage.getItem('token');
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}api/mascota/eliminar/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            toast.success("Mascota eliminada correctamente");
            listarMascotas();
        } catch (error) {
            if (error.response?.status === 401 || error.response?.status === 403) {
                localStorage.removeItem('token');
                navigate('/login');
            } else {
                toast.error(error.response?.data?.msg || "Error al eliminar");
            }
        }
    };

    useEffect(() => {
        listarMascotas();
    }, []);

    return (
        <>
        <ToastContainer/>
        {modalEliminarVisible && (
                    <div className="modal-overlay">
                        <div className="modal-container">
                            <h2 className="modal-heading">¿Eliminar mascota?</h2>
                            <p className="modal-message">¿Estás seguro de que deseas eliminar este registro?</p>
                            <div className="modal-buttons">
                                <button
                                    className="modal-confirm-button"
                                    onClick={() => {
                                        handleDelete(petEliminar);
                                        setModalEliminarVisible(false);
                                        setPetEliminar(null);
                                    }}
                                >
                                    Sí, eliminar
                                </button>
                                <button
                                    className="modal-close-button"
                                    onClick={() => {
                                        setModalEliminarVisible(false);
                                        setPetEliminar(null);
                                    }}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            <div className="pet-container">
                {mascotas.length === 0 ? (
                    <div className="no-registros">
                        <p >No tienes mascotas registradas</p>
                        <p>¡Registra tu primera mascota!</p>
                    </div>
                ) : (
                    <div className="pet-cards-container">
                        {mascotas.map((mascota) => (
                            <div className="pet-card" key={mascota._id}>
                                <div className="pet-card-image">
                                    <img
                                        src={mascota.imagen || petImg}
                                    />
                                </div>

                                <div className="pet-card-content">
                                    <div className="pet-card-main-info">
                                        <h3>{mascota.nombre || 'Sin nombre'}</h3>
                                        <p><strong>Raza:</strong> {mascota.raza || 'No especificada'}</p>
                                        <p><strong>Edad:</strong> {mascota.edad || '?'} años</p>
                                    </div>
                                    <hr />
                                    <hr />
                                    <hr />
                                    <div className="pet-card-secondary-info">
                                        <p><strong>Actividad:</strong> {mascota.actividad || 'No especificada'}</p>
                                        <p><strong>Peso:</strong> {mascota.peso || '?'} kg</p>
                                    </div>

                                    <div className="pet-card-actions">
                                        <button
                                            className="pet-action-btn pet-info"
                                            onClick={() => navigate(`/users/dashboard/visualizar/mascota/${mascota._id}`)}
                                            title="Ver detalles"
                                        >
                                            <MdInfo />
                                        </button>

                                        <button
                                            className="pet-action-btn pet-update"
                                            onClick={() => navigate(`/users/dashboard/actualizar/mascota/${mascota._id}`)}
                                            title="Editar"
                                        >
                                            <MdUpdate />
                                        </button>

                                        <button
                                            className="pet-action-btn pet-delete"
                                            onClick={() =>{
                                                setPetEliminar(mascota._id)
                                                setModalEliminarVisible(true)
                                            }}
                                            title="Eliminar"
                                        >
                                            <MdDelete />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default Pet_table;