
import React, { useState } from 'react';
import Tabla from '../../components/Tabla';
import '../../Estilos/Listar.css';

const Listar = () => {
    return (
        <div className="listar-container">
            <hr className="my-4" />            
                <div className="table-container">
                    <Tabla />
                </div>
        </div>
    );
}

export default Listar;