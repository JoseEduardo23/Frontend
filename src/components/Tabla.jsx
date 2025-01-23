import { useEffect, useState } from "react";
import { MdDeleteForever, MdNoteAdd, MdInfo } from "react-icons/md";
import axios from 'axios';
import Mensaje from "./Alertas/Mensaje";
import { useNavigate } from 'react-router-dom';
import '../Estilos/Tabla.css';

const Tabla = () => {
    const navigate = useNavigate();
    const [pacientes, setPacientes] = useState([]);

    const listarPacientes = async () => {
        try {
            const token = localStorage.getItem('token');
            const url = `http://localhost:3000/api/usuarios/`;
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
            const respuesta = await axios.get(url, options);
            setPacientes(respuesta.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const confirmar = confirm("Vas a registrar la salida de un paciente, ¿Estás seguro de realizar esta acción?");
            if (confirmar) {
                const token = localStorage.getItem('token');
                const url = `http://localhost:3000/api/usuario/eliminar/${id}`;
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                };
                const data = {
                    salida: new Date().toString()
                };
                await axios.delete(url, { headers, data });
                listarPacientes();
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        listarPacientes();
    }, []);

    return (
        <>
            {
                pacientes.length === 0
                    ?
                    <Mensaje tipo={'active'}>{'No existen registros'}</Mensaje>
                    :
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>N°</th>
                                    <th>Nombre</th>
                                    <th>Propietario</th>
                                    <th>Email</th>
                                    <th>Celular</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    pacientes.map((paciente, index) => (
                                        <tr key={paciente._id}>
                                            <td>{index + 1}</td>
                                            <td>{paciente.nombre}</td>
                                            <td>{paciente.propietario}</td>
                                            <td>{paciente.email}</td>
                                            <td>{paciente.celular}</td>
                                            <td>
                                                <span className={`estado-activo`}>
                                                    {paciente.estado ? "activo" : "inactivo"}
                                                </span>
                                            </td>
                                            <td className="action-icons">
                                                <MdNoteAdd 
                                                    onClick={() => navigate(`/dashboard/visualizar/${paciente._id}`)} 
                                                />
                                                <MdInfo 
                                                    onClick={() => navigate(`/dashboard/actualizar/${paciente._id}`)} 
                                                />
                                                <MdDeleteForever 
                                                    className="delete-icon" 
                                                    onClick={() => handleDelete(paciente._id)} 
                                                />
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
            }
        </>
    );
};

export default Tabla;