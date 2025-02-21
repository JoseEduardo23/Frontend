import React from 'react'
import Tabla from '../components/Tabla'
import '../Estilos/Listar.css'

const Listar = () => {
    return (
        <div className="listar-container">
            <h1 className='list-title'>Lista de productos ingresados:</h1>
            <hr className="my-4" />
            <div className="table-container">
                <Tabla />
            </div>
        </div>
    )
}

export default Listar