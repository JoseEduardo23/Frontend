 import React from "react";
import { Formulario } from "../components/Formulario";
import "../Estilos/Crear.css"

const Crear = ()=>{
    return(
        <div className="div-crear">
            <h1 className="h1-crear" style={{fontSize:"1.5rem"}}>Modulo de productos</h1>
            <hr/>
            <Formulario/>
        </div>
    )
}
export default Crear