
import React, { useState } from 'react';
import '../../Estilos/Listar.css';
import Cliente_tabla from '../../components/Cliente_tabla';

const Cliente_listar = () => {
    const [mostrarTabla, setMostrarTabla] = useState(false);

    const toggleTabla = () => {
        setMostrarTabla(!mostrarTabla);
    };

    return (
        <div className="listar-container">
            <h1 className='list-title'>Listado de clientes:</h1>
            <hr className="my-4" />
            
            <div className="seccion-toggle" onClick={toggleTabla}>
                <h2 className="toggle-title">Mostrar/Ocultar Tabla</h2>
            </div>

            {mostrarTabla && (
                <div className="table-container">
                    <Cliente_tabla/>
                </div>
            )}
        </div>
    );
}

export default Cliente_listar;