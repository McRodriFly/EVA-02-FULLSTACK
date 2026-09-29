import { db } from "../db";

export default function ProductCard({ producto }) {
  const handleAdd = () => {
    db.addToCarrito(producto);
    alert(`${producto.nombre} añadido al carrito`);
  };

  return (
    <div className="card h-100 p-2">
      <div className="card-body text-center d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title fw-bold mb-3">{producto.nombre}</h5>
          {producto.oferta && <span className="badge bg-danger mb-3">¡En Oferta!</span>}
          <p className="card-text text-muted small">{producto.descripcion}</p>
        </div>
        <div className="mt-4">
          <p className="card-text fs-4 fw-bold text-dark mb-3">${producto.precio.toLocaleString()}</p>
          <button className="btn btn-primary w-100" onClick={handleAdd}>Agregar a Carrito</button>
        </div>
      </div>
    </div>
  );
}