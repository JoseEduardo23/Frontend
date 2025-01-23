import { useContext } from 'react';
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import AuthContext from '../Context/AuthProvider';
import '../Estilos/Dashboard.css';

const Dashboard = () => {
    const location = useLocation();
    const urlActual = location.pathname;

    const { auth } = useContext(AuthContext);
    const Autenticado = localStorage.getItem('token');

    return (
        <div className="dashboard-container">

            <div className="sidebar">
                <h2>APP-DEMO</h2>

                <img 
                    src="https://cdn-icons-png.flaticon.com/512/2138/2138508.png" 
                    alt="img-client" 
                    className="m-auto mt-8 p-1 border-2 border-slate-500 rounded-full" 
                />

                <p> <span className="bg-green-600 w-3 h-3 inline-block rounded-full"></span> Bienvenido - {auth?.nombre}</p>

                <hr className="mt-5 border-slate-500" />

                <ul>
                    <li>
                        <Link to='/dashboard' className={`${urlActual === '/dashboard' ? 'active' : ''}`}>Perfil</Link>
                    </li>
                    <li>
                        <Link to='/dashboard/listar' className={`${urlActual === '/dashboard/listar' ? 'active' : ''}`}>Listar</Link>
                    </li>
                    <li>
                        <Link to='/dashboard/crear' className={`${urlActual === '/dashboard/crear' ? 'active' : ''}`}>Crear</Link>
                    </li>
                </ul>
            </div>

            <div className="main-content">
                <div className="header">
                    <div className="user-info">
                        Usuario - {auth?.nombre}
                    </div>
                    <div>
                        <img 
                            src="https://cdn-icons-png.flaticon.com/512/4715/4715329.png" 
                            alt="img-client" 
                            className="profile-img" 
                        />
                    </div>
                    <div>
                        <Link to="/" className="logout-button" onClick={() => { localStorage.removeItem('token') }}>
                            Salir
                        </Link>
                    </div>
                </div>

                <div className="overflow-y-scroll p-8">
                    {Autenticado ? <Outlet /> : <Navigate to="/login" />}
                </div>

                <div className="footer">
                    <p>Todos los derechos reservados</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;