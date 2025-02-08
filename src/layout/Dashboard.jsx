import { useContext, useState } from 'react';
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import AuthContext from '../Context/AuthProvider';
import '../Estilos/Dashboard.css';
import userI from '../assets/iconU.png';
import Admin from '../assets/Admin.png';

const Dashboard = () => {
  const location = useLocation();
  const urlActual = location.pathname;
  const { auth } = useContext(AuthContext);
  const Autenticado = localStorage.getItem('token');

  // Estado para controlar la visibilidad del menú
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Función para alternar el estado del menú
  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  return (
    <div className="dashboard-container">
      {/* Barra lateral */}
      <div className={`sidebar ${menuAbierto ? 'mostrar' : ''}`}>
        <h2 className="sidebar-title">Tienda</h2>
        <img
          src={Admin}
          alt="img-client"
          className="user-img"
          width={120}
          height={120}
        />
        <p className="welcome-message">
          <span className="status"></span> Bienvenido - {auth?.nombre}
        </p>
        <hr className="mt-5 border-slate-500" />

        <ul className={`nav-list ${menuAbierto ? 'mostrar' : ''}`}>
          <li>
            <Link
              to="/dashboard"
              className={`${urlActual === '/dashboard' ? 'active' : ''}`}
            >
              Perfil
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/listar"
              className={`${urlActual === '/dashboard/listar' ? 'active' : ''}`}
            >
              Productos
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/crear"
              className={`${urlActual === '/dashboard/crear' ? 'active' : ''}`}
            >
              Ingresar
            </Link>
          </li>
        </ul>
      </div>

      <div className="hamburguesa" onClick={toggleMenu}>
        <span className="hamburguesa-bar"></span>
        <span className="hamburguesa-bar"></span>
        <span className="hamburguesa-bar"></span>
      </div>

      <div className={`content-area ${menuAbierto ? 'retraido' : ''}`}>
        <div className="header">
          <div className="user-info">
            Usuario - {auth.nombre}
          </div>
          <div>
            <img
              src={userI}
              alt="img-client"
              className="user-avatar"
              width={50}
              height={50}
            />
          </div>
          <div>
            <Link
              to="/"
              className="logout-button"
              onClick={() => {
                localStorage.removeItem('token');
              }}
            >
              Salir
            </Link>
          </div>
        </div>

        <div className="overflow-y-scroll p-8">
          {Autenticado ? <Outlet /> : <Navigate to="/login" />}
        </div>

        <div className="footer-dashboard">
          <p>Todos los derechos reservados</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;