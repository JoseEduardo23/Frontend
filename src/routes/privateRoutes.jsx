export const PrivateRoute = ({ children, allowedRoles = [] }) => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("rol");
    
    console.log('Autenticación - Token:', !!token);
    console.log('Rol del usuario:', userRole);
    console.log('Roles permitidos:', allowedRoles);

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
        console.log('Acceso denegado - Rol no permitido');
        return <Navigate to="/unauthorized" replace />;
    }

    return children || <Outlet />;
};