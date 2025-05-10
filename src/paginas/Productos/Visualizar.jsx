import { useNavigate, useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import box from '../../assets/producto.png'
import '../../Estilos/Visualizar.css'

const Visualizar = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [mensaje, setMensaje] = useState({});

    useEffect(() => {
        const consultarProducto = async () => {
            try {
                const token = localStorage.getItem('token');
                const url = `${import.meta.env.VITE_BACKEND_URL}api/detalle/producto/${id}`;
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

    if (mensaje.tipo === false) {
        return <div className="error-message">{mensaje.respuesta}</div>;
    }

    if (!producto) {
        return <div>Cargando...</div>; // Puedes mostrar un spinner o texto de "Cargando..." mientras se obtiene el producto
    }

    return (
        <div className="container-visualizar">
            <div>
                <h1 className='title-v'>DATOS DEL PRODUCTO</h1>
                <hr className='my-3' />
            </div>

            <div className="card-container">
                <div className="card">
                    <div className="card-image">
                        <img
                            src={producto.imagen}
                            alt={producto.nombre}
                            className="product-image" 
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