import React from 'react';
import { UserCard_perfil } from '../../components/Perfil/UserCard_perfil';
import Password from '../../components/Perfil/Password'
import '../../Estilos/PerfilUs.css'

const usuario_Perfil = () => {
    return (
        <div className="user-profile-container">
            <header className="profile-header-section">
                <h1 className="profile-main-title">Perfil</h1>
                <hr className="profile-title-divider" />
            </header>

            <div className="profile-main-content">
                <div className="profile-data-card">
                    <UserCard_perfil />
                </div>
                <div>
                    <Password/>
                </div>
            </div>
        </div>
    );
}

export default usuario_Perfil;