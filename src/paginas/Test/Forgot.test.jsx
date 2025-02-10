import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';
import axios from 'axios';
import { Forgot } from '../Forgot';
import { ToastContainer } from 'react-toastify';
import React from 'react';
vi.mock('axios');

describe('Componente Forgot', () => {
  const mailValido = { email: 'test@example.com' };
  const mailInvalido = { email: '' };

  it('debería mostrar el formulario correctamente', () => {
    render(
      <MemoryRouter>
        <Forgot />
      </MemoryRouter>
    );

    // Verificamos que los elementos del formulario estén presentes
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your email/i)).toBeInTheDocument();
    expect(screen.getByText(/Send email/i)).toBeInTheDocument();
  });

  it('debería hacer la solicitud POST correctamente cuando se envía el formulario con un correo válido', async () => {
    const mockResponse = { msg: 'Correo enviado correctamente' };
    
    // Simulamos una respuesta exitosa de la API
    axios.post.mockResolvedValueOnce({ data: mockResponse });

    render(
      <MemoryRouter>
        <Forgot />
      </MemoryRouter>
    );

    // Simulamos que el usuario ingresa el correo
    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), {
      target: { value: mailValido.email }
    });

    // Simulamos el envío del formulario
    fireEvent.click(screen.getByText(/Send email/i));

    // Verificamos que el modal de éxito se muestra
    await waitFor(() => expect(screen.getByText(/Success!/i)).toBeInTheDocument());
    expect(screen.getByText(/El correo de confirmación ha sido enviado a su correo electrónico revise./i)).toBeInTheDocument();
  });

  it('debería mostrar un error si la solicitud POST falla', async () => {
    const mockError = { response: { data: { msg: 'Error al enviar el correo' } } };

    // Simulamos un error en la solicitud
    axios.post.mockRejectedValueOnce(mockError);

    render(
      <MemoryRouter>
        <Forgot />
      </MemoryRouter>
    );

    // Simulamos que el usuario ingresa el correo
    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), {
      target: { value: mailValido.email }
    });

    // Simulamos el envío del formulario
    fireEvent.click(screen.getByText(/Send email/i));

    // Verificamos que se muestre el error en el toast
    await waitFor(() => expect(screen.getByText('Error al enviar el correo')).toBeInTheDocument());
  });

  it('debería cerrar el modal cuando se hace clic en el botón de cerrar', async () => {
    axios.post.mockResolvedValueOnce({ data: { msg: 'Correo enviado correctamente' } });

    render(
      <MemoryRouter>
        <Forgot />
      </MemoryRouter>
    );

    // Simulamos que el usuario ingresa el correo
    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), {
      target: { value: mailValido.email }
    });

    // Simulamos el envío del formulario
    fireEvent.click(screen.getByText(/Send email/i));

    // Esperamos que el modal de éxito esté visible
    await waitFor(() => expect(screen.getByText(/Success!/i)).toBeInTheDocument());

    // Simulamos el clic en el botón de cerrar
    fireEvent.click(screen.getByText(/Close/i));

    // Verificamos que el modal ya no esté visible
    await waitFor(() => expect(screen.queryByText(/Success!/i)).not.toBeInTheDocument());
  });

  it('debería redirigir al login cuando se hace clic en el enlace de login', () => {
    render(
      <MemoryRouter initialEntries={['/forgot-password']}>
        <Routes>
          <Route path="/forgot-password" element={<Forgot />} />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    const loginLink = screen.getByText(/Login/i);
    fireEvent.click(loginLink);

    // Verificamos que se haya navegado a la página de login
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });
});