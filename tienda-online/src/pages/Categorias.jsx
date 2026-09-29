import { useState, useEffect } from "react";
import { db } from "../db";
import ProductCard from "../components/ProductCard";

export default function Categorias() {
  const [productos, setProductos] = useState([]);
  const [categoriaSelect, setCategoriaSelect] = useState("Todas");

  useEffect(() => {
    setProductos(db.getProductos());
  }, []);

  const categorias = ["Todas", ...new Set(productos.map(p => p.categoria))];
  const productosFiltrados = categoriaSelect === "Todas" 
    ? productos 
    : productos.filter(p => p.categoria === categoriaSelect);

  return (
    <div>
      <h2 className="mb-4">Categorías</h2>
      <select 
        className="form-select mb-4 w-25" 
        value={categoriaSelect} 
        onChange={(e) => setCategoriaSelect(e.target.value)}
      >
        {categorias.map(c => <option key={c} value={c}>{c}</option>)}
      </select>

      <div className="row g-4">
        {productosFiltrados.map(p => (
          <div className="col-12 col-md-4" key={p.id}>
            <ProductCard producto={p} />
          </div>
        ))}
      </div>
    </div>
  );
}