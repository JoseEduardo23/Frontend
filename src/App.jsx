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



function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>

            <Route index element={<LandingPage />} />

            <Route path='/' element={<Auth />}>
              <Route path='login' element={<Login />} />
              <Route path='register' element={<Register />} />
              <Route path='forgot/:id' element={<Forgot />} />
              <Route path='confirmar/:token' element={<Confirmar />} />
              <Route path='recuperar-password/:token' element={<Restablecer />} />
              <Route path='*' element={<NotFound />} />
            </Route>


                /*Rutas privadas*/
            <Route path='dashboard/*' element={
              <PrivateRoute>
                <Routes>
                  <Route element={<Dashboard />} />
                  <Route index element={<Perfil />} />
                  <Route path='/listar' element={<Listar/>}/>
                </Routes>
              </PrivateRoute>
            }>
            </Route>
                /*Rutas privadas*/

          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
