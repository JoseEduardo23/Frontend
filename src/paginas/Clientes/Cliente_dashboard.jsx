import { useContext, useState } from "react";
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import AuthContext from "../../Context/AuthProvider";
import '../../Estilos/cli_dash.css';
import userI from '../../assets/iconU.png';
import Admin from '../../assets/Admin.png';
import config from '../../assets/config.png';

const Cliente_dashboard = () => {
    const ubicacion = useLocation();
    const rutaActual = ubicacion.pathname;
    const { auth } = useContext(AuthContext);
    const estaAutenticado = localStorage.getItem('token') !== null;

    return (
        <div className="contenedor-principal">
            <div className="marco-panel">
                <nav className="barra-superior">
                    <div className="grupo-logo">
                        <h2 className="titulo-app">TiendaAnimal</h2>
                        <img
                            src={Admin}
                            alt="Logo aplicación"
                            className="imagen-perfil"
                            width={45}
                            height={45}
                        />
                    </div>

                    <ul className="lista-enlaces">
                        <li>
                            <Link
                                to="/users/dashboard"
                                className={`enlace-nav ${rutaActual === '/users/dashboard' ? 'activo' : ''}`}
                            >
                                Perfil
                            </Link>
                        </li>
                        <li>
                            <Link
                                to='/users/dashboard/registrar_mascota'
                                className={`enlace-nav ${rutaActual === '/users/dashboard/registrar_mascota' ? 'activo' : ''}`}
                            >
                                Mascotas
                            </Link>
                        </li>

                    </ul>

                    <div className="seccion-usuario">
                        <span className="nombre-usuario">
                           Bienvenido - {auth?.nombre || 'Invitado'}
                        </span>
                        <img
                            src={userI}
                            alt="Icono usuario"
                            className="avatar-usuario"
                            width={38}
                            height={38}
                        />
                        <Link to="/users/dashboard/configuracion">
                            <img src={config}
                                title="configuración"
                                alt="configuracion"
                                className="config"
                                width={38}
                                height={38}
                            />
                        </Link>
                        <Link
                            to="/"
                            className="boton-salir"
                            onClick={() => localStorage.removeItem('token')}
                        >
                            Cerrar sesión
                        </Link>
                    </div>
                </nav>

                <main className="area-contenido">
                    <div className="contenido-desplazable">
                        {estaAutenticado ? <Outlet /> : rutaActual !== '/login' && <Navigate to="/login" />}
                    </div>

                    <footer className="pie-pagina">
                        <p>TiendaAnimal © {new Date().getFullYear()}</p>
                    </footer>
                </main>
            </div>
        </div>
    )
}
export default Cliente_dashboard;