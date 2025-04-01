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
import Cliente_dashboard from './paginas/Clientes/Cliente_dashboard';
import Clientes from './paginas/Clientes/Clientes';
import Cliente_listar from './paginas/Clientes/Cliente.listar';
import Cliente_perfil from './paginas/Clientes/perfil_cli';
import Configuracion from './components/Configuracion';

//Mascotas
import Pet_register from './paginas/Mascotas/Pet_register';

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
              <PrivateRoute allowedRoles={["Administrador"]}>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route index element={<Perfil />} />
            <Route path="productos/*" element={<Productos />}>
              <Route path="listar" element={<Listar />} />
              <Route path="visualizar/:id" element={<Visualizar />} />
              <Route path="crear" element={<Crear />} />
              <Route path="actualizar/:id" element={<Actualizar />} />
            </Route>
            <Route path="clientes/*" element={<Clientes />}>
              <Route path="clientes_listar" element={<Cliente_listar />} />
            </Route>
          </Route>

          <Route 
            path="/users/dashboard" 
            element={
              <PrivateRoute allowedRoles={["Usuario"]}>
                <Cliente_dashboard/>
              </PrivateRoute>
            } 
          >
            <Route index element={<Cliente_perfil/>} />
            <Route path="registrar_mascota" element={<Pet_register />}/>
            <Route path="configuracion" element={<Configuracion />}/>

          </Route>

          {/* Ruta 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;