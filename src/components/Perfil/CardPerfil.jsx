import React, { useContext } from 'react';
import '../../Estilos/CardPerfil.css';
import user from '../../assets/UserA.png';
import AuthContext from '../../Context/AuthProvider';

export const CardPerfil = () => {
    const { auth } = useContext(AuthContext); // Accedemos al estado 'auth' desde el contexto

    return (
        <div className="card-container">
            <div className="card-header">
                <img 
                    src={user} 
                    alt="img-client" 
                    className="card-image" 
                />
            </div>
            <div className="card-info">
                <p className="card-info-item">Nombre: {auth.nombre}</p>
                <p className="card-info-item">Apellido: {auth.apellido}</p>
                <p className="card-info-item">Correo: {auth.email}</p>
                <p className="card-info-item">Teléfono: {auth.telefono}</p>
                <p className="card-info-item">Dirección: {auth.direccion}</p>
            </div>
        </div>
    );
};