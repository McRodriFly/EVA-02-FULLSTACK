import { useState, useEffect } from "react";
import { db } from "../db";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    setProductos(db.getProductos());
  }, []);

  return (
    <div>
      <h2 className="mb-4">Catálogo de Productos</h2>
      <div className="row g-4">
        {productos.map(p => (
          <div className="col-12 col-md-4" key={p.id}>
            <ProductCard producto={p} />
          </div>
        ))}
        {productos.length === 0 && <p>No hay productos disponibles.</p>}
      </div>
    </div>
  );
}