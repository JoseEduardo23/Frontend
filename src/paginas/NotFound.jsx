import logoDog from '../assets/error.png';
import { Link } from 'react-router-dom';
import '../Estilos/NotFound.css'
export const NotFound = () => {
    return (
        <div className="notfound-container">
            <img className="notfound-logo" src={logoDog} alt="Página no encontrada" />
            <div className="notfound-text-container">
                <p className="notfound-title">Página no encontrada</p>
                <p className="notfound-message">Lo sentimos, la página que has solicitado no se ha encontrado.</p>
                <Link to="/login" className="notfound-button">Ir al Login</Link>
            </div>
        </div>
    );
};