import { Formulario } from "../../components/Formulario";
import Mensaje from "../../components/Alertas/Mensaje";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
const Actualizar = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState({});
    const [mensaje, setMensaje] = useState({});

    useEffect(() => {
        const consultarProducto = async () => {
            try {
                const token = localStorage.getItem('token');
                const url = `${import.meta.env.VITE_BACKEND_URL}api/detalle/producto/${id}`;
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                };
                const respuesta = await axios.get(url, options);
    
                console.log("Respuesta completa de la API:", respuesta);
                console.log("Solo data:", respuesta.data);
    
                // Aquí asignamos directamente el objeto producto
                if (respuesta.data) {
                    setProducto(respuesta.data); // Asigna el objeto completo
                } else {
                    setMensaje({ request: "Producto no encontrado o respuesta incorrecta", tipo: false });
                }
            } catch (error) {
                setMensaje({ request: error.response?.data?.msg || "Error desconocido", tipo: false });
            }
        };
    
        consultarProducto();
    }, [id]);

    const isProductoValid = producto && Object.keys(producto).length > 0;
    const isMensajeValid = mensaje && Object.keys(mensaje).length > 0;

    return (
        <div className="act-form">
            <h1 style={{marginTop:"-250px"}}>Actualizar los datos del producto</h1>
            <hr />
            <p>El módulo te permite actualizar los datos de un producto</p>

            {
                isProductoValid ?
                    (
                        <Formulario producto={producto} />
                    )
                    :
                    (
                        isMensajeValid && <Mensaje tipo={mensaje.tipo}>{mensaje.request}</Mensaje>
                    )
            }
        </div>
    );
};

export default Actualizar;