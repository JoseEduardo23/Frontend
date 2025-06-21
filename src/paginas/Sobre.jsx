import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Estilos/Sobre.css'
import logoDarkMode from '../assets/dark.png'
import huella from '../assets/huellas.png'

export const Sobre = () => {
    const [darkMode, setdarkMode] = useState(false)

    return (
        <div className={darkMode ? "dark" : ""}>
            <main className='sob-container'>
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
            <section className='content-sobre'>
                <h1>Sobre Nosotros</h1>
                <div className='info-sobre'>
                    <p>
                        En Tiendanimal, creemos que el bienestar de los animales de compañía, especialmente los perros, comienza con una alimentación adecuada. Por ello, hemos incorporado tecnologías basadas en inteligencia artificial con el fin de ofrecer una herramienta que oriente a los dueños en la elaboración de dietas más saludables para sus mascotas.

                        Esta funcionalidad permite generar recomendaciones alimenticias personalizadas considerando factores como el peso, edad, raza y nivel de actividad del animal. Sin embargo, reconocemos que, al tratarse de un sistema automatizado y no clínico, puede haber imprecisiones. Las dietas generadas por la inteligencia artificial no deben considerarse como sustituto de una evaluación veterinaria profesional, ya que un uso incorrecto podría afectar la salud del animal e incluso acarrear responsabilidades legales.

                        Por esta razón, el sistema está diseñado como una herramienta complementaria para apoyar a los dueños en la toma de decisiones, pero siempre promoviendo la consulta con especialistas en nutrición animal. Nuestra prioridad es brindar soluciones tecnológicas útiles y responsables, enfocadas en mejorar la calidad de vida de los animales sin comprometer su salud.
                    </p>
                </div>
                <img src={huella} className='img-huella-s' />
            </section>
        </div>
    )
}