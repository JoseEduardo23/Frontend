import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true);
    const [authChecked, setAuthChecked] = useState(false);
    const navigate = useNavigate()

    const perfil = async (token) => {
        try {
            const isAdmin = localStorage.getItem('rol') === 'Administrador';
            const url = isAdmin
                ? `${import.meta.env.VITE_BACKEND_URL}api/perfil`
                : `${import.meta.env.VITE_BACKEND_URL}api/usuario/perfil`;

            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };

            const respuesta = await axios.get(url, options);
            const rol = respuesta.data.rol || (isAdmin ? 'Administrador' : 'Usuario');

            let imagenUrl = null;
            if (!isAdmin) {
                imagenUrl = respuesta.data.imagen?.url ||
                    respuesta.data.avatar ||
                    respuesta.data.profilePicture ||
                    null;
            }

            const fullImagenUrl = !isAdmin && imagenUrl && !imagenUrl.startsWith('http')
                ? `${import.meta.env.VITE_BACKEND_URL}${imagenUrl.replace(/^\//, '')}`
                : imagenUrl;

            localStorage.setItem('rol', rol);
            setAuth({
                ...respuesta.data,
                token,
                rol,
                imagen: isAdmin ? undefined : {
                    url: fullImagenUrl,
                    ...respuesta.data.imagen
                }
            });

            return respuesta.data;
        } catch (error) {
            console.error('Error al obtener el perfil:', error.response?.data?.msg || error.message);
            logout();
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const actualizarPerfil = async (datos) => {
        const token = localStorage.getItem('token');
        try {
            const id = datos.get?.('id') || datos.id;
            if (!id) {
                throw new Error("ID no proporcionado");
            }

            const url = auth.rol === 'Administrador'
                ? `${import.meta.env.VITE_BACKEND_URL}api/perfil/${id}`
                : `${import.meta.env.VITE_BACKEND_URL}api/usuario/actualizar-perfil/${id}`;

            const options = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    ...(datos instanceof FormData ? {} : { 'Content-Type': 'application/json' })
                }
            };

            const respuesta = await axios.put(url, datos, options);
            return { respuesta: respuesta.data.msg, tipo: true };
        } catch (error) {
            console.error('Error detallado:', error.response?.data);
            return {
                respuesta: error.response?.data?.msg || "Error al actualizar el perfil",
                tipo: false
            };
        }
    };
   const actualizarPassword = async (datos) => {
        const token = localStorage.getItem('token');
        try {
            if (!auth.token || (!auth.email && !auth._id)) {
                throw new Error("Sesión inválida. Vuelve a iniciar sesión");
            }

            if (!datos.passwordactual || !datos.passwordnuevo) {
                throw new Error("Debes ingresar ambas contraseñas");
            }

            let url;
            if (auth.rol === 'Administrador') {
                url = `${import.meta.env.VITE_BACKEND_URL}api/actualizar-password`;
            } else {
                url = `${import.meta.env.VITE_BACKEND_URL}api/usuario/actualizar-password`;
            }

            const payload = {
                email: auth.email,
                passwordactual: datos.passwordactual,
                passwordnuevo: datos.passwordnuevo
            };

            console.log(`[${auth.rol}] Enviando a:`, url, "Datos:", payload);

            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };

            const respuesta = await axios.put(url, payload, options);
            return { respuesta: respuesta.data.msg, tipo: true };

        } catch (error) {
            console.error(`Error [${auth.rol}]:`, {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message
            });

            return {
                respuesta: error.response?.data?.msg || "Error al actualizar contraseña",
                tipo: false
            };
        }
    };

    const login = async (credenciales) => {
        try {
            setLoading(true);

            try {
                const urlAdmin = `${import.meta.env.VITE_BACKEND_URL}api/login`;
                const respuestaAdmin = await axios.post(urlAdmin, credenciales);

                if (respuestaAdmin.data?.token) {
                    localStorage.setItem('token', respuestaAdmin.data.token);
                    try {
                        const perfilData = await perfil(respuestaAdmin.data.token);
                        return {
                            success: true,
                            rol: 'Administrador',
                            redirectTo: '/dashboard',
                            userData: perfilData
                        };
                    } catch (perfilError) {
                        console.error("Error obteniendo perfil admin:", perfilError);
                        throw new Error('Error al cargar perfil de administrador');
                    }
                }
            } catch (adminError) {
                console.log("Intento como admin falló, probando como usuario...");
            }

            try {
                const urlUsuario = `${import.meta.env.VITE_BACKEND_URL}api/usuario/login`;
                const respuestaUsuario = await axios.post(urlUsuario, credenciales);

                if (respuestaUsuario.data?.token) {
                    localStorage.setItem('token', respuestaUsuario.data.token);
                    try {
                        const perfilData = await perfil(respuestaUsuario.data.token);
                        return {
                            success: true,
                            rol: 'Usuario',
                            redirectTo: '/users/dashboard',
                            userData: perfilData
                        };
                    } catch (perfilError) {
                        console.error("Error obteniendo perfil usuario:", perfilError);
                        throw new Error('Error al cargar perfil de usuario');
                    }
                }
            } catch (userError) {
                console.error("Error en login usuario:", userError);
            }

            throw new Error('Credenciales incorrectas o servicio no disponible');

        } catch (error) {
            logout();
            let errorMessage = 'Error al iniciar sesión';

            if (error.message.includes('Credenciales')) {
                errorMessage = 'Correo o contraseña incorrectos';
            } else if (error.response) {
                errorMessage = error.response.data?.msg ||
                    `Error del servidor (${error.response.status})`;
            }

            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    };
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('rol');
        setAuth({});
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const rol = localStorage.getItem('rol');

        if (token) {
            perfil(token)
                .then(() => {
                    if (window.location.pathname === '/unauthorized') {
                        navigate(rol === 'Administrador' ? '/dashboard' : '/users/dashboard');
                    }
                })
                .catch(() => {
                    logout();
                })
                .finally(() => {
                    setAuthChecked(true);
                });
        } else {
            setAuthChecked(true);
        }
    }, [navigate]);

    return (
        <AuthContext.Provider
            value={{
                auth,
                loading,
                authChecked,
                setAuth,
                login,
                logout,
                perfil,
                actualizarPerfil,
                actualizarPassword,
                isAuthenticated: !!auth.token,
                isAdmin: auth.rol === 'Administrador'
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider };
export default AuthContext;