import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import '../Estilos/Forgot.css'
import React from 'react'

export const Forgot = () => {
    const [mail, setMail] = useState({ email: '' }) // Inicializar con campo email
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false) // Estado para carga

    const handleChange = (e) => {
        setMail({
            ...mail,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        // Validación básica del email
        if (!mail.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail.email)) {
            toast.error('Por favor ingresa un email válido')
            return
        }

        setIsLoading(true)
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}api/usuario/recuperar-password`
            const respuesta = await axios.post(url, { email: mail.email })
            
            // Verificar respuesta exitosa
            if (respuesta.status === 200) {
                setIsModalVisible(true)
                toast.success('Correo enviado exitosamente')
            }
        } catch (error) {
            console.error('Error completo:', error)
            
            // Manejo detallado de errores
            if (error.response) {
                // El servidor respondió con un código de error
                toast.error(error.response.data?.msg || 'Error al procesar la solicitud')
            } else if (error.request) {
                // La solicitud fue hecha pero no hubo respuesta
                toast.error('No se recibió respuesta del servidor. Verifica tu conexión.')
            } else {
                // Error al configurar la solicitud
                toast.error('Error al configurar la petición: ' + error.message)
            }
        } finally {
            setIsLoading(false)
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
                    <h1 className="forgot-heading">¿Perdiste tu contraseña?</h1>
                    <small className="forgot-subheading">No te preocupes, ingresa tu correo electrónico</small>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-1">
                            <label className="mb-2 block text-sm font-semibold">Email</label>
                            <input 
                                name="email" 
                                onChange={handleChange} 
                                type="email" 
                                value={mail.email}
                                placeholder="Ingresa tu email" 
                                className="forgot-input" 
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <button 
                                type="submit" 
                                className="forgot-button"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Enviando...' : 'Enviar email'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-5 text-xs border-b-2 py-4 "></div>

                    <div className="forgot-footer">
                        <p className='msg'>¿Ya te has acordado?</p>
                        <Link to="/login" className="forgot-login-link">Iniciar sesión</Link>
                    </div>
                </div>
            </div>

            <div className="forgot-image-container"></div>

            {/* Modal de confirmación */}
            {isModalVisible && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <h2 className="modal-heading">¡Éxito!</h2>
                        <p className="modal-message">El correo de confirmación ha sido enviado a tu dirección de correo electrónico.</p>
                        <button onClick={closeModal} className="modal-close-button">Cerrar</button>
                    </div>
                </div>
            )}
        </>
    )
}