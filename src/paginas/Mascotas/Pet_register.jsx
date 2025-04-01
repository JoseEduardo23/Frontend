import { useEffect, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import axios from "axios"
import React from "react"
import { Outlet, useParams } from "react-router-dom"
import Pet_table from "./Pet_tabla"
import '../../Estilos/Pet_register.css'

const Pet_register = () => {
    const [form, setForm] = useState({
        nombre: "",
        raza: "",
        edad: "",
        actividad: "",
        peso: ""
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
        const {name, value} = e.target;

        // Validación para nombre
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

        // Validación para raza
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

        // Validación para edad
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

        // Validación para peso
        if (name === "peso") {
            const numberCount = value.length;
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

        // Validación general antes de enviar
        if (nombreError || razaError || edadError || pesoError || !form.actividad) {
            toast.error("Por favor corrija los errores en el formulario")
            return
        }

        setLoading(true)
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}api/mascota/registro`
            const token = localStorage.getItem('token') // Asegúrate de que el token se guarda así
            const respuesta = await axios.post(url, form, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            toast.success(respuesta.data.msg)
            // Limpiar formulario después de éxito
            setForm({
                nombre: "",
                raza: "",
                edad: "",
                actividad: "",
                peso: ""
            })
        } catch (error) {
            toast.error(error.response?.data?.msg || "Error al registrar la mascota")
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
                            {!form.actividad && <p className='error-m' style={{ color: "red", fontSize: "12px" }}>Seleccione un nivel de actividad</p>}
                        </div>

                        <div className="pet-div">
                            <label htmlFor="peso">Peso (Kg):</label>
                            <input type="number" 
                                id="peso"
                                name="peso"
                                value={form.peso}
                                onChange={handleChange}
                                placeholder = "Peso en Kg de la mascota"
                                className="pet-input"
                                
                                min="0"
                                max="115"
                            />
                            {pesoError && <p className='error-m' style={{ color: "red", fontSize: "12px" }}>{pesoError}</p>}
                        </div>

                        <div className="pet-butt">
                            <button type="submit" className="pet-btn" disabled={loading}>
                                {loading ? 'Cargando...' : 'Registrar'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Pet_table/>
        </>
    )
}

export default Pet_register;