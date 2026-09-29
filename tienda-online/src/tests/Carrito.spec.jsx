import { render, fireEvent } from '@testing-library/react';
import Carrito from '../pages/Carrito';
import { db } from '../db';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

describe('Carrito Component', () => {

  const wrapRender = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

  it('6. Renderizado condicional: Muestra "carrito vacío" si el estado es array vacío', () => {
    spyOn(db, 'getCarrito').and.returnValue([]);
    const { container } = wrapRender(<Carrito />);
    expect(container.textContent).toContain('El carrito está vacío');
  });

  it('7. Gestión de Estado: Muestra los items obtenidos desde db y renderiza listas', () => {
    spyOn(db, 'getCarrito').and.returnValue([
      { id: 1, nombre: 'Item 1', precio: 500, cantidad: 2 }
    ]);
    const { container } = wrapRender(<Carrito />);
    expect(container.textContent).toContain('Item 1');
    expect(container.textContent).toContain('Cantidad: 2');
    expect(container.textContent).toMatch(/1000/);
  });

  it('8. Eventos: Llama a removeFromCarrito al clickear Eliminar', () => {
    spyOn(db, 'getCarrito').and.returnValue([{ id: 2, nombre: 'Demo', precio: 100, cantidad: 1 }]);
    spyOn(db, 'removeFromCarrito');
    
    wrapRender(<Carrito />);
    const removeBtn = document.querySelector('button.btn-outline-danger');
    fireEvent.click(removeBtn);
    expect(db.removeFromCarrito).toHaveBeenCalledWith(2);
  });
});
