import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import { Confirmar } from '../Confirmar';
import React from 'react';
vi.mock('axios');

describe('Componente Confirmar', () => {
  const tokenValido = 'valid-token';
  const tokenInvalido = 'invalid-token';

  it('debería mostrar el mensaje de éxito cuando el token es válido', async () => {
    const mensajeExito = 'Tu cuenta ha sido confirmada. Ya puedes iniciar sesión.';
    
    // Simulamos una respuesta exitosa de la API
    axios.get.mockResolvedValueOnce({ data: { msg: mensajeExito } });

    render(
      <MemoryRouter initialEntries={[`/confirmar/${tokenValido}`]}>
        <Routes>
          <Route path="/confirmar/:token" element={<Confirmar />} />
        </Routes>
      </MemoryRouter>
    );

    // Esperamos que el mensaje de éxito se muestre
    await waitFor(() => expect(screen.getByText(/Muchas Gracias/i)).toBeInTheDocument());
    expect(screen.getByText(mensajeExito)).toBeInTheDocument();
  });

  it('debería mostrar el mensaje de error cuando el token es inválido', async () => {
    const mensajeError = 'Hubo un error al confirmar el token';
    
    // Simulamos un error en la respuesta de la API
    axios.get.mockRejectedValueOnce({
      response: { data: { msg: mensajeError } }
    });

    render(
      <MemoryRouter initialEntries={[`/confirmar/${tokenInvalido}`]}>
        <Routes>
          <Route path="/confirmar/:token" element={<Confirmar />} />
        </Routes>
      </MemoryRouter>
    );

    // Esperamos que el mensaje de error se muestre
    await waitFor(() => expect(screen.getByText(mensajeError)).toBeInTheDocument());
  });

  it('debería redirigir al login cuando se hace clic en el enlace "Ir al Login"', async () => {
    axios.get.mockResolvedValueOnce({ data: { msg: 'Tu cuenta ha sido confirmada. Ya puedes iniciar sesión.' } });

    render(
      <MemoryRouter initialEntries={[`/confirmar/${tokenValido}`]}>
        <Routes>
          <Route path="/confirmar/:token" element={<Confirmar />} />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    const loginLink = screen.getByText(/Ir al Login/i);
    userEvent.click(loginLink);

    // Verificamos que se haya navegado a la página de login
    await waitFor(() => expect(screen.getByText('Login Page')).toBeInTheDocument());
  });
});