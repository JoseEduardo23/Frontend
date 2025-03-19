import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoDarkMode from '../assets/dark.png'

export const Contactos = () => {
    const [darkMode, setdarkMode] = useState(false)

    return (
        <div className={darkMode ? "dark" : ""}>
            <main className='cont-container'>
                <div className='navbar'>
                    <h1>TIENDANIMAL</h1>
                    <ul>
                        <li>
                            <Link to="/">Inicio</Link>
                        </li>

                        <li>
                            <Link to="/sobre">Sobre Nosotros</Link>
                        </li>

                        <li>
                            <Link to="/tienda">Productos</Link>
                        </li>

                        <li>
                            <Link to="/contactos">Contactos</Link>
                        </li>

                        <li>
                            <img
                                className='btn-dark'
                                onClick={() => setdarkMode(!darkMode)}
                                src={logoDarkMode}
                                alt="darkmode"
                            />
                        </li>
                        <li>
                            <Link
                                to="/login"
                                className='btn-login'
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.open('/login', '_blank');
                                }}
                            >
                                Iniciar Sesión
                            </Link>
                        </li>
                    </ul>
                </div>
            </main>
        </div>
    )
}