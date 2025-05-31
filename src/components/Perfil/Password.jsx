import { useContext, useState, useEffect } from "react";
import AuthContext from "../../Context/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Password = () => {
    const { actualizarPassword, auth } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        passwordactual: "",
        passwordnuevo: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!auth.email) {
            toast.error("Debes iniciar sesión para cambiar tu contraseña");
            return;
        }

        if (!form.passwordactual || !form.passwordnuevo) {
            toast.error("Todos los campos son obligatorios");
            return;
        }

        if (form.passwordnuevo.length < 6) {
            toast.error("La contraseña debe tener mínimo 6 caracteres");
            return;
        }

        try {
            setLoading(true);
            const resultado = await actualizarPassword(form);

            if (resultado.tipo) {
                toast.success(resultado.respuesta);
                setForm({ passwordactual: "", passwordnuevo: "" });
            } else {
                toast.error(resultado.respuesta);
            }
        } catch (error) {
            toast.error("Error al procesar la solicitud");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    return (
        <>
            <ToastContainer/>

            <div className='mt-5'>
                <h1 className='font-black text-4xl text-gray-500'>Password</h1>
                <hr className='my-4' />
                <p className='mb-2'>Este módulo te permite actualizar tu contraseña</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='passwordactual' className='text-gray-700 uppercase font-bold text-sm'>
                        Contraseña actual:
                    </label>
                    <input
                        id='passwordactual'
                        type="password"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='**************'
                        name='passwordactual'
                        value={form.passwordactual}
                        onChange={handleChange}
                        disabled={loading}
                    />
                </div>

                <div>
                    <label htmlFor='passwordnuevo' className='text-gray-700 uppercase font-bold text-sm'>
                        Nueva contraseña:
                    </label>
                    <input
                        id='passwordnuevo'
                        type="password"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='**************'
                        name='passwordnuevo'
                        value={form.passwordnuevo}
                        onChange={handleChange}
                        disabled={loading}
                    />
                </div>

                <input
                    type="submit"
                    className={`bg-gray-800 w-full p-3 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-600 cursor-pointer transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    value={loading ? 'Actualizando...' : 'Actualizar'}
                    disabled={loading}
                />
            </form>
        </>
    );
};

export default Password;