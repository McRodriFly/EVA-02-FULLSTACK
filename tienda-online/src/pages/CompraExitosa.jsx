import { Link } from "react-router-dom";

export default function CompraExitosa() {
  return (
    <div className="text-center mt-5">
      <h1 className="text-success mb-3">¡Compra Realizada con Éxito!</h1>
      <p className="lead">Tu pedido ha sido procesado. Te notificaremos cuando esté en camino.</p>
      <Link to="/" className="btn btn-primary mt-4">Continuar Comprando</Link>
    </div>
  );
}