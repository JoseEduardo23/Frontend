import { Link, Outlet, useLocation } from 'react-router-dom';
import '../../Estilos/Mascotas.css'
const Clientes = () => {
    const location = useLocation();
    const urlActual = location.pathname;

    return (
        <div className='Prod-container'>
            <h1>Gestión de Clientes</h1>
            <ul className='Pcon'>
                <li className={`${urlActual === '/dashboard/clientes/clientes_listar' ? 'active' : ''}`}>
                    <Link  to="/dashboard/clientes/clientes_listar">Listado de clientes</Link>
                </li>
            </ul>

            <div className="productos-content">
                <Outlet />
            </div>
        </div>
    );
};

export default Clientes;