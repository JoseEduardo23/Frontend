import { useNavigate, useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import box from '../assets/producto.png'
import Mensaje from '../components/Alertas/Mensaje';
import '../Estilos/Visualizar.css'

const Visualizar = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [mensaje, setMensaje] = useState({});

    const formatearFecha = (fecha) => {
        const nuevaFecha = new Date(fecha);
        nuevaFecha.setMinutes(nuevaFecha.getMinutes() + nuevaFecha.getTimezoneOffset());
        return new Intl.DateTimeFormat('es-EC', { dateStyle: 'long' }).format(nuevaFecha);
    };

    useEffect(() => {
        const consultarProducto = async () => {
            try {
                const token = localStorage.getItem('token');
                const url = `${VITE_URL_BACKEND}/detalle/producto/${id}`;
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
            consultarProducto();
        }
    }, [id]);

    if (!producto) {
        return <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>;
    }

    return (
        <div className="container-visualizar">
            <div>
                <h1 className='font-black text-4xl text-gray-500'>Visualizar Producto</h1>
                <hr className='my-4' />
                <p className='mb-8'>Datos del producto</p>
            </div>

            <div className="card-container">
                <div className="card">
                    <div className="card-image">
                        <img
                            src={box}
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
            <Link to="/Listar">
                <button>Regresar</button>
            </Link>
        </div>
    );
};

export default Visualizar;