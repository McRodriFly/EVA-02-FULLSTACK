import { useState, useEffect } from "react";
import { db } from "../db";
import ProductCard from "../components/ProductCard";

export default function Ofertas() {
  const [productosOferta, setProductosOferta] = useState([]);

  useEffect(() => {
    const todos = db.getProductos();
    setProductosOferta(todos.filter(p => p.oferta));
  }, []);

  return (
    <div>
      <h2 className="mb-4 text-danger rounded">🔥 Ofertas Especiales</h2>
      <div className="row g-4">
        {productosOferta.map(p => (
          <div className="col-12 col-md-4" key={p.id}>
            <ProductCard producto={p} />
          </div>
        ))}
        {productosOferta.length === 0 && <p>No hay ofertas en este momento.</p>}
      </div>
    </div>
  );
}