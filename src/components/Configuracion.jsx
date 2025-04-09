import { useContext, useState, useEffect } from "react";
import AuthContext from '../Context/AuthProvider';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../Estilos/Configuracion.css'
const Configuracion = () => {
    const { auth, actualizarPerfil } = useContext(AuthContext);

    const [form, setForm] = useState({
        id: auth._id,
        nombre: auth.nombre || "",
        apellido: auth.apellido || "",
        direccion: auth.direccion || "",
        telefono: auth.telefono || "",
        detalles: auth.detalles || ""
    });

    useEffect(() => {
        if (auth._id) {
            setForm({
                id: auth._id,
                nombre: auth.nombre || "",
                apellido: auth.apellido || "",
                direccion: auth.direccion || "",
                telefono: auth.telefono || "",
                detalles: auth.detalles || ""
            });
        }
    }, [auth]);

    const [loading, setLoading] = useState(false);
    const [nombreError, setNombreError] = useState(null);
    const [apellidoError, setApellidoError] = useState(null);
    const [direccionError, setDireccionError] = useState(null);
    const [telefonoError, setTelefonoError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;

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

        if (Object.values(form).includes("") || !form.id) {
            toast.error("Por favor, complete todos los campos.");
            return;
        }

        try {
            const { respuesta, tipo } = await actualizarPerfil(form);

            if (tipo) {
                toast.success(respuesta);
            } else {
                toast.error(respuesta);
            }
        } catch (error) {
            toast.error("Hubo un error al actualizar el perfil. Inténtalo nuevamente.");
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="settings-container">
                <form onSubmit={handleSubmit} className="profile-form">
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
                        className="submit-button"
                    >
                        Guardar Cambios
                    </button>
                </form>
            </div>
        </>
    );
};

export default Configuracion;