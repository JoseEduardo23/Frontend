import { useEffect, useState } from "react";
import { MdDelete, MdInfo, MdUpdate } from "react-icons/md";
import { toast } from "react-toastify";
import axios from "axios";
import '../../Estilos/Pet_tabla.css';
import { useNavigate } from "react-router-dom";

const MascotaTabla = () => {
    const [mascotas, setMascotas] = useState([]);
    const navigate = useNavigate();

    const listarMascotas = async () => {
        try {
            const token = localStorage.getItem('token');
            const url = `${import.meta.env.VITE_BACKEND_URL}api/mascota/listar`;
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
            const respuesta = await axios.get(url, options);

            if (Array.isArray(respuesta.data)) {
                setMascotas(respuesta.data);
            } else {
                toast.warning("No hay mascotas registradas");
                setMascotas([]);
            }
        } catch (error) {
            console.log(error)
        }
    };

    const handleDelete = async (id) => {
        try {
            const confirmar = confirm("¿Estás seguro de eliminar esta mascota?");
            if (confirmar) {
                const token = localStorage.getItem('token');
                const url = `${import.meta.env.VITE_BACKEND_URL}api/mascota/eliminar/${id}`;
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                };
                await axios.delete(url, { headers });
                toast.success("Mascota eliminada correctamente.");
                listarMascotas();
            }
        } catch (error) {
            console.error('Error eliminando mascota:', error);
            toast.error(error.response?.data?.msg || "Error al eliminar la mascota.");
        }
    };

    useEffect(() => {
        listarMascotas();
    }, []);

    return (
        <>
            {mascotas.length === 0 ? (
                <div className="no-registros">
                    <p>No tienes mascotas registradas</p>
                    <p>¡Registra tu primera mascota!</p>
                </div>
            ) : (
                <table className="tabla-productos">
                    <thead>
                        <tr>
                            <th className='tabla-celda'>N°</th>
                            <th className='tabla-celda'>Nombre</th>
                            <th className='tabla-celda'>Raza</th>
                            <th className='tabla-celda'>Edad</th>
                            <th className='tabla-celda'>Peso (kg)</th>
                            <th className='tabla-celda'>Actividad</th>
                            <th className='tabla-celda'>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mascotas.map((mascota, index) => (
                            <tr className="tabla-fila" key={mascota._id}>
                                <td className='tabla-celda'>{index + 1}</td>
                                <td className='tabla-celda'>{mascota.nombre || 'Sin nombre'}</td>
                                <td className='tabla-celda'>{mascota.raza || 'No especificada'}</td>
                                <td className='tabla-celda'>{mascota.edad || '?'} años</td>
                                <td className='tabla-celda'>{mascota.peso || '?'} kg</td>
                                <td className='tabla-celda'>{mascota.actividad || 'No especificada'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default MascotaTabla;