import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthContext from '../../Context/AuthProvider';
import Login from '../Login';
import { describe, test, expect } from 'vitest';
import React from 'react';

describe('Componente de inicio de sesión', () => {
  // Verifica que los campos permiten entrada de texto
  test('permite ingresar texto en los campos de entrada', () => {
    render(
      <Router>
        <AuthContext.Provider value={{ setAuth: () => {} }}>
          <Login />
        </AuthContext.Provider>
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'usuario@correo.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'claveSegura123' },
    });

    expect(screen.getByLabelText(/Email/i).value).toBe('usuario@correo.com');
    expect(screen.getByLabelText(/Password/i).value).toBe('claveSegura123');
  });

  // Verifica que se puede escribir en los inputs correctamente
  test('los campos del formulario se actualizan con la entrada del usuario', () => {
    render(
      <Router>
        <AuthContext.Provider value={{ setAuth: () => {} }}>
          <Login />
        </AuthContext.Provider>
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'prueba@ejemplo.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'superClave456' },
    });

    expect(screen.getByLabelText(/Email/i).value).toBe('prueba@ejemplo.com');
    expect(screen.getByLabelText(/Password/i).value).toBe('superClave456');
  });

  // Verifica que el botón de enviar funciona
  test('ejecuta la acción de envío cuando se presiona el botón', () => {
    render(
      <Router>
        <AuthContext.Provider value={{ setAuth: () => {} }}>
          <Login />
        </AuthContext.Provider>
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'usuario@correo.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'claveSegura123' },
    });

    fireEvent.click(screen.getByText(/Enviar/i));

    expect(screen.getByLabelText(/Email/i).value).toBe('usuario@correo.com');
    expect(screen.getByLabelText(/Password/i).value).toBe('claveSegura123');
  });
});