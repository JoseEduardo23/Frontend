import { useEffect, useState } from "react";
import { MdDeleteForever, MdNoteAdd, MdInfo, MdUpdate, MdDelete, MdUpload, MdElectricBike } from "react-icons/md";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Estilos/Tabla.css';


const Tabla = () => {
    const navigate = useNavigate();

    const [productos, setProductos] = useState([]);

    const listarProductos = async () => {
        try {
            const token = localStorage.getItem('token');
            const url = `${import.meta.env.VITE_BACKEND_URL}api/listar/productos`;
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
            const respuesta = await axios.get(url, options);
            if (Array.isArray(respuesta.data)) {
                setProductos(respuesta.data);
            } else {
                console.error("La respuesta no es un array:", respuesta.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const confirmar = confirm("Vas a eliminar un producto, ¿Estás seguro de realizar esta acción?");
            if (confirmar) {
                const token = localStorage.getItem('token');
                const url = `${import.meta.env.VITE_BACKEND_URL}api/eliminar/producto/${id}`;
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                    
                };
                const data = { salida: new Date().toString() };
                await axios.delete(url, { headers, data });
                
                listarProductos();
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        listarProductos();
    }, []);

    return (
        <>
            { productos.length === 0 ?(
                    <div className="loading"></div>
            ):( <table className='tabla-productos'>
                        <thead>
                            <tr>
                                <th className='tabla-celda'>N°</th>
                                <th className='tabla-celda'>Nombre</th>
                                <th className='tabla-celda'>Descripción</th>
                                <th className='tabla-celda'>Precio</th>
                                <th className='tabla-celda'>Stock</th>
                                <th className='tabla-celda'>Categoría</th>
                                <th className='tabla-celda'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                productos.map((producto, index) => (
                                    <tr className="tabla-fila" key={producto._id}>
                                        <td className='tabla-celda'>{index + 1}</td>
                                        <td className='tabla-celda'>{producto.nombre}</td>
                                        <td className='tabla-celda'>{producto.descripcion}</td>
                                        <td className='tabla-celda'>${producto.precio}</td>
                                        <td className='tabla-celda'>{producto.stock}</td>
                                        <td className='tabla-celda'>{producto.categoria}</td>
                                        <td className='tabla-celdaI'>
                                            <MdInfo
                                                title="Ver detalles"
                                                className="tabla-icono"
                                                onClick={() => navigate(`/dashboard/productos/visualizar/${producto._id}`)}
                                            />
                                            <MdUpdate
                                                title="Editar"
                                                className="tabla-iconoI"
                                                onClick={() => navigate(`/dashboard/productos/actualizar/${producto._id}`)}
                                            />
                                            <MdDelete
                                                title="Eliminar"
                                                className="tabla-icono-eliminar"
                                                onClick={() => { handleDelete(producto._id) }}
                                            />
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
            )}
        </>
    );
};

export default Tabla;