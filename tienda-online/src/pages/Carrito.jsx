import { useState, useEffect } from "react";
import { db } from "../db";
import { Link, useNavigate } from "react-router-dom";

export default function Carrito() {
  const [carrito, setCarrito] = useState([]);
  const navigate = useNavigate();

  const loadCarrito = () => setCarrito(db.getCarrito());

  useEffect(() => {
    loadCarrito();
  }, []);

  const handleRemove = (id) => {
    db.removeFromCarrito(id);
    loadCarrito();
  };

  const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  return (
    <div>
      <h2 className="mb-4">Mi Carrito</h2>
      {carrito.length === 0 ? (
        <div className="alert alert-info">El carrito está vacío. <Link to="/">Volver al inicio</Link></div>
      ) : (
        <>
          <ul className="list-group mb-4">
            {carrito.map(item => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="my-0">{item.nombre}</h6>
                  <small className="text-muted">Cantidad: {item.cantidad}</small>
                </div>
                <div className="d-flex align-items-center">
                  <span className="me-3 text-success fw-bold">${(item.precio * item.cantidad).toLocaleString()}</span>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleRemove(item.id)}>Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="card">
            <div className="card-body d-flex justify-content-between">
              <h4 className="mb-0">Total: ${total.toLocaleString()}</h4>
              <button className="btn btn-success" onClick={() => navigate("/checkout")}>Proceder al Pago</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}