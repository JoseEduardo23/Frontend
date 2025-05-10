import { Link, Outlet, useLocation } from 'react-router-dom';
import '../Productos/Productos.css'

const Productos = () => {
    const location = useLocation();
    const urlActual = location.pathname;

    return (
        <div className='Prod-container'>
            <h1>Gestión de Productos</h1>
            <ul className='Pcon'>
                <li className={`${urlActual === '/dashboard/productos/listar' ? 'active' : ''}`}>
                    <Link  to="/dashboard/productos/listar">Categorias de productos</Link>
                </li>

                <li className={`${urlActual === '/dashboard/productos/crear' ? 'active' : ''}`}>
                    <Link to="/dashboard/productos/crear">Registro de productos</Link>
                </li>
            </ul>

            <div className="productos-content">
                <Outlet />
            </div>
        </div>
    );
};

export default Productos;