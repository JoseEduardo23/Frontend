import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../Estilos/Formulario.css'
import { ToastContainer, toast } from 'react-toastify';

export const Formulario = ({ producto }) => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        nombre: producto?.nombre ?? "",
        descripcion: producto?.descripcion ?? "",
        precio: producto?.precio ?? "",
        stock: producto?.stock ?? "",
        categoria: producto?.categoria ?? "",
        imagen: null,
    });
    const [error, setError] = useState(null);
    const [nombreError, setNombreError] = useState(null);
    const [descripcionError, setDescripcionError] = useState(null);
    const [precioError, setPrecioError] = useState(null);
    const [stockError, setStockError] = useState(null);
    const [categoriaError, setCategoriaError] = useState(null)


    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "nombre") {
            if (!/^[A-Za-z\s]*$/.test(value)) {
                setNombreError("El nombre no puede contener números ni caracteres especiales.");
            } else if (value.trim() === "") {
                setNombreError("Campo vacío.");
            } else {
                setNombreError(null);
            }
        }

        if (name === "descripcion") {
            const charCount = value.length;
            if (charCount > 70) {
                setDescripcionError("La descripción no puede tener más de 50 letras.");
            } else if (value.trim() === "") {
                setDescripcionError("Campo vacío.");
            } else {
                setDescripcionError(null);
            }
        }

        if (name === "precio") {
            const precio = parseFloat(value);
            if (isNaN(precio) || precio <= 0 || precio > 100) {
                setPrecioError("Ingrese un valor válido (entre 0 y 100).");
            } else {
                setPrecioError(null);
            }
        }

        if (name === "stock") {
            const stock = parseFloat(value);
            if (isNaN(stock) || stock < 0 || stock > 70) {
                setStockError("Ingrese un valor entre 0 y 70");
            } else {
                setStockError(null);
            }
        }

        if (name === "categoria") {
            const charCount = value.length;
            if (charCount > 15) {
                setCategoriaError("La categoria no puede tener más de 15 letras.");
                return;
            }
            else if (/\d/.test(value)) {
                setCategoriaError("La categoría no puede contener números.");
            } else if (value.trim() === "") {
                setCategoriaError("Ingrese una categoría válida.");
            } else {
                setCategoriaError(null);
            }
        }



        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (
            Object.values(form).includes("") ||
            nombreError ||
            descripcionError ||
            precioError ||
            stockError ||
            categoriaError
        ) {
            setError("Por favor, corrige los errores antes de enviar el formulario.");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("No se encontró el token dentro del almacenamiento local");
                return;
            }

            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const formData = new FormData();
            formData.append("nombre", form.nombre);
            formData.append("descripcion", form.descripcion);
            formData.append("precio", String(form.precio));
            formData.append("stock", String(form.stock));
            formData.append("categoria", form.categoria);

            if (form.imagen) {
                formData.append("imagen", form.imagen);
            }

            if (producto?._id) {
                const url = `${import.meta.env.VITE_BACKEND_URL}api/producto/actualizar/${producto._id}`;
                await axios.put(url, formData, { headers });
                toast.success("Producto actualizado correctamente");
                navigate("/dashboard/productos/listar");
            } else {
                const url = `${import.meta.env.VITE_BACKEND_URL}api/producto/crear`;
                await axios.post(url, formData, { headers });
                toast.success("Producto creado correctamente");
                setForm({
                    nombre: "",
                    descripcion: "",
                    precio: "",
                    stock: "",
                    categoria: "",
                    imagen: null,
                });
            }
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data);
                setError(error.response.data.msg);
                toast.error(error.response.data.msg);
            } else {
                setError("Error inesperado: " + error.message);
            }
        }
    };
    return (
        <form onSubmit={handleSubmit} className="formulario">
            <ToastContainer />
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
                <label className="form-label">Nombre del producto:</label>
                <input
                    className="form-inputp"
                    id="nombre"
                    type="text"
                    placeholder=""
                    name="nombre"
                    onChange={handleChange}
                    value={form.nombre || ""}
                />
                {nombreError && <p style={{ color: "red", fontSize: "14px" }}>{nombreError}</p>}
            </div>

            <div className="form-group">
                <label className="form-label">Descripción del producto:</label>
                <textarea
                    className="form-textareap"
                    id="descripcion"
                    placeholder="Ingresa una pequeña descripción"
                    name="descripcion"
                    onChange={handleChange}
                    value={form.descripcion || ""}
                />
                {descripcionError && <p style={{ color: "red", fontSize: "14px" }}>{descripcionError}</p>}
            </div>

            <div className="form-group">
                <label className="form-label">Precio del producto:</label>
                <input
                    className="form-inputp"
                    id="precio"
                    type="number"
                    placeholder="$"
                    name="precio"
                    onChange={handleChange}
                    value={form.precio || ""}
                />
                {precioError && <p style={{ color: "red", fontSize: "14" }}>{precioError}</p>}
            </div>

            <div className="form-group">
                <label className="form-label">Stock:</label>
                <input
                    className="form-inputp"
                    id="stock"
                    type="number"
                    name="stock"
                    onChange={handleChange}
                    value={form.stock || ""}
                />
                {stockError && <p style={{ color: "red", fontSize: "14" }}>{stockError}</p>}
            </div>

            <div className="form-group">
                <label className="form-label">Categoría del producto:</label>
                <select
                    className="form-inputp"
                    id="categoria"
                    name="categoria"
                    onChange={handleChange}
                    value={form.categoria || ""}
                >
                    <option value="">Seleccione una categoría</option>
                    <option value="Perros">Perros</option>
                    <option value="Gatos">Gatos</option>
                    <option value="Aves">Aves</option>
                    <option value="Peces">Peces</option>
                    <option value="Otros">Otros</option>
                </select>
                {categoriaError && <p style={{ color: "red", fontSize: "14px" }}>{categoriaError}</p>}
            </div>

            <div className="form-group">
                <label htmlFor="" className="form-label">Imagen del producto:</label>
                <input
                    type="file"
                    className="form-input"
                    id="imagen"
                    accept="image/*"
                    name="imagen"
                    onChange={(e) => {
                        setForm(prev => ({
                            ...prev, imagen: e.target.files[0]
                        }))
                    }}
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