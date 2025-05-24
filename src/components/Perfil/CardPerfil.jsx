import React, { useContext } from 'react';
import '../../Estilos/CardPerfil.css';
import user from '../../assets/UserA.png';
import AuthContext from '../../Context/AuthProvider';

export const CardPerfil = () => {
    const { auth } = useContext(AuthContext);

    return (
        <div className="card-admin">
            <div className="card-add">
                <img 
                    src={user} 
                    alt="img-ad" 
                    className="card-ad" 
                />
            </div>
            <div className="card-info">
                <p className="card-info-ad">Nombre: {auth.nombre}</p>
                <p className="card-info-ad">Apellido: {auth.apellido}</p>
                <p className="card-info-ad">Correo: {auth.email}</p>
                <p className="card-info-ad">Teléfono: {auth.telefono}</p>
                <p className="card-info-ad">Dirección: {auth.direccion}</p>
            </div>
        </div>
    );
};