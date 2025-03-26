import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true); // Estado para manejar la carga inicial

    // Función para obtener el perfil del usuario
    const perfil = async (token) => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}api/perfil`;
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
            };

            const respuesta = await axios.get(url, options);
            
            // Guardar en localStorage y estado
            localStorage.setItem('rol', respuesta.data.rol || 'Usuario');
            setAuth({
                ...respuesta.data,
                token,
                rol: respuesta.data.rol || 'Usuario'
            });
            
            return respuesta.data;
        } catch (error) {
            console.error('Error al obtener el perfil:', error.response?.data?.msg || error.message);
            logout(); // Limpiar si hay error
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Función para actualizar perfil
    const actualizarPerfil = async (datos) => {
        const token = localStorage.getItem('token');
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}api/perfil/${datos.id}`;
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            };
            const respuesta = await axios.put(url, datos, options);
            await perfil(token); // Actualizar datos de perfil
            return { respuesta: respuesta.data.msg, tipo: true };
        } catch (error) {
            return { respuesta: error.response?.data?.msg || error.message, tipo: false };
        }
    };

    // Función para actualizar contraseña
    const actualizarPassword = async (datos) => {
        const token = localStorage.getItem('token');
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}api/actualizar-password`;
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

    // Función para login
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
                        redirectTo: '/assets'
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

    // Función para logout
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('rol');
        setAuth({});
    };

    // Verificar autenticación al cargar
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