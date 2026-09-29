import { render, fireEvent, screen } from '@testing-library/react';
import ProductCard from '../components/ProductCard';
import { db } from '../db';
import { BrowserRouter } from 'react-router-dom';

describe('ProductCard Component', () => {
  beforeEach(() => {
    spyOn(window, 'alert');
  });

  const productoMock = {
    id: 99,
    nombre: 'Producto Test',
    descripcion: 'P test prop',
    precio: 1000,
    oferta: false
  };

  it('1. Renderizado correcto: debe mostrar el titulo y precio correctamente', () => {
    const { container } = render(<ProductCard producto={productoMock} />);
    expect(container.textContent).toContain('Producto Test');
    expect(container.textContent).toContain('P test prop');
  });

  it('2. Propiedades Recibidas: verifica que reciba correctamente el precio formatado', () => {
    const { container } = render(<ProductCard producto={productoMock} />);
    expect(container.textContent).toMatch(/1000/);
  });

  it('3. Renderizado condicional: NO muestra el badge de oferta si oferta es false', () => {
    const { container } = render(<ProductCard producto={productoMock} />);
    expect(container.textContent).not.toContain('¡En Oferta!');
  });

  it('4. Renderizado condicional: SÍ muestra el badge de oferta si oferta es true', () => {
    const prodOferta = { ...productoMock, oferta: true };
    const { container } = render(<ProductCard producto={prodOferta} />);
    expect(container.textContent).toContain('¡En Oferta!');
  });

  it('5. Simulación de eventos: Al hacer click en Agregar a Carrito, actualiza la db', () => {
    spyOn(db, 'addToCarrito');
    render(<ProductCard producto={productoMock} />);
    const btn = document.querySelector('button.btn-primary');
    fireEvent.click(btn);
    expect(db.addToCarrito).toHaveBeenCalledWith(productoMock);
    expect(window.alert).toHaveBeenCalledWith('Producto Test añadido al carrito');
  });
});
