import { useContext, useState, useEffect } from "react";
import '../../Estilos/FormularioPerfil.css';
import AuthContext from '../../Context/AuthProvider';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const FormularioPerfil = () => {
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

        console.log('ID del formulario:', form.id);

        if (Object.values(form).includes("") || !form.id) {
            toast.error("Por favor, complete todos los campos.");
            return;
        }

        try {
            const resultado = await actualizarPerfil(form);
            console.log(resultado);

            if (resultado && resultado.data && resultado.data.msg) {
                toast.success(resultado.data.msg);
            }
        } catch (error) {
            toast.error("Hubo un error al actualizar el perfil. Inténtalo nuevamente.");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="form-container">
                <div>
                    <label htmlFor="nombre" className="label-form">
                        Nombre:
                    </label>
                    <input
                        id="nombre"
                        type="text"
                        className="input-form"
                        placeholder="nombre"
                        name="nombre"
                        onChange={handleChange}
                        value={form.nombre}
                    />
                </div>
                <div>
                    <label htmlFor="apellido" className="label-form">
                        Apellido:
                    </label>
                    <input
                        id="apellido"
                        type="text"
                        className="input-form"
                        placeholder="apellido"
                        name="apellido"
                        onChange={handleChange}
                        value={form.apellido}
                    />
                </div>
                <div>
                    <label htmlFor="direccion" className="label-form">
                        Dirección:
                    </label>
                    <input
                        id="direccion"
                        type="text"
                        className="input-form"
                        placeholder="direccion"
                        name="direccion"
                        onChange={handleChange}
                        value={form.direccion}
                    />
                </div>
                <div>
                    <label htmlFor="telefono" className="label-form">
                        Teléfono:
                    </label>
                    <input
                        id="telefono"
                        type="text"
                        className="input-form"
                        placeholder="telefono"
                        name="telefono"
                        onChange={handleChange}
                        value={form.telefono}
                    />
                </div>
                <div>
                    <label htmlFor="detalles" className="label-form">
                        Detalles:
                    </label>
                    <textarea
                        id="detalles"
                        className="textarea-form"
                        name="detalles"
                        onChange={handleChange}
                        value={form.detalles}
                    />
                </div>

                <input
                    type="submit"
                    className="submit-b"
                    value="Actualizar"
                />
            </form>

            <ToastContainer />
        </div>
    );
};

export default FormularioPerfil;