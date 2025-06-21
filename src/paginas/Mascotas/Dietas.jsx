import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import axios from "axios";
import '../../Estilos/Dietas.css'

const Dietas = () => {
    const { id } = useParams();
    const [presupuesto, setPresupuesto] = useState("");
    const [dietaGenerada, setDietaGenerada] = useState("");
    const [loading, setLoading] = useState(false);
    const [dietasGeneradas, setDietasGeneradas] = useState(() => {
        const saved = localStorage.getItem(`dietas_${id}`);
        return saved ? JSON.parse(saved) : {
            bajo: null,
            medio: null,
            alto: null
        };
    });

    useEffect(() => {
        if (presupuesto && dietasGeneradas[presupuesto]) {
            setDietaGenerada(dietasGeneradas[presupuesto]);
        } else {
            setDietaGenerada("");
        }
    }, [presupuesto, dietasGeneradas]);

    const formatearDieta = (texto) => {
        if (!texto) return "";
        let resultado = texto.trim();
        resultado = resultado.replace(/\n{3,}/g, '\n\n');
        resultado = resultado.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        resultado = resultado.replace(/^\s*[\*\-]\s(.*)$/gm, '<li>$1</li>');
        resultado = resultado.replace(/(<li>.*?<\/li>)+/gs, (match) => `<ul>${match}</ul>`);
        resultado = resultado.split('\n').map(line => {
            return line.endsWith('</ul>') ? line : `${line}<br/>`;
        }).join('');
        resultado = resultado.replace(/<\/ul><br\/>/g, '</ul>');
        return resultado;
    };

    const generarDietas = async () => {
        if (!presupuesto) return;

        if (dietasGeneradas[presupuesto]) {
            toast.info(`Ya generaste una dieta para presupuesto ${presupuesto}`);
            return;
        }

        try {
            setLoading(true);
            const token = localStorage.getItem("token");

            const { data } = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}api/mascota/generar-dieta/${id}`,
                { presupuesto },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!data.dieta) {
                toast.error("No se recibió una dieta válida");
                return;
            }

            const nuevasDietas = {
                ...dietasGeneradas,
                [presupuesto]: data.dieta,
            };

            setDietasGeneradas(nuevasDietas);
            localStorage.setItem(`dietas_${id}`, JSON.stringify(nuevasDietas));

            toast.success(data.msg || "Dieta generada correctamente");
            setDietaGenerada(data.dieta);
        } catch (error) {
            console.error("Error al generar dieta:", error);
            toast.error(error.response?.data?.msg || "Error al generar la dieta");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dieta-container">
            <ToastContainer />
            <div className="form-dieta">
                <label htmlFor="presupuesto">Presupuesto:</label>
                <select
                    id="presupuesto"
                    name="presupuesto"
                    value={presupuesto}
                    onChange={(e) => setPresupuesto(e.target.value)}
                    disabled={loading}
                >
                    <option value="">Seleccione</option>
                    <option value="bajo">Bajo</option>
                    <option value="medio">Medio</option>
                    <option value="alto">Alto</option>
                </select>
            </div>

            <button
                onClick={generarDietas}
                disabled={loading || !presupuesto || dietasGeneradas[presupuesto]}
                className={dietasGeneradas[presupuesto] ? "dieta-generada" : ""}
            >
                {loading
                    ? "Generando..."
                    : dietasGeneradas[presupuesto]
                        ? "✓ Dieta generada"
                        : "Generar dieta"}
            </button>

            {dietaGenerada && (
                <div className="dieta-resultado">
                    <h3>Dieta para presupuesto {presupuesto}:</h3>
                    <div dangerouslySetInnerHTML={{ __html: formatearDieta(dietaGenerada) }} />
                </div>
            )}
        </div>
    );
};

export default Dietas;