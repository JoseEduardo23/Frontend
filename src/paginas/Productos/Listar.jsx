
import React, { useState } from 'react';
import Tabla from '../../components/Tabla';
import '../../Estilos/Listar.css';

const Listar = () => {
    const [mostrarTabla, setMostrarTabla] = useState(false);

    const toggleTabla = () => {
        setMostrarTabla(!mostrarTabla);
    };

    return (
        <div className="listar-container">
            <h1 className='list-title'>Lista de productos:</h1>
            <hr className="my-4" />
            
            <div className="seccion-toggle" onClick={toggleTabla}>
                <h2 className="toggle-title">Mostrar/Ocultar Tabla</h2>
            </div>

            {mostrarTabla && (
                <div className="table-container">
                    <Tabla />
                </div>
            )}
        </div>
    );
}

export default Listar;