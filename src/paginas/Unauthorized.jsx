import { Link } from 'react-router-dom';

const Unauthorized = () => {
    return (
        <div className="unauthorized-container">
            <h1>403 - Acceso No Autorizado</h1>
            <p>No tienes permiso para acceder a esta página.</p>
            <div className="actions">
                <Link to="/" className="btn btn-primary">
                    Ir al Inicio
                </Link>
                <Link to="/login" className="btn btn-secondary">
                    Iniciar Sesión
                </Link>
            </div>
        </div>
    );
};

export default Unauthorized;