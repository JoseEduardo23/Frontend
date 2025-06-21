import { useContext, useState, useEffect } from "react";
import AuthContext from '../Context/AuthProvider';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../Estilos/Configuracion.css'
import { useNavigate } from "react-router-dom";
import React, { useRef } from "react";

const Configuracion = () => {
    const navigate = useNavigate();
    const { auth, actualizarPerfil } = useContext(AuthContext);
    const fileInputRef = useRef(null);
    const [previewImage, setPreviewImage] = useState(auth.imagen?.url || null);

    const [form, setForm] = useState({
        id: auth._id,
        nombre: auth.nombre || "",
        apellido: auth.apellido || "",
        direccion: auth.direccion || "",
        telefono: auth.telefono || "",
        detalles: auth.detalles || "",
        imagen: null
    });

    useEffect(() => {
        if (auth._id) {
            setForm({
                id: auth._id,
                nombre: auth.nombre || "",
                apellido: auth.apellido || "",
                direccion: auth.direccion || "",
                telefono: auth.telefono || "",
                detalles: auth.detalles || "",
                imagen: null
            });
            setPreviewImage(auth.imagen?.url || null)
        }
    }, [auth]);

    const [loading, setLoading] = useState(false);
    const [nombreError, setNombreError] = useState(null);
    const [apellidoError, setApellidoError] = useState(null);
    const [direccionError, setDireccionError] = useState(null);
    const [telefonoError, setTelefonoError] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === 'file') {
            const file = files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreviewImage(reader.result);
                };
                reader.readAsDataURL(file);

                setForm(prev => ({
                    ...prev,
                    imagen: file
                }));
            }
            return;
        }

        if (name === "nombre") {
            const charCount = value.length;
            if (charCount > 10) {
                setNombreError("Exceso de carácteres.");
                return;
            }

            if (!/^[A-Za-z\s]*$/.test(value)) {
                setNombreError("El nombre no debe tener números");
            } else {
                setNombreError(null);
            }
        }

        if (name === "apellido") {
            const charCount = value.length;
            if (charCount > 10) {
                setApellidoError("Exceso de carácteres.");
                return;
            }

            if (!/^[A-Za-z\s]*$/.test(value)) {
                setApellidoError("El apellido no debe tener números");
            } else {
                setApellidoError(null);
            }
        }

        if (name === "direccion") {
            const charCount = value.length;
            if (charCount > 25) {
                setDireccionError("Exceso de carácteres.");
                return;
            } else {
                setDireccionError(null);
            }
        }

        if (name === "telefono") {
            const numberCount = value.length;
            if (numberCount > 15) {
                setTelefonoError("Exceso de numeros");
                return;
            } else if (/[^0-9]/.test(value)) {
                setTelefonoError("Solo debe contener números.");
            } else {
                setTelefonoError(null);
            }
        }

        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!auth._id || typeof auth._id !== 'string' || auth._id.length !== 24) {
            toast.error("ID de usuario inválido");
            return;
        }
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('id', auth._id);
            for (const key in form) {
                if (form[key] !== null) {
                    formData.append(key, form[key]);
                }
            }

            const { respuesta, tipo } = await actualizarPerfil(formData);

            if (tipo) {
                toast.success(respuesta);
                setTimeout(() => {
                    navigate("/users/dashboard");
                }, 2000);
            } else {
                toast.error(respuesta);
            }
        } catch (error) {
            toast.error("Hubo un error al actualizar el perfil. Inténtalo nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="settings-container">
                <form onSubmit={handleSubmit} className="profile-form">
                    <div className="form-group">
                        <label htmlFor="imagen" className="form-label">
                            Imagen de perfil:
                        </label>
                        <div className="image-upload-container">
                            <div className="image-preview-container">
                                {previewImage && (
                                    <img
                                        src={previewImage}
                                        alt="Vista previa"
                                        className="profile-image-preview"
                                    />
                                )}
                            </div>

                            <input
                                type="file"
                                id="imagen"
                                name="imagen"
                                ref={fileInputRef}
                                onChange={handleChange}
                                accept="image/*"
                                className="hidden"
                            />

                            <label
                                htmlFor="imagen"
                                className="image-upload-label bg-blue-500 text-white px-4 py-2 rounded cursor-pointer inline-block hover:bg-blue-600"
                            >
                                {previewImage ? 'Cambiar imagen' : 'Seleccionar imagen'}
                            </label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="firstName" className="form-label">
                            Nombre:
                        </label>
                        <input
                            id="firstName"
                            type="text"
                            className="form-input"
                            placeholder="Ingresa tu nombre"
                            name="nombre"
                            onChange={handleChange}
                            value={form.nombre}
                        />
                        {nombreError && <p className='error-m' style={{ color: "red", fontSize: "12px" }}>{nombreError}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastName" className="form-label">
                            Apellido:
                        </label>
                        <input
                            id="lastName"
                            type="text"
                            className="form-input"
                            placeholder="Ingresa tu apellido"
                            name="apellido"
                            onChange={handleChange}
                            value={form.apellido}
                        />
                        {apellidoError && <p className='error-m' style={{ color: "red", fontSize: "12px" }}>{apellidoError}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="address" className="form-label">
                            Dirección:
                        </label>
                        <input
                            id="address"
                            type="text"
                            className="form-input"
                            placeholder="Ingresa tu dirección"
                            name="direccion"
                            onChange={handleChange}
                            value={form.direccion}
                        />
                        {direccionError && <p className='error-m' style={{ color: "red", fontSize: "12px" }}>{direccionError}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone" className="form-label">
                            Teléfono:
                        </label>
                        <input
                            id="phone"
                            type="text"
                            className="form-input"
                            placeholder="Ingresa tu teléfono"
                            name="telefono"
                            onChange={handleChange}
                            value={form.telefono}
                        />
                        {telefonoError && <p className='error-m' style={{ color: "red", fontSize: "12px" }}>{telefonoError}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="details" className="form-label">
                            Detalles:
                        </label>
                        <textarea
                            id="details"
                            className="form-textarea"
                            placeholder="Información adicional"
                            name="detalles"
                            onChange={handleChange}
                            value={form.detalles}
                            rows="4"
                        />
                    </div>

                    <button
                        type="submit"
                        className="submit-button-p"
                    >
                        Guardar Cambios
                    </button>
                </form>
            </div>
        </>
    );
};

export default Configuracion;