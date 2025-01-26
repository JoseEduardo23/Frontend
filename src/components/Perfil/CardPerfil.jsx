import React from 'react';
import '../../Estilos/CardPerfil.css';
import user from '../../assets/UserA.png'

export const CardPerfil = () => {
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
                <p className="card-info-item">Nombre:</p>
                <p className="card-info-item">Edad:</p>
                <p className="card-info-item">Correo:</p>
                <p className="card-info-item">Teléfono:</p>
                <p className="card-info-item">Dirección:</p>
                <p className="card-info-item">Ciudad:</p>
                <p className="card-info-item">Detalles:</p>
            </div>
        </div>
    );
}