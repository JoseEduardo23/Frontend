import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children, allowedRoles = [] }) => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("rol");
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
        console.log('Acceso denegado - Rol no permitido');
        return <Navigate to="/unauthorized" replace />;
    }

    return children || <Outlet />;
};