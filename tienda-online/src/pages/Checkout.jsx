import { useState } from "react";
import { db } from "../db";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const [formData, setFormData] = useState({ nombre: "", direccion: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.direccion) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    const carrito = db.getCarrito();
    if (carrito.length === 0) {
      setError("El carrito está vacío.");
      return;
    }

    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    db.addPedido({
      usuario: formData.nombre,
      direccionEnvio: formData.direccion,
      total,
      estado: "Completado",
      fecha: new Date().toISOString()
    });
    db.clearCarrito();
    navigate("/compra-exitosa");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h2 className="mb-4">Finalizar Compra</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit} className="card p-4 shadow-sm border-0">
          <div className="mb-3">
            <label className="form-label">Nombre Completo</label>
            <input 
              type="text" 
              className="form-control" 
              value={formData.nombre}
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Dirección de Envío</label>
            <input 
              type="text" 
              className="form-control" 
              value={formData.direccion}
              onChange={(e) => setFormData({...formData, direccion: e.target.value})}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Confirmar Pago</button>
        </form>
      </div>
    </div>
  );
}