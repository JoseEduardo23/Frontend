import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';
import axios from 'axios';
import Restablecer from '../Restablecer';
import { ToastContainer } from 'react-toastify';
import React from 'react';
vi.mock('axios');

describe('Componente Restablecer', () => {
    const tokenValido = 'validToken';
    const tokenInvalido = 'invalidToken';
    const formValido = {
        password: 'newPassword123',
        confirmpassword: 'newPassword123'
    };
    const formInvalido = {
        password: 'newPassword123',
        confirmpassword: 'mismatchPassword'
    };

    it('debería verificar el token y mostrar el formulario si el token es válido', async () => {
        const mockRespuestaTokenValido = { msg: 'Token verificado correctamente' };
        axios.get.mockResolvedValueOnce({ data: mockRespuestaTokenValido });

        render(
            <MemoryRouter initialEntries={[`/restablecer/${tokenValido}`]}>
                <Routes>
                    <Route path="/restablecer/:token" element={<Restablecer />} />
                </Routes>
            </MemoryRouter>
        );

        // Esperamos que el mensaje de verificación del token aparezca
        await waitFor(() => expect(screen.getByText('Verificando token, por favor espera...')).not.toBeInTheDocument());

        // Verificamos que los elementos del formulario estén presentes
        expect(screen.getByLabelText(/Nueva Contraseña/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Confirmar Contraseña/i)).toBeInTheDocument();
    });

    it('debería mostrar un mensaje de error si el token es inválido', async () => {
        const mockRespuestaTokenInvalido = { msg: 'Token inválido o expirado' };
        axios.get.mockRejectedValueOnce({ response: { data: mockRespuestaTokenInvalido } });

        render(
            <MemoryRouter initialEntries={[`/restablecer/${tokenInvalido}`]}>
                <Routes>
                    <Route path="/restablecer/:token" element={<Restablecer />} />
                </Routes>
            </MemoryRouter>
        );

        // Verificamos que el mensaje de error se muestre
        await waitFor(() => expect(screen.getByText('Token inválido o expirado')).toBeInTheDocument());
    });

    it('debería enviar el formulario correctamente si las contraseñas coinciden', async () => {
        const mockRespuestaRestablecer = { msg: 'Contraseña restablecida correctamente' };
        axios.post.mockResolvedValueOnce({ data: mockRespuestaRestablecer });

        render(
            <MemoryRouter initialEntries={[`/restablecer/${tokenValido}`]}>
                <Routes>
                    <Route path="/restablecer/:token" element={<Restablecer />} />
                </Routes>
            </MemoryRouter>
        );

        // Simulamos que el usuario ingresa las contraseñas
        fireEvent.change(screen.getByPlaceholderText(/Enter your new password/i), {
            target: { value: formValido.password }
        });
        fireEvent.change(screen.getByPlaceholderText(/Confirm you password/i), {
            target: { value: formValido.confirmpassword }
        });

        // Simulamos el envío del formulario
        fireEvent.click(screen.getByValue(/ENVIAR/i));

        // Verificamos que se muestre el mensaje de éxito
        await waitFor(() => expect(screen.getByText('Contraseña restablecida correctamente')).toBeInTheDocument());
    });

    it('debería mostrar un error si las contraseñas no coinciden', async () => {
        render(
            <MemoryRouter initialEntries={[`/restablecer/${tokenValido}`]}>
                <Routes>
                    <Route path="/restablecer/:token" element={<Restablecer />} />
                </Routes>
            </MemoryRouter>
        );

        // Simulamos que el usuario ingresa contraseñas que no coinciden
        fireEvent.change(screen.getByPlaceholderText(/Enter your new password/i), {
            target: { value: formInvalido.password }
        });
        fireEvent.change(screen.getByPlaceholderText(/Confirm you password/i), {
            target: { value: formInvalido.confirmpassword }
        });

        // Simulamos el envío del formulario
        fireEvent.click(screen.getByValue(/ENVIAR/i));

        // Verificamos que se muestre el mensaje de error correspondiente
        await waitFor(() => expect(screen.getByText('Las contraseñas no coinciden')).toBeInTheDocument());
    });
});