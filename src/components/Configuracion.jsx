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

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
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

            <ToastContainer />
        </div>
    );
};
export default Configuracion;