import { useEffect, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import axios from "axios"
import React from "react"
import { Navigate, Outlet, useNavigate, useParams } from "react-router-dom"
import Pet_table from "./Pet_tabla"
import '../../Estilos/Pet_register.css'

const Pet_register = ({ mascota }) => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        nombre: mascota?.nombre ?? "",
        raza: mascota?.raza ?? "",
        edad: mascota?.edad ?? "",
        actividad: mascota?.actividad ?? "",
        peso: mascota?.peso ?? "",
        imagen: null
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [nombreError, setNombreError] = useState(null)
    const [razaError, setRazaError] = useState(null)
    const [edadError, setEdadError] = useState(null)
    const [actividadError, setActividadError] = useState(null)
    const [pesoError, setPesoError] = useState(null)
    const [mensaje, setMensaje] = useState("")

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "nombre") {
            const charCount = value.length;
            if (charCount > 12) {
                setNombreError("Exceso de caracteres.")
                return;
            }
            if (!/^[A-Za-z\s]*$/.test(value)) {
                setNombreError("El nombre no debe tener números");
            } else {
                setNombreError(null);
            }
        }

        if (name === "raza") {
            const charCount = value.length;
            if (charCount > 15) {
                setRazaError("Exceso de caracteres.")
                return;
            }
            if (!/^[A-Za-z\s]*$/.test(value)) {
                setRazaError("La raza no debe contener numeros.");
            } else {
                setRazaError(null);
            }
        }

        if (name === "edad") {
            const numberCount = value.length;
            if (numberCount > 2 || parseInt(value) > 20) {
                setEdadError("La edad no puede ser mayor a 20")
            } else if (/[^0-9]/.test(value)) {
                setEdadError("Solo debe contener números.");
            } else {
                setEdadError(null);
            }
        }

        if (name === "peso") {
            if (parseInt(value) > 115) {
                setPesoError("Peso máximo de 115 Kg")
            } else if (/[^0-9]/.test(value)) {
                setPesoError("Solo debe contener números.");
            } else {
                setPesoError(null);
            }
        }

        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)

        if (!form.actividad) {
            setActividadError("Seleccione un nivel de actividad");
        } else {
            setActividadError(null);
        }

        if (nombreError || razaError || edadError || pesoError || !form.actividad) {
            toast.error("Por favor corrija los errores en el formulario")
            return
        }

        setLoading(true)
        try {
            const token = localStorage.getItem('token')
            if (!token) {
                setError("No se encontró token de autenticación")
                return;
            }
            const headers = {
                Authorization: `Bearer ${token}`
            }

            const formData = new FormData()

            formData.append("nombre", form.nombre);
            formData.append("raza", form.raza);
            formData.append("edad", form.edad);
            formData.append("actividad", form.actividad);
            formData.append("peso", form.peso);

            if (form.imagen) {
                formData.append("imagen", form.imagen)
            }


            if (mascota?._id) {
                const url = `${import.meta.env.VITE_BACKEND_URL}api/mascota/actualizar/${mascota._id}`
                const respuesta = await axios.put(url, formData, { headers })
                setError(null)
                toast.success(respuesta.data.msg)
                setTimeout(() => {
                    navigate("/users/dashboard/registrar_mascota");
                }, 2000);
            } else {
                const url = `${import.meta.env.VITE_BACKEND_URL}api/mascota/registro`
                const respuesta = await axios.post(url, formData, { headers })
                setError(null)
                toast.success(respuesta.data.msg)
                setForm({
                    nombre: "",
                    raza: "",
                    edad: "",
                    actividad: "",
                    peso: "",
                })
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.msg);
                toast.error(error.response.data.msg);
            } else {
                setError("Error inesperado: " + error.message);
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <ToastContainer />
            <div className="pet-container">
                {Object.keys(mensaje).length > 0 && (
                    <div className={`message ${mensaje.tipo}`}>
                        {mensaje.response}
                    </div>
                )}
                <div className="pet-formcontainer">
                    <h1 className="pet-title"> Ingrese los datos de su mascota</h1>
                    <form className="pet-form" onSubmit={handleSubmit}>
                        <div className="pet-div">
                            <label htmlFor="nombre">Nombre:</label>
                            <input type="text"
                                id="nombre"
                                name="nombre"
                                value={form.nombre}
                                onChange={handleChange}
                                placeholder="Nombre de la mascota"
                                className="pet-input"
                            />
                            {nombreError && <p className='error-m' style={{ color: "red", fontSize: "12px" }}>{nombreError}</p>}
                        </div>

                        <div className="pet-div">
                            <label htmlFor="raza">Raza:</label>
                            <input type="text"
                                id="raza"
                                name="raza"
                                value={form.raza}
                                onChange={handleChange}
                                placeholder="Raza de la mascota"
                                className="pet-input"
                            />
                            {razaError && <p className='error-m' style={{ color: "red", fontSize: "12px" }}>{razaError}</p>}
                        </div>

                        <div className="pet-div">
                            <label htmlFor="edad">Edad:</label>
                            <input type="number"
                                id="edad"
                                name="edad"
                                value={form.edad}
                                onChange={handleChange}
                                placeholder="Edad de la mascota"
                                className="pet-input"
                                min="0"
                                max="20"
                            />
                            {edadError && <p className='error-m' style={{ color: "red", fontSize: "12px" }}>{edadError}</p>}
                        </div>

                        <div className="pet-div">
                            <label htmlFor="actividad">Nivel de actividad:</label>
                            <select name="actividad"
                                id="actividad"
                                value={form.actividad}
                                onChange={handleChange}
                                className="pet-input"
                            >
                                <option value=""> --- Seleccionar ---</option>
                                <option value="Mucha">Mucha</option>
                                <option value="Normal">Normal</option>
                                <option value="Regular">Regular</option>
                                <option value="Baja">Baja</option>
                                <option value="Nula">Nula</option>
                            </select>
                            {actividadError && <p className='error-m' style={{ color: "red", fontSize: "12px" }}>{actividadError}</p>}
                        </div>

                        <div className="pet-div">
                            <label htmlFor="peso">Peso (Kg):</label>
                            <input type="number"
                                id="peso"
                                name="peso"
                                value={form.peso}
                                onChange={handleChange}
                                placeholder="Peso en Kg de la mascota"
                                className="pet-input"
                                min="0"
                                max="115"
                            />
                            {pesoError && <p className='error-m' style={{ color: "red", fontSize: "12px" }}>{pesoError}</p>}
                        </div>

                        <div className="pet-div">
                            <label htmlFor="imagen">Imagen de la mascota:</label>
                            <input type="file"
                                id="imagen"
                                name="imagen"
                                accept="image/*"
                                onChange={(e) => {
                                    setForm(prev => ({
                                        ...prev, imagen: e.target.files[0]
                                    }))
                                }}
                                className="pet-input"
                            />
                        </div>

                        <div className="pet-butt">
                            <button
                                type="submit"
                                className="pet-btn"
                                disabled={loading}
                            >
                                {loading ? "Procesando..." : (mascota?._id ? "Actualizar" : "Registrar")}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Pet_table />
        </>
    )
}

export default Pet_register;