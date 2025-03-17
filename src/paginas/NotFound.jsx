import logoDog from '../assets/404.png';
import { Link } from 'react-router-dom';
import '../Estilos/NotFound.css';
import VID from '../assets/fondos/nature.gif';

export const NotFound = () => {
    return (
        <div className="notfound-container">
            <p className="notfound-title">Página no encontrada</p>

            <img src={VID} id="video-background" />
            <img className="notfound-logo" src={logoDog} alt="Página no encontrada" />
            <div className="notfound-text-container">
                <p className="notfound-message">La página que buscas fue movida, eliminada, reacomodada o puede que nunca haya existido... ¿quién sabe?</p>
                <Link to="/" className="notfound-button">Página principal</Link>
            </div>
        </div>
    );
};