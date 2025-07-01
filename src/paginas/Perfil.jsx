import React from 'react';
import { CardPerfil } from '../components/Perfil/CardPerfil';
import FormularioPerfil from '../components/Perfil/FormularioPerfil';
import '../Estilos/Perfil.css'
import PasswordAd from '../components/Perfil/PasswordAd';

const Perfil = () => {
    return (
        <div className="perfil-container">
            <header className="perfil-header">
                <h1 className="perfil-title">Perfil</h1>
                <hr className="perfil-divider" />
            </header>

            <div className="perfil-content">
                <div className="perfil-card">
                    <CardPerfil />
                </div>
                <div className="perfil-form">
                    <FormularioPerfil />
                </div>
                <div>
                    <PasswordAd/>
                </div>
            </div>
        </div>
    );
}

export default Perfil;