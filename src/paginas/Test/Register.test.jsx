import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { Register } from '../Register';
import React from 'react';
vi.mock('axios');

describe('Componente Register', () => {

  it('debería renderizar correctamente el formulario y los campos de entrada', () => {
    render(<Register />);

    expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Apellido/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Dirección/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Teléfono/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
  });

  it('debería actualizar los campos del formulario al escribir', async () => {
    render(<Register />);

    userEvent.type(screen.getByLabelText(/Nombre/i), 'Juan');
    userEvent.type(screen.getByLabelText(/Apellido/i), 'Pérez');
    userEvent.type(screen.getByLabelText(/Dirección/i), 'Calle Ficticia 123');
    userEvent.type(screen.getByLabelText(/Teléfono/i), '098739494');
    userEvent.type(screen.getByLabelText(/Email/i), 'juan.perez@example.com');
    userEvent.type(screen.getByLabelText(/Contraseña/i), 'contraseña123');

    expect(screen.getByLabelText(/Nombre/i).value).toBe('Juan');
    expect(screen.getByLabelText(/Apellido/i).value).toBe('Pérez');
    expect(screen.getByLabelText(/Dirección/i).value).toBe('Calle Ficticia 123');
    expect(screen.getByLabelText(/Teléfono/i).value).toBe('098739494');
    expect(screen.getByLabelText(/Email/i).value).toBe('juan.perez@example.com');
    expect(screen.getByLabelText(/Contraseña/i).value).toBe('contraseña123');
  });

  it('debería mostrar un mensaje de éxito cuando el registro sea exitoso', async () => {
    axios.post.mockResolvedValueOnce({ data: { msg: '¡Usuario registrado correctamente!' } });

    render(<Register />);

    userEvent.type(screen.getByLabelText(/Nombre/i), 'Juan');
    userEvent.type(screen.getByLabelText(/Apellido/i), 'Pérez');
    userEvent.type(screen.getByLabelText(/Dirección/i), 'Calle Ficticia 123');
    userEvent.type(screen.getByLabelText(/Teléfono/i), '098739494');
    userEvent.type(screen.getByLabelText(/Email/i), 'juan.perez@example.com');
    userEvent.type(screen.getByLabelText(/Contraseña/i), 'contraseña123');

    userEvent.click(screen.getByText(/Registrar/i));

    await waitFor(() => expect(screen.getByText('¡Usuario registrado correctamente!')).toBeInTheDocument());
  });

  it('debería mostrar un mensaje de error cuando el registro falle', async () => {
    axios.post.mockRejectedValueOnce({ response: { data: { msg: 'Error al registrar el usuario.' } } });

    render(<Register />);

    userEvent.type(screen.getByLabelText(/Nombre/i), 'Juan');
    userEvent.type(screen.getByLabelText(/Apellido/i), 'Pérez');
    userEvent.type(screen.getByLabelText(/Dirección/i), 'Calle Ficticia 123');
    userEvent.type(screen.getByLabelText(/Teléfono/i), '098739494');
    userEvent.type(screen.getByLabelText(/Email/i), 'juan.perez@example.com');
    userEvent.type(screen.getByLabelText(/Contraseña/i), 'contraseña123');

    userEvent.click(screen.getByText(/Registrar/i));

    await waitFor(() => expect(screen.getByText('Error al registrar el usuario.')).toBeInTheDocument());
  });

  it('debería redirigir a la página de login al hacer clic en el enlace de login', () => {
    render(<Register />);

    userEvent.click(screen.getByText(/Iniciar sesión/i));
    expect(window.location.pathname).toBe('/login');
  });

});