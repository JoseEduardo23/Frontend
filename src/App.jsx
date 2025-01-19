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
              </Routes>
          </AuthProvider>
        </BrowserRouter>
      </>
    )
  }
  
  export default App
