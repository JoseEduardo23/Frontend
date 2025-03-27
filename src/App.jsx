import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Context/AuthProvider';
import { PrivateRoute } from './routes/privateRoutes';
import Auth from './layout/Auth';

// Páginas públicas
import { LandingPage } from './paginas/landingPage';
import { Sobre } from './paginas/Sobre';
import { Contactos } from './paginas/Contactos';
import { Tienda } from './paginas/Tienda';
import { NotFound } from './paginas/NotFound';
import Unauthorized from './paginas/Unauthorized';

// Autenticación
import Login from './paginas/Login';
import { Register } from './paginas/Register';
import { Forgot } from './paginas/Forgot';
import { Confirmar } from './paginas/Confirmar';
import Restablecer from './paginas/Restablecer';

// Dashboard y perfil
import Dashboard from './layout/Dashboard';
import Perfil from './paginas/Perfil';

// Productos
import Productos from './paginas/Productos/Productos';
import Listar from './paginas/Productos/Listar';
import Visualizar from './paginas/Productos/Visualizar';
import Crear from './paginas/Productos/Crear';
import Actualizar from './paginas/Productos/Actualizar';

// Clientes
import Clientes from './paginas/Clientes/Clientes';
import Cliente_listar from './paginas/Clientes/Cliente.listar';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rutas públicas */}
          <Route index element={<LandingPage />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contactos" element={<Contactos />} />
          <Route path="/tienda" element={<Tienda />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Rutas de autenticación */}
          <Route path="/" element={<Auth />}>
            <Route path="login" element={<Login />} />
            <Route path="registro" element={<Register />} />
            <Route path="forgot/:id" element={<Forgot />} />
            <Route path="confirmar/:token" element={<Confirmar />} />
            <Route path="recuperar-password/:token" element={<Restablecer />} />
          </Route>

          {/* Rutas del dashboard - Solo para Administradores */}
          <Route 
            path="dashboard/*" 
            element={
              <PrivateRoute requiredRole="Administrador">
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route index element={<Perfil />} />

            {/* Rutas de productos */}
            <Route path="productos/*" element={<Productos />}>
              <Route path="listar" element={<Listar />} />
              <Route path="visualizar/:id" element={<Visualizar />} />
              <Route path="crear" element={<Crear />} />
              <Route path="actualizar/:id" element={<Actualizar />} />
            </Route>
 
            {/* Rutas de clientes */}
            <Route path="clientes/*" element={<Clientes />}>
              <Route path="clientes_listar" element={<Cliente_listar />} />
            </Route>
          </Route>

          {/* Ruta para usuarios normales */}
          <Route 
            path="/assets" 
            element={
              <PrivateRoute requiredRole="Usuario">
                <div>Página de Assets para Usuarios</div>
              </PrivateRoute>
            } 
          />


          {/* Ruta 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;