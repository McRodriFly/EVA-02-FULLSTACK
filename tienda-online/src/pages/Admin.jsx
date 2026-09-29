import { useState } from "react";
import { db } from "../db";

export default function Admin() {
  const [productos, setProductos] = useState(db.getProductos());
  const [pedidos] = useState(db.pedidos);

  const handleDelete = (id) => {
    db.deleteProducto(id);
    setProductos(db.getProductos());
  };

  return (
    <div>
      <h2 className="mb-4">Panel Administrativo</h2>
      
      <h4 className="mt-4">Gestión de Productos</h4>
      <table className="table table-striped table-hover mt-3">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Oferta</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              <td>{p.categoria}</td>
              <td>${p.precio}</td>
              <td>{p.oferta ? 'Sí' : 'No'}</td>
              <td>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4 className="mt-5">Últimos Pedidos</h4>
      <table className="table table-bordered mt-3">
        <thead className="table-secondary">
          <tr>
            <th>ID Pedido</th>
            <th>Usuario</th>
            <th>Total</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.usuario}</td>
              <td>${p.total}</td>
              <td>{new Date(p.fecha).toLocaleDateString()}</td>
            </tr>
          ))}
          {pedidos.length === 0 && (
            <tr><td colSpan="4" className="text-center">No hay pedidos registrados</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}