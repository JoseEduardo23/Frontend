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
            // Verificamos primero si el token es de admin o usuario
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

            localStorage.setItem('rol', rol);
            setAuth({
                ...respuesta.data,
                token,
                rol,
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
            const url = auth.rol === 'Administrador'
                ? `${import.meta.env.VITE_BACKEND_URL}api/perfil/${datos.id}`
                : `${import.meta.env.VITE_BACKEND_URL}api/usuario/actualizar-perfil/${datos.id}`;

            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            };

            const { id, ...datosParaEnviar } = datos;

            const respuesta = await axios.put(url, datosParaEnviar, options);
            await perfil(token);

            return {
                respuesta: respuesta.data.msg || "Perfil actualizado correctamente",
                tipo: true
            };
        } catch (error) {
            console.error('Error al actualizar perfil:', error);
            return {
                respuesta: error.response?.data?.msg || "Error al actualizar el perfil",
                tipo: false
            };
        }
    };
    const actualizarPassword = async (datos) => {
        const token = localStorage.getItem('token');
        try {
            // Determinamos la URL basada en el rol
            const url = auth.rol === 'Administrador'
                ? `${import.meta.env.VITE_BACKEND_URL}api/actualizar-password`
                : `${import.meta.env.VITE_BACKEND_URL}api/usuario/actualizar-password`;

            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
            const respuesta = await axios.put(url, datos, options);
            return { respuesta: respuesta.data.msg, tipo: true };
        } catch (error) {
            return { respuesta: error.response?.data?.msg || error.message, tipo: false };
        }
    };

    const login = async (credenciales) => {
        try {
            setLoading(true);

            // Intento como administrador
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

            // Intento como usuario normal
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

            // Si llegamos aquí, ambos intentos fallaron
            throw new Error('Credenciales incorrectas o servicio no disponible');

        } catch (error) {
            logout();
            // Mejoramos el mensaje de error para el usuario final
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