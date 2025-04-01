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
                    src={user} 
                    alt="img-client" 
                    className="card-usimg" 
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