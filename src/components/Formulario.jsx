import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../Estilos/Formulario.css'
import { ToastContainer, toast } from 'react-toastify';
import dotenv from 'dotenv'
dotenv.config()

export const Formulario = ({ producto }) => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        nombre: producto?.nombre ?? "",
        descripcion: producto?.descripcion ?? "",
        precio: producto?.precio ?? "",
        stock: producto?.stock ?? "",
        categoria: producto?.categoria ?? "",
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); 

        if (Object.values(form).includes("")) {
            setError("Todos los campos son obligatorios");
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError("No se encontró el token dentro del almacenamiento local");
                return;
            }

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };

            if (producto?._id) {
                // Actualizar producto
                const url = `${URL_BACKEND}/actualizar/producto/${producto._id}`;
                await axios.put(url, form, { headers });
                console.log("Producto actualizado correctamente");
                toast.success("Producto actualizado correctamente")
            } else {
                // Crear producto
                const url = `${URL_BACKEND}/crear/producto`;
                await axios.post(url, form, { headers });
                console.log("Producto creado correctamente");
                toast.success("Producto creado correctamente")
            }

            navigate("/dashboard/listar");
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.msg); 
                console.error("Error del servidor: ", error.response.data.msg);
                toast.error(errorMessage);
            } else {
                setError("Error inesperado: " + error.message);
                console.error("Error inesperado:", error.message);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="formulario">
            <ToastContainer/>
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
                <label className="form-label">Nombre del producto:</label>
                <input
                    className="form-input"
                    id="nombre"
                    type="text"
                    placeholder="nombre del producto"
                    name="nombre"
                    onChange={handleChange}
                    value={form.nombre || ""}
                />
            </div>

            <div className="form-group">
                <label className="form-label">Descripción del producto:</label>
                <textarea
                    className="form-textarea"
                    id="descripcion"
                    placeholder="Descripcion del producto"
                    name="descripcion"
                    onChange={handleChange}
                    value={form.descripcion || ""}
                />
            </div>

            <div className="form-group">
                <label className="form-label">Precio del producto:</label>
                <input
                    className="form-input"
                    id="precio"
                    type="number"
                    placeholder="precio del producto"
                    name="precio"
                    onChange={handleChange}
                    value={form.precio || ""}
                />
            </div>

            <div className="form-group">
                <label className="form-label">Stock:</label>
                <input
                    className="form-input"
                    id="stock"
                    type="number"
                    name="stock"
                    onChange={handleChange}
                    value={form.stock || ""}
                />
            </div>

            <div className="form-group">
                <label className="form-label">Categoría del producto:</label>
                <input
                    className="form-input"
                    id="categoria"
                    type="text"
                    name="categoria"
                    onChange={handleChange}
                    value={form.categoria || ""}
                />
            </div>

            

            <input
                className="form-submit"
                type="submit"
                value={producto?._id ? "Actualizar" : "Registrar"}
            />
        </form>
    );
};