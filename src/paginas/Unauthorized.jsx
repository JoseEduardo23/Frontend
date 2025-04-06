import { useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../Estilos/Unauthorized.css';

const Unauthorized = () => {
    const eyeRef = useRef(null);
    const containerRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    const handleGoBack = () => {
        if (location.state?.from === '/login' || location.state?.from === '/registro') {
            localStorage.removeItem('token');
            localStorage.removeItem('rol');
        }
        navigate(-1);
    }

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!containerRef.current || !eyeRef.current) return;
            
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            document.documentElement.style.setProperty('--mouse-x', x);
            document.documentElement.style.setProperty('--mouse-y', y);
            
            const cx = 115 + 30 * x;
            const cy = 50 + 30 * y;
            eyeRef.current.setAttribute('cx', cx);
            eyeRef.current.setAttribute('cy', cy);
        };

        const handleTouchMove = (e) => {
            if (!containerRef.current || !eyeRef.current) return;
            
            const x = e.touches[0].clientX / window.innerWidth;
            const y = e.touches[0].clientY / window.innerHeight;
            
            document.documentElement.style.setProperty('--mouse-x', x);
            document.documentElement.style.setProperty('--mouse-y', y);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);

    return (
        <div className="unauthorized-container" ref={containerRef}>
            <svg xmlns="http://www.w3.org/2000/svg" id="robot-error" viewBox="0 0 260 118.9" role="img">
                <title xmlLang="en">403 Error</title>
                <defs>
                    <clipPath id="white-clip">
                        <circle id="white-eye" fill="#cacaca" cx="130" cy="65" r="20" />
                    </clipPath>
                    <text id="text-s" className="error-text" y="106" style={{fontFamily: 'Bungee'}}>403</text>
                </defs>
                <path className="alarm" fill="#e62326" d="M120.9 19.6V9.1c0-5 4.1-9.1 9.1-9.1h0c5 0 9.1 4.1 9.1 9.1v10.6" />
                <use href="#text-s" x="-0.5px" y="-1px" fill="black" />
                <use href="#text-s" fill="#2b2b2b" />
                <g id="robot">
                    <g id="eye-wrap">
                        <use href="#white-eye" />
                        <circle
                            ref={eyeRef}
                            id="eyef"
                            className="eye"
                            clipPath="url(#white-clip)"
                            fill="#000"
                            stroke="#2aa7cc"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                            cx="130"
                            cy="65"
                            r="11"
                        />
                        <ellipse id="white-eye" fill="#2b2b2b" cx="130" cy="40" rx="18" ry="12" />
                    </g>
                    <circle className="lightblue" cx="105" cy="32" r="2.5" id="tornillo" />
                    <use href="#tornillo" x="50" />
                    <use href="#tornillo" x="50" y="60" />
                    <use href="#tornillo" y="60" />
                </g>
            </svg>

            <h1 style={{fontFamily: 'Arial, sans-serif'}}>403 - Acceso No Autorizado</h1>
            <p style={{fontFamily: 'Arial, sans-serif'}}>No tienes permiso para acceder a esta página.</p>
            
            <div className="actions" style={{fontFamily: 'Arial, sans-serif'}}>
                <Link to="/" className="btn btn-primary" style={{fontFamily: 'Arial, sans-serif'}}>
                    Ir al Inicio
                </Link>
                <button 
                onClick={handleGoBack}
                className="btn btn-secondary" 
                style={{fontFamily: 'Arial, sans-serif'}}>
                    Regresar
                </button>
            </div>
        </div>
    );
};

export default Unauthorized;