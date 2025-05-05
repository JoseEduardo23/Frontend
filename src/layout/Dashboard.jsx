import { useContext, useState } from 'react';
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import AuthContext from '../Context/AuthProvider';
import '../Estilos/Dashboard.css';
import userI from '../assets/iconU.png';
import Admin from '../assets/Admin.png';
import profile from '../assets/profile.png'
import product from '../assets/product.png'
import dog from '../assets/dog.png'

const Dashboard = () => {
  const location = useLocation();
  const urlActual = location.pathname;
  const { auth } = useContext(AuthContext);
  const Autenticado = localStorage.getItem('token') !== null;

  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  return (
    <div className="dashboard-container">
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
          <span className="status"></span> Bienvenido - {auth?.nombre || 'Usuario'}
        </p>
        <hr className="mt-5 border-slate-500" />

        <ul className={`nav-list ${menuAbierto ? 'mostrar' : ''}`}>
          <li>
            <img src={profile} alt="" className='cat'/>
            <Link
              to="/dashboard"
              className={`${urlActual === '/dashboard' ? 'active' : ''}`}
            >
              Perfil
            </Link>
          </li>
          <li>
            <img src={product} alt="" className='cat'/>
            <Link to='/dashboard/productos' className={`${urlActual === '/dashboard/productos' ? 'active' : ''}`}>
              Productos
            </Link>
          </li>
          <li>
            <img src={profile} alt="" className='cat'/>
            <Link to='/dashboard/clientes ' className={`${urlActual === '/dashboard/clientes' ? 'active' : ''}`}>
              Clientes
            </Link>
          </li>

          <li>
            <img src={dog} alt="" className='cat'/>
            <Link to='/dashboard/mascotas' className={`${urlActual === '/dashboard/mascotas' ? 'active' : ''}`}>
              Mascotas
            </Link>
          </li>
        </ul>
      </div>

      {/* Botón hamburguesa para abrir/cerrar menú */}
      <div className="hamburguesa" onClick={toggleMenu}>
        <span className="hamburguesa-bar"></span>
        <span className="hamburguesa-bar"></span>
        <span className="hamburguesa-bar"></span>
      </div>

      <div className="content-area">
        <div className="header">
          <div className="user-info">
            Usuario - {auth?.nombre || 'Usuario'}
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

        {/* Redirigir a login si no está autenticado */}
        <div className="overflow-y-scroll p-8">
          {Autenticado ? <Outlet /> : urlActual !== '/login' && <Navigate to="/login" />}
        </div>

        <div className="footer-dashboard">
          <p>TiendAnimal © </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;