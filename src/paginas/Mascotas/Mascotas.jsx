import { Link, Outlet, useLocation, } from 'react-router-dom';
import '../../Estilos/Mascotas.css'

const Mascotas = () => {
    const location = useLocation()
    const urlActual = location.pathname;

    return (
        <>
            <div className="Masc-container">
                <h1 style={{color:"black"}}>Gestion de Mascotas</h1>
                <ul className="Mcon">
                    <li className={`${urlActual === '/dashboard/mascotas/mascotas¿_listar' ? 'active' : ''}`}>
                        <Link to="/dashboard/mascotas/mascotas_listar">Lista de Mascotas</Link>
                    </li>
                </ul>
                <div className="masc-content">
                    <Outlet/>
                </div>
            </div >
        </>
    )
}

export default Mascotas;