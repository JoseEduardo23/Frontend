import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Mensaje from '../components/Alertas/Mensaje';
import '../Estilos/Visualizar.css'

const Visualizar = () => {
    const { id } = useParams(); // Obtenemos el id del producto desde la URL
    const [producto, setProducto] = useState(null); // Inicializamos con `null` para verificar si cargamos los datos
    const [mensaje, setMensaje] = useState({});

    // Función para formatear la fecha (si es necesario)
    const formatearFecha = (fecha) => {
        const nuevaFecha = new Date(fecha);
        nuevaFecha.setMinutes(nuevaFecha.getMinutes() + nuevaFecha.getTimezoneOffset());
        return new Intl.DateTimeFormat('es-EC', { dateStyle: 'long' }).format(nuevaFecha);
    };

    // Llamada a la API para obtener los datos del producto
    useEffect(() => {
        const consultarProducto = async () => {
            try {
                const token = localStorage.getItem('token');
                const url = `http://localhost:3000/api/detalle/producto/${id}`;
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                };
                const respuesta = await axios.get(url, options);
                setProducto(respuesta.data); 
            } catch (error) {
                setMensaje({ respuesta: error.response?.data?.msg || 'Error inesperado', tipo: false });
            }
        };
        
        if (id) {
            consultarProducto(); // Solo consultamos el producto si el id está disponible
        }
    }, [id]); // El useEffect se ejecuta cada vez que el id cambie


    if (!producto) {
        return <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>;
    }

    return (
        <div className="container">
            <div>
                <h1 className='font-black text-4xl text-gray-500'>Visualizar Producto</h1>
                <hr className='my-4' />
                <p className='mb-8'>Este apartado te permite ver los datos del producto</p>
            </div>

            <div className="card-container">
                <div className="card">
                    <div className="card-image">
                        <img
                            src={producto.imagen || "https://cdn-icons-png.flaticon.com/512/2138/2138440.png"}
                            alt="Imagen del producto"
                            className="h-80 w-80"
                        />
                    </div>
                    <div className="card-details">
                        <h2>{producto.nombre}</h2>
                        <p><strong>Descripción:</strong> {producto.descripcion}</p>
                        <p><strong>Precio:</strong> ${producto.precio}</p>
                        <p><strong>Stock:</strong> {producto.stock}</p>
                        <p><strong>Categoría:</strong> {producto.categoria}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Visualizar;