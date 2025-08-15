import { useEffect, useState } from "react";
import { MdInfo, MdDelete } from "react-icons/md";
import axios from 'axios';
import '../Estilos/Tabla.css';
import { toast, ToastContainer } from "react-toastify";

const ClienteTabla = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [estadoSeleccionado, setEstadoSeleccionado] = useState(null);

    const [modalEliminarVisible, setModalEliminarVisible] = useState(false)
    const [clienteEliminar, setClienteEliminar] = useState(false)

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
                const url = `https://tesis-agutierrez-jlincango-aviteri.onrender.com/api/eliminar-usuario/${id}`;
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                };
                await axios.delete(url, { headers });
                toast.success("Usuario eliminado correctamente.");
                listarClientes();
            }
        } catch (error) {
            toast.error(error.response?.data?.msg || "Error al eliminar el usuario.");
        }
    };

    useEffect(() => {
        listarClientes();
    }, []);

    const estadosFijos = ["Activo", "Inactivo"];

    const usuariosFiltrados = usuarios.filter(usuario =>
        estadoSeleccionado === "Activo" ? usuario.estado === true :
            estadoSeleccionado === "Inactivo" ? usuario.estado === false :
                true
    );

    return (
        <div className="estado-container">
            <ToastContainer position="top-right" autoClose={3000} />
            {modalEliminarVisible && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <h2 className="modal-heading">¿Eliminar registro?</h2>
                        <p className="modal-message">¿Estás seguro de que deseas eliminar este registro?</p>
                        <div className="modal-buttons">
                            <button
                                className="modal-confirm-button"
                                onClick={() => {
                                    handleDelete(clienteEliminar);
                                    setModalEliminarVisible(false);
                                    setProductoEliminar(null);
                                }}
                            >
                                Sí, eliminar
                            </button>
                            <button
                                className="modal-close-button"
                                onClick={() => {
                                    setModalEliminarVisible(false);
                                    setProductoEliminar(null);
                                }}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {!estadoSeleccionado ? (
                <>
                    <h1>Filtrar Clientes por Estado</h1>
                    <div className="categorias-grid">
                        {estadosFijos.map(estado => (
                            <div
                                key={estado}
                                className="categoria-card"
                                onClick={() => setEstadoSeleccionado(estado)}
                            >
                                <div className="categoria-content">
                                    <h3>{estado}</h3>
                                    <p>
                                        {usuarios.filter(u =>
                                            estado === "Activo" ? u.estado === true :
                                                u.estado === false
                                        ).length} usuarios
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div>
                    <button onClick={() => setEstadoSeleccionado(null)} className="volver-btn">
                        ← Volver
                    </button>
                    <h2 className="categoria-titulo">{estadoSeleccionado}</h2>
                    {usuariosFiltrados.length === 0 ? (
                        <p>No hay usuarios {estadoSeleccionado.toLowerCase()}s registrados</p>
                    ) : (
                        <table className="tabla-productos">
                            <thead>
                                <tr>
                                    <th className='tabla-celda'>N°</th>
                                    <th className='tabla-celda'>Nombre</th>
                                    <th className='tabla-celda'>Apellido</th>
                                    <th className='tabla-celda'>Teléfono</th>
                                    <th className='tabla-celda'>Email</th>
                                    <th className='tabla-celda'>Estado</th>
                                    <th className='tabla-celda'>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuariosFiltrados.map((usuario, index) => (
                                    <tr className="tabla-fila" key={usuario._id}>
                                        <td className='tabla-celda'>{index + 1}</td>
                                        <td className='tabla-celda'>{usuario.nombre}</td>
                                        <td className='tabla-celda'>{usuario.apellido}</td>
                                        <td className='tabla-celda'>{usuario.telefono}</td> 
                                        <td className='tabla-celda'>{usuario.email}</td>
                                        <td className='tabla-celda'>
                                            <span style={{
                                                color: usuario.estado ? 'green' : 'red',
                                                fontWeight: 'bold'
                                            }}>
                                                {usuario.estado ? 'Activo' : 'Inactivo'}
                                            </span>
                                        </td>
                                        <td className='tabla-celdaI'>
                                            <MdDelete
                                                title="Eliminar"
                                                className="tabla-icono-eliminar"
                                                onClick={() => {
                                                    setClienteEliminar(usuario._id)
                                                    setModalEliminarVisible(true)
                                                }}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </div>
    );
};

export default ClienteTabla;