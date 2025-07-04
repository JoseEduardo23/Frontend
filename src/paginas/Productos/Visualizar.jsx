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
                const url = `${import.meta.env.VITE_BACKEND_URL}api/producto/detalle/${id}`;
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
        return <div>Cargando...</div>;
    }

return (
  <div className="visualizar-wrapper">
    <div className="visualizar-header">
      <h1 className="visualizar-title">Detalles del Producto</h1>
      <div className="divider" />
    </div>

    <div className="visualizar-card">
      <div className="visualizar-image">
        <img src={producto.imagen} alt={producto.nombre} />
      </div>
      <div className="visualizar-info">
        <h2 className="nombre-producto">{producto.nombre}</h2>
        <p><span>Descripción:</span> {producto.descripcion}</p>
        <p><span>Precio:</span> ${producto.precio}</p>
        <p><span>Stock:</span> {producto.stock}</p>
        <p><span>Categoría:</span> {producto.categoria}</p>
      </div>
    </div>
  </div>
);
};

export default Visualizar;