import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = ({ children, requiredRole }) => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("rol");
    
    // Si no está autenticado, redirige al login
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    
    // Si se especificó un rol requerido y el usuario no lo tiene
    if (requiredRole && userRole !== requiredRole) {
        return <Navigate to="/unauthorized" replace />;
    }
    
    // Si es una ruta anidada (usando Outlet)
    if (children === undefined) {
        return <Outlet />;
    }
    
    return children;
};