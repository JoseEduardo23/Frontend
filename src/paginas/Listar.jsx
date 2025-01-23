import React from 'react'
import Tabla from '../components/Tabla'
import '../Estilos/Listar.css'

const Listar = () => {
    return (
        <div className="listar-container">
            <h1 className="font-black text-4xl text-gray-500">Listar...</h1>
            <hr className="my-4" />
            <p className="mb-8">Este módulo te permite listar los registros de pacientes y sus detalles. Puedes realizar varias acciones como actualizar o eliminar registros.</p>
            <div className="table-container">
                <Tabla />
            </div>
        </div>
    )
}

export default Listar