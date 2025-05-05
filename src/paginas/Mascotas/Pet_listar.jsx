import { useState } from "react";
import '../../Estilos/Listar.css';
import MascotaTabla from "./Mascotas_tabla";

const Pet_listar = ()=>{
    const [mostrarTabla, setMostrarTabla] = useState(false);

    const toggleTabla = ()=>{
        setMostrarTabla(!mostrarTabla)
    }

    return(
        <>
        <div className="listar-container">
            <h1 style={{color:"black"}} className="list-title" >Listado de mascotas:</h1>
            <hr className="my-4" />

            <div className="seccion-toggle" onClick={toggleTabla}>
                <h2 className="toggle-title">Mostrar/Ocultar Tabla</h2>
            </div>
            {mostrarTabla &&(
                <div className="table-container">
                    <MascotaTabla/>
                </div>
            )}
        </div>
        </>
    )
}

export default Pet_listar;