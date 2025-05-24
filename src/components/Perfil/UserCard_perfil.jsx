import React, { useContext } from 'react';
import '../../Estilos/CardPerfilUs.css';
import user from '../../assets/UserA.png';
import AuthContext from '../../Context/AuthProvider';

export const UserCard_perfil = () => {
    const { auth } = useContext(AuthContext);

    return (
        <div className="card-cont">
            <div className="card-section">
                <img
                    src={
                        auth.imagen?.url
                            ? `${auth.imagen.url.startsWith('http') ? '' : import.meta.env.VITE_BACKEND_URL}${auth.imagen.url}?upd=${Date.now()}`
                            : user
                    }
                    alt="Perfil"
                    className="card-usimg"
                    onError={(e) => (e.target.src = user)}
                />
            </div>
            <div className="card-info">
                <p className="card-user">Nombre: {auth.nombre}</p>
                <p className="card-user">Apellido: {auth.apellido}</p>
                <p className="card-user">Correo: {auth.email}</p>
                <p className="card-user">Teléfono: {auth.telefono}</p>
                <p className="card-user">Dirección: {auth.direccion}</p>
            </div>
        </div>
    );
};