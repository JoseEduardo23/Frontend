import { useEffect, useState } from "react";
import { MdInfo, MdUpdate, MdDelete } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Estilos/Tabla.css';

const Tabla = () => {
    const categorias_fijas = ['Perros', 'Gatos', 'Peces', 'Aves', 'Otros'];
    const navigate = useNavigate();
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

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

                const categoriasDeProductos = respuesta.data.map(p => p.categoria);
                const categoriasUnicas = [...new Set([...CATEGORIAS_FIJAS, ...categoriasDeProductos])];
                setCategorias(categoriasUnicas);
            }
        } catch (error) {
            toast.error();
        }
    };

    const handleDelete = async (id) => {
        try {
            const confirmar = window.confirm("¿Eliminar este producto?");
            if (!confirmar) return;

            const token = localStorage.getItem('token');
            const url = `${import.meta.env.VITE_BACKEND_URL}api/eliminar/producto/${id}`;
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            };

            await axios.delete(url, { headers });
            toast.success("Producto eliminado correctamente");

            setProductos(prevProductos => prevProductos.filter(producto => producto._id !== id));

            setCategorias(prevCategorias => {
                const productosRestantes = productos.filter(producto => producto._id !== id);
                return [...new Set(productosRestantes.map(p => p.categoria))];
            });

        } catch (error) {
            toast.error(error.response.data.msg);
            console.error(error);
        }
    };

    const volverACategorias = () => {
        setCategoriaSeleccionada(null);
    };

    useEffect(() => {
        listarProductos();
    }, []);

    if (categoriaSeleccionada) {
        const productosCategoria = productos.filter(p => p.categoria === categoriaSeleccionada);

        return (

            <div className="productos-container">
                <ToastContainer position="top-right" autoClose={3000} />
                <button onClick={volverACategorias} className="volver-btn">
                    ← Volver a categorías
                </button>
                <h2 className="categoria-titulo">{categoriaSeleccionada}</h2>

                {productosCategoria.length === 0 ? (
                    <p>No hay productos en esta categoría</p>
                ) : (
                    <table className='tabla-productos'>
                        <thead>
                            <tr>
                                <th className='tabla-celda'>N°</th>
                                <th className='tabla-celda'>Nombre</th>
                                <th className='tabla-celda'>Descripción</th>
                                <th className='tabla-celda'>Precio</th>
                                <th className='tabla-celda'>Stock</th>
                                <th className='tabla-celda'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productosCategoria.map((producto, index) => (
                                <tr className="tabla-fila" key={producto._id}>
                                    <td className='tabla-celda'>{index + 1}</td>
                                    <td className='tabla-celda'>{producto.nombre}</td>
                                    <td className='tabla-celda'>{producto.descripcion}</td>
                                    <td className='tabla-celda'>${producto.precio}</td>
                                    <td className='tabla-celda'>{producto.stock}</td>
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
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        );
    }

    return (
        <div className="categorias-container">
            <h1>Categorías de Productos</h1>
                <div className="categorias-grid">
                    {categorias_fijas.map(categoria => (
                        <div
                            key={categoria}
                            className="categoria-card"
                            onClick={() => setCategoriaSeleccionada(categoria)}
                        >
                            <div className="categoria-content">
                                <h3>{categoria}</h3>
                                <p>
                                    {productos.filter(p => p.categoria === categoria).length} productos
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
        </div>
    );
};

export default Tabla;