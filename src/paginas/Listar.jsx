import React from 'react'
import Tabla from '../components/Tabla'
import '../Estilos/Listar.css'

const Listar = () => {
    return (
        <div className="listar-container">
            <h1>Lista de los productos ingresados en el sistema :)</h1>
            <hr className="my-4" />
            <p className="">Este módulo te permite listar los registros de productos y sus detalles. Puedes realizar varias acciones como actualizar o eliminar registros.</p>
            <div className="table-container">
                <Tabla />
            </div>
        </div>
    )
}

export default Listar