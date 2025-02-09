import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthContext from '../../Context/AuthProvider';
import Login from '../Login';
import { describe, test, expect } from 'vitest';
import React from 'react';

describe('Login Component', () => {
  test('debe permitir escribir en los campos del formulario', () => {
    render(
      <Router>
        <AuthContext.Provider value={{ setAuth: () => {} }}>
          <Login />
        </AuthContext.Provider>
      </Router>
    );

    // Simula escritura en los campos
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password123' },
    });

    // Verifica que los valores se han actualizado
    expect(screen.getByLabelText(/Email/i).value).toBe('test@example.com');
    expect(screen.getByLabelText(/Password/i).value).toBe('password123');
  });

  test('debe permitir escribir en los campos del formulario', () => {
    render(
      <Router>
        <AuthContext.Provider value={{ setAuth: () => {} }}>
          <Login />
        </AuthContext.Provider>
      </Router>
    );

    // Simula escritura en los campos
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password123' },
    });

    // Verifica que los valores se han actualizado
    expect(screen.getByLabelText(/Email/i).value).toBe('test@example.com');
    expect(screen.getByLabelText(/Password/i).value).toBe('password123');
  });

  test('debe permitir escribir en los campos del formulario', () => {
    render(
      <Router>
        <AuthContext.Provider value={{ setAuth: () => {} }}>
          <Login />
        </AuthContext.Provider>
      </Router>
    );

    // Simula escritura en los campos
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password123' },
    });

    // Verifica que los valores se han actualizado
    expect(screen.getByLabelText(/Email/i).value).toBe('test@example.com');
    expect(screen.getByLabelText(/Password/i).value).toBe('password123');
  });
});