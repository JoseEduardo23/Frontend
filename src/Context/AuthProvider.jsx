import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true);

    const perfil = async (token) => {
        try {
            // Primero intentamos como administrador
            try {
                const urlAdmin = `${import.meta.env.VITE_BACKEND_URL}api/perfil`;
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                };

                const respuestaAdmin = await axios.get(urlAdmin, options);

                localStorage.setItem('rol', respuestaAdmin.data.rol || 'Administrador');
                setAuth({
                    ...respuestaAdmin.data,
                    token,
                    rol: respuestaAdmin.data.rol || 'Administrador'
                });

                return respuestaAdmin.data;
            } catch (adminError) {
                const urlUsuario = `${import.meta.env.VITE_BACKEND_URL}api/usuario/perfil`;
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                };

                const respuestaUsuario = await axios.get(urlUsuario, options);

                localStorage.setItem('rol', respuestaUsuario.data.rol || 'Usuario');
                setAuth({
                    ...respuestaUsuario.data,
                    token,
                    rol: respuestaUsuario.data.rol || 'Usuario'
                });

                return respuestaUsuario.data;
            }
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
            let url;

            // Primero intentamos como administrador
            try {
                url = `${import.meta.env.VITE_BACKEND_URL}api/login`;
                const respuestaAdmin = await axios.post(url, credenciales);

                if (respuestaAdmin.data.token) {
                    localStorage.setItem('token', respuestaAdmin.data.token);
                    const perfilData = await perfil(respuestaAdmin.data.token);
                    return {
                        success: true,
                        rol: perfilData.rol || 'Administrador',
                        redirectTo: '/dashboard'
                    };
                }
            } catch (adminError) {
                // Si falla como admin, intentamos como usuario normal
                url = `${import.meta.env.VITE_BACKEND_URL}api/usuario/login`;
                const respuestaUsuario = await axios.post(url, credenciales);

                if (respuestaUsuario.data.token) {
                    localStorage.setItem('token', respuestaUsuario.data.token);
                    const perfilData = await perfil(respuestaUsuario.data.token);
                    return {
                        success: true,
                        rol: perfilData.rol || 'Usuario',
                        redirectTo: '/users/dashboard'
                    };
                }
            }

            throw new Error('Credenciales incorrectas');
        } catch (error) {
            logout();
            throw error;
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
        if (token) {
            perfil(token).catch(() => logout());
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                auth,
                loading,
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