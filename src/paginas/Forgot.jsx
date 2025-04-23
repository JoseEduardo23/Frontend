import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import '../Estilos/Forgot.css'
import React from 'react'

export const Forgot = () => {
    
    const [mail, setMail] = useState({})
    const [isModalVisible, setIsModalVisible] = useState(false)

    const handleChange = (e) => {
        setMail({
            ...mail,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}api/usuario/recuperar-password`
            const respuesta = await axios.post(url, mail)
            setIsModalVisible(true)
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.msg)
        }
    }

    const closeModal = () => {
        setIsModalVisible(false)
    }

    return (
        <>
            <ToastContainer />
            <div className="forgot-container">
                <div className="forgot-form-container">
                    <h1 className="forgot-heading">Perdite tu contraseña!</h1>
                    <small className="forgot-subheading">No te preocupes, ingresa tu correo electrónico</small>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-1">
                            <label className="mb-2 block text-sm font-semibold">Email</label>
                            <input name="email" onChange={handleChange} type="email" placeholder="Ingresa tu email" className="forgot-input" />
                        </div>

                        <div className="mb-3">
                            <button type="submit" className="forgot-button">Envair email</button>
                        </div>
                    </form>

                    <div className="mt-5 text-xs border-b-2 py-4 "></div>

                    <div className="forgot-footer">
                        <p className='msg'>¿Ya te has acrodado?</p>
                        <Link to="/login" className="forgot-login-link">Iniciar sesión</Link>
                    </div>
                </div>
            </div>

            <div className="forgot-image-container"></div>

            {/* Modal de confirmación */}
            {isModalVisible && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <h2 className="modal-heading">Éxito!</h2>
                        <p className="modal-message">El correo de ocnfirmación ha sido enviado a su correo electrónico revise.</p>
                        <button onClick={closeModal} className="modal-close-button">Cerrar</button>
                    </div>
                </div>
            )}
        </>
    )
}