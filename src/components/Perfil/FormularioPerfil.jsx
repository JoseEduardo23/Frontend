import { useContext, useState, useEffect } from "react";
import '../../Estilos/FormularioPerfil.css';
import AuthContext from '../../Context/AuthProvider';

const FormularioPerfil = () => {
    const { auth, actualizarPerfil } = useContext(AuthContext);

    const [form, setForm] = useState({
        id: "",
        nombre: "",
        apellido: "",
        direccion: "",
        telefono: "",
        detalles: ""
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
            return;
        }

        const resultado = await actualizarPerfil(form);
        console.log(resultado)
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <div>
                <label htmlFor="nombre" className="form-label">
                    Nombre:
                </label>
                <input
                    id="nombre"
                    type="text"
                    className="form-input placeholder-gray"
                    placeholder="nombre"
                    name="nombre"
                    onChange={handleChange}
                    value={form.nombre}
                />
            </div>
            <div>
                <label htmlFor="apellido" className="form-label">
                    Apellido:
                </label>
                <input
                    id="apellido"
                    type="text"
                    className="form-input placeholder-gray"
                    placeholder="apellido"
                    name="apellido"
                    onChange={handleChange}
                    value={form.apellido}
                />
            </div>
            <div>
                <label htmlFor="direccion" className="form-label">
                    Dirección:
                </label>
                <input
                    id="direccion"
                    type="text"
                    className="form-input placeholder-gray"
                    placeholder="direccion"
                    name="direccion"
                    onChange={handleChange}
                    value={form.direccion}
                />
            </div>
            <div>
                <label htmlFor="telefono" className="form-label">
                    Teléfono:
                </label>
                <input
                    id="telefono"
                    type="text"
                    className="form-input placeholder-gray"
                    placeholder="telefono"
                    name="telefono"
                    onChange={handleChange}
                    value={form.telefono}
                />
            </div>
            <div>
                <label htmlFor="detalles" className="form-label">
                    Detalles:
                </label>
                <textarea
                    id="detalles"
                    className="form-textarea placeholder-gray"
                    name="detalles"
                    onChange={handleChange}
                    value={form.detalles}
                />
            </div>

            <input
                type="submit"
                className="submit-btn"
                value="Actualizar"
            />
        </form>
    );
};

export default FormularioPerfil;