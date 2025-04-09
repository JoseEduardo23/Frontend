import { useEffect, useState } from "react";
import { MdInfo, MdDelete } from "react-icons/md";
import axios from 'axios';
import '../Estilos/Tabla.css';
import { toast } from "react-toastify";

const Cliente_tabla = () => {
    const [usuarios, setUsuarios] = useState([]);

    const listarClientes = async () => {
        try {
            const token = localStorage.getItem('token');
            const url = `${import.meta.env.VITE_BACKEND_URL}api/usuarios`;
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
            const respuesta = await axios.get(url, options);

            if (Array.isArray(respuesta.data)) {
                setUsuarios(respuesta.data);
            } else {
                toast.error("Error al obtener los datos.");
            }
        } catch (error) {
            toast.error(error.response?.data?.msg || "Error al obtener los datos.");
        }
    };

    const handleDelete = async (id) => {
        try {
            const confirmar = confirm("¿Vas a eliminar el registro de este usuario?");
            if (confirmar) {
                const token = localStorage.getItem('token');
                const url = `https://tesis-agutierrez-jlincango-aviteri.onrender.com/api/usuario/eliminar/${id}`;
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                };
                await axios.delete(url, { headers });
                toast.success("Usuario eliminado correctamente.");
                listarClientes(); 
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error(error.response?.data?.msg || "Error al eliminar el usuario.");
        }
    };

    useEffect(() => {
        listarClientes();
    }, []);

    return (
        <>
            {usuarios.length === 0 ? (
                <div className="loading"></div>
            ) : (
                <table className="tabla-productos">
                    <thead>
                        <tr>
                            <th className='tabla-celda'>N°</th>
                            <th className='tabla-celda'>Nombre</th>
                            <th className='tabla-celda'>Apellido</th>
                            <th className='tabla-celda'>Direccion</th>
                            <th className='tabla-celda'>Telefono</th>
                            <th className='tabla-celda'>Email</th>
                            <th className='tabla-celda'>Estado</th>
                            <th className='tabla-celda'>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario, index) => (
                            <tr className="tabla-fila" key={usuario._id}>
                                <td className='tabla-celda'>{index + 1}</td>
                                <td className='tabla-celda'>{usuario.nombre}</td>
                                <td className='tabla-celda'>{usuario.apellido}</td>
                                <td className='tabla-celda'>{usuario.direccion}</td>
                                <td className='tabla-celda'>{usuario.telefono}</td>
                                <td className='tabla-celda'>{usuario.email}</td>
                                <td className='tabla-celda'>{usuario.estado}</td>
                                <td className='tabla-celdaI'>

                                    <MdDelete
                                        className="tabla-icono-eliminar"
                                        onClick={() => handleDelete(usuario._id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default Cliente_tabla;