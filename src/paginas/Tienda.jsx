import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getProductosPublicos } from '../api/productos';
import { FaRegHeart, FaHeart, FaStar } from 'react-icons/fa';
import logoDarkMode from '../assets/dark.png';
import '../Estilos/Tienda.css';
import axios from 'axios';
import AuthContext from '../Context/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Tienda = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [productos, setProductos] = useState([]);
    const [categoriaSeleccionada, setCategoria] = useState(null);
    const [favoritos, setFavoritos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [mostrarFavoritos, setMostrarFavoritos] = useState(false);

    const { auth, isAuthenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const esUsuarioNormal = () => {
        return isAuthenticated && auth.rol === 'Usuario';
    };

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                setLoading(true);
                const data = await getProductosPublicos();
                setProductos(data);

                if (esUsuarioNormal()) {
                    await cargarFavoritos();
                }
            } catch (error) {
                console.error("Error cargando datos:", error);
                toast.error('Error al cargar los productos');
            } finally {
                setLoading(false);
            }
        };
        cargarDatos();
    }, [isAuthenticated]);

    const cargarFavoritos = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}api/usuario/favoritos`,
                {
                    headers: {
                        Authorization: `Bearer ${auth.token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            let favoritosData = [];

            if (Array.isArray(response.data)) {
                favoritosData = response.data;
            } else if (response.data?.favoritos) {
                favoritosData = response.data.favoritos;
            } else if (response.data?.productos) {
                favoritosData = response.data.productos;
            }

            const idsFavoritos = favoritosData.map(item => {
                return item._id || item.id || item.producto?._id || item.producto?.id;
            }).filter(Boolean);

            setFavoritos(idsFavoritos);

        } catch (error) {
            console.error("Error cargando favoritos:", error);
            const errorMessage = error.response?.data?.message ||
                'Error al cargar tus favoritos';
            toast.error(errorMessage);

            if (error.response?.status === 401) {
                logout();
            }
        }
    };

    const toggleFavorito = async (productoId) => {
        if (!esUsuarioNormal()) {
            if (!isAuthenticated) {
                toast.info('Debes iniciar sesión para guardar favoritos');
                navigate('/login');
            } else {
                toast.warning('Los administradores no pueden agregar favoritos');
            }
            return;
        }

        try {
            const esFavorito = favoritos.includes(productoId);
            const producto = productos.find(p => p._id === productoId);

            if (esFavorito) {
                await axios.delete(
                    `${import.meta.env.VITE_BACKEND_URL}api/usuario/eliminar-favorito/${productoId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${auth.token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );
                setFavoritos(prev => prev.filter(id => id !== productoId));
                toast.success(`"${producto.nombre}" eliminado de favoritos`);
            } else {
                await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}api/usuario/agregar-favorito/${productoId}`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${auth.token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );
                setFavoritos(prev => [...prev, productoId]);
                toast.success(`"${producto.nombre}" agregado a favoritos`);
            }
        } catch (error) {
            console.error('Error al actualizar favorito:', error);
            const errorMessage = error.response?.data?.message ||
                'Error al actualizar favoritos';
            toast.error(errorMessage);

            if (error.response?.status === 401) {
                logout();
                navigate('/login');
            }
        }
    };

    const handleImageError = (e) => {
        e.target.src = '/placeholder-producto.png';
    };

    const productosFiltrados = categoriaSeleccionada
        ? productos.filter(p => p.categoria === categoriaSeleccionada)
        : productos;

    const productosFavoritos = productos.filter(p => favoritos.includes(p._id));

    return (
        <div className={`app-container ${darkMode ? 'dark' : ''}`}>
            <ToastContainer
                position="top-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={darkMode ? 'dark' : 'light'}
            />

            <header className='navbar'>
                <h1>TIENDANIMAL</h1>
                <nav>
                    <ul>
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/sobre">Sobre Nosotros</Link></li>
                        <li><Link to="/tienda">Productos</Link></li>
                        <li><Link to="/contactos">Contactos</Link></li>
                        <li>
                            <button
                                className="btn-dark"
                                onClick={() => setDarkMode(!darkMode)}
                                aria-label={darkMode ? "Desactivar modo oscuro" : "Activar modo oscuro"}
                            >
                                <img src={logoDarkMode} alt="Modo oscuro" />
                            </button>
                        </li>
                        {esUsuarioNormal() && (
                            <li>
                                <button
                                    className={`btn-favoritos-nav ${mostrarFavoritos ? 'active' : ''}`}
                                    onClick={() => setMostrarFavoritos(!mostrarFavoritos)}
                                >
                                    <FaStar /> {mostrarFavoritos ? 'Mostrar Todos' : 'Mis Favoritos'}
                                </button>
                            </li>
                        )}
                        <li>
                            <Link
                                to={isAuthenticated ? auth.rol === 'Administrador' ? '/dashboard' : '/users/dashboard' : '/login'}
                                className='btn-login'
                            >
                                {isAuthenticated ? 'Mi Cuenta' : 'Iniciar Sesión'}
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>

            <main className="tienda-container">
                <h1>{mostrarFavoritos ? 'Mis Productos Favoritos' : ''}</h1>

                {!mostrarFavoritos && (
                    <div className="filtros-categorias">
                        <button
                            onClick={() => setCategoria(null)}
                            className={!categoriaSeleccionada ? 'active' : ''}
                        >
                            Todas
                        </button>
                        {['Perros', 'Gatos', 'Aves', 'Peces', 'Otros'].map(cat => (
                            <button
                                key={cat}
                                onClick={() => setCategoria(cat)}
                                className={categoriaSeleccionada === cat ? 'active' : ''}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                )}

                {loading ? (
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <p>Cargando productos...</p>
                    </div>
                ) : (
                    <div className="productos-grid">
                        {(mostrarFavoritos ? productosFavoritos : productosFiltrados).length === 0 ? (
                            <p className="sin-productos">
                                {mostrarFavoritos
                                    ? 'No tienes productos favoritos aún'
                                    : 'No hay productos disponibles'}
                            </p>
                        ) : (
                            (mostrarFavoritos ? productosFavoritos : productosFiltrados).map((producto) => (
                                <article key={producto._id} className="producto-card">
                                    <div className="producto-imagen">
                                        <img
                                            src={producto.imagen}
                                            alt={producto.nombre}
                                            onError={handleImageError}
                                            loading="lazy"
                                        />
                                        <button
                                            className={`btn-favorito ${favoritos.includes(producto._id) ? 'activo' : ''}`}
                                            onClick={() => {
                                                if (!isAuthenticated) {
                                                    toast.info('Debes iniciar sesión para guardar favoritos');
                                                } else if (!esUsuarioNormal()) {
                                                    toast.warning('Los administradores no pueden agregar favoritos');
                                                } else {
                                                    toggleFavorito(producto._id);
                                                }
                                            }}
                                            aria-label={favoritos.includes(producto._id) ? "Quitar de favoritos" : "Agregar a favoritos"}
                                            disabled={loading}
                                        >
                                            {favoritos.includes(producto._id) ? (
                                                <FaHeart className="heart-icon" />
                                            ) : (
                                                <FaRegHeart className="heart-icon" />
                                            )}
                                        </button>
                                    </div>
                                    <div className="producto-info">
                                        <h3>{producto.nombre}</h3>
                                        <p className="descripcion">{producto.descripcion}</p>
                                        <div className="producto-precio">
                                            <span>${producto.precio.toFixed(2)}</span>
                                            {producto.stock > 0 ? (
                                                <span className="stock">Disponible</span>
                                            ) : (
                                                <span className="agotado">Agotado</span>
                                            )}
                                        </div>
                                    </div>
                                </article>
                            ))
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};