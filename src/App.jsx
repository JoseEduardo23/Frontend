import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LandingPage } from './paginas/landingPage'
import Auth from './layout/Auth'
import Login from './paginas/Login'
import { Register } from './paginas/Register'
import { AuthProvider } from './Context/AuthProvider'
import { Forgot } from './paginas/Forgot'
import { Confirmar } from './paginas/Confirmar'
import Restablecer from './paginas/Restablecer'
import { NotFound } from './paginas/NotFound'
import { PrivateRoute } from './routes/privateRoutes'
import Dashboard from './layout/Dashboard'
import Perfil from './paginas/Perfil'
import Listar from './paginas/Listar'
import Visualizar from './paginas/Visualizar'
import Crear from './paginas/Crear'
import Actualizar from './paginas/Actualizar'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          <Route index element={<LandingPage />} />

          {/* Rutas públicas */}
          <Route path="/" element={<Auth />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot/:id" element={<Forgot />} />
            <Route path="confirmar/:token" element={<Confirmar />} />
            <Route path="recuperar-password/:token" element={<Restablecer />} />
          </Route>

          {/* Rutas privadas */}
          <Route path="dashboard/*" element={ 
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }>
            <Route index element={<Perfil />} />
            <Route path="listar" element={<Listar />} />
            <Route path="visualizar/:id" element={<Visualizar />} />
            <Route path="crear" element={<Crear />} />
            <Route path="actualizar/:id" element={<Actualizar />} />
          </Route>

          {/* Ruta 404 */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App