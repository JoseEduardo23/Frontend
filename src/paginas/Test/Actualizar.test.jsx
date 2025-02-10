import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Actualizar from '../Actualizar';
import axios from 'axios';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

vi.mock('axios');

describe('Componente Actualizar', () => {
  const productoData = {
    id: '1',
    nombre: 'Producto de prueba',
    descripcion: 'Descripción del producto',
    precio: 100,
  };

  it('debería consultar el producto y renderizar el formulario con los datos cuando la consulta es exitosa', async () => {
    // Mock de la respuesta de la API
    axios.get.mockResolvedValueOnce({ data: productoData });

    render(
      <MemoryRouter initialEntries={['/actualizar/1']}>
        <Actualizar />
      </MemoryRouter>
    );

    // Esperamos que el formulario con los datos del producto se haya renderizado
    await waitFor(() => expect(screen.getByLabelText(/Nombre/i)).toHaveValue(productoData.nombre));
    expect(screen.getByLabelText(/Descripción/i)).toHaveValue(productoData.descripcion);
    expect(screen.getByLabelText(/Precio/i)).toHaveValue(productoData.precio);
  });

  it('debería mostrar un mensaje de error cuando el producto no se encuentre', async () => {
    // Mock de la respuesta de la API cuando el producto no se encuentra
    axios.get.mockResolvedValueOnce({ data: null });

    render(
      <MemoryRouter initialEntries={['/actualizar/1']}>
        <Actualizar />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Producto no encontrado o respuesta incorrecta/i)).toBeInTheDocument();
    });
  });

  it('debería mostrar un mensaje de error cuando ocurre un fallo en la consulta a la API', async () => {
    // Mock de un error en la consulta de la API
    axios.get.mockRejectedValueOnce({
      response: { data: { msg: 'Error en la consulta' } },
    });

    render(
      <MemoryRouter initialEntries={['/actualizar/1']}>
        <Actualizar />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Error en la consulta/i)).toBeInTheDocument();
    });
  });
});