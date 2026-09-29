import { render, fireEvent } from '@testing-library/react';
import Checkout from '../pages/Checkout';
import { db } from '../db';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

// Require react testing hooks
describe('Checkout Component', () => {
  const wrapRender = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

  it('9. Pruebas de Eventos (Formularios): No permite submit si campos están vacíos', () => {
    spyOn(db, 'getCarrito').and.returnValue([{ id: 1, precio: 100, cantidad: 1 }]);
    wrapRender(<Checkout />);
    const btn = document.querySelector('button[type="submit"]');
    fireEvent.click(btn);
    expect(document.body.textContent).toContain('Todos los campos son obligatorios');
  });

  it('10. Gestión de Estado: Actualiza state al escribir en inputs y cambia vista on submit', () => {
    spyOn(db, 'getCarrito').and.returnValue([{ id: 1, precio: 100, cantidad: 1 }]);
    spyOn(db, 'addPedido');
    spyOn(db, 'clearCarrito');
    
    wrapRender(<Checkout />);
    
    const inputs = document.querySelectorAll('input');
    // Simulate user typing
    fireEvent.change(inputs[0], { target: { value: 'Juan Perez' } });
    fireEvent.change(inputs[1], { target: { value: 'Calle 123' } });
    
    const btn = document.querySelector('button[type="submit"]');
    fireEvent.click(btn);
    
    expect(db.addPedido).toHaveBeenCalled();
    expect(db.clearCarrito).toHaveBeenCalled();
  });
});
