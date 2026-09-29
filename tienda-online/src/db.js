class Database {
  constructor() {
    this.productos = [
      { id: 1, nombre: "Camiseta React", precio: 15000, categoria: "Ropa", imagen: "https://via.placeholder.com/150", oferta: false, descripcion: "Camiseta de algodón con logo de React." },
      { id: 2, nombre: "Taza JS", precio: 8000, categoria: "Accesorios", imagen: "https://via.placeholder.com/150", oferta: true, descripcion: "Taza de cerámica JS." },
      { id: 3, nombre: "Polerón Bootstrap", precio: 25000, categoria: "Ropa", imagen: "https://via.placeholder.com/150", oferta: false, descripcion: "Polerón con capucha cómodo." }
    ];
    this.carrito = [];
    this.pedidos = [];
  }

  // --- PRODUCTOS CRUD ---
  getProductos() {
    return [...this.productos];
  }
  
  getProductoById(id) {
    return this.productos.find(p => p.id === id);
  }

  addProducto(producto) {
    const newId = this.productos.length > 0 ? Math.max(...this.productos.map(p => p.id)) + 1 : 1;
    const newProd = { ...producto, id: newId };
    this.productos.push(newProd);
    return newProd;
  }

  updateProducto(id, data) {
    const index = this.productos.findIndex(p => p.id === id);
    if (index !== -1) {
      this.productos[index] = { ...this.productos[index], ...data };
      return this.productos[index];
    }
    return null;
  }

  deleteProducto(id) {
    this.productos = this.productos.filter(p => p.id !== id);
  }

  // --- CARRITO CRUD ---
  getCarrito() {
    return [...this.carrito];
  }

  addToCarrito(producto) {
    const item = this.carrito.find(p => p.id === producto.id);
    if (item) {
      item.cantidad += 1;
    } else {
      this.carrito.push({ ...producto, cantidad: 1 });
    }
  }

  removeFromCarrito(id) {
    this.carrito = this.carrito.filter(item => item.id !== id);
  }
  
  clearCarrito() {
    this.carrito = [];
  }

  // --- PEDIDOS ---
  addPedido(pedido) {
    const newId = this.pedidos.length > 0 ? Math.max(...this.pedidos.map(p => p.id)) + 1 : 1;
    const newPedido = { ...pedido, id: newId };
    this.pedidos.push(newPedido);
    return newPedido;
  }
}

export const db = new Database();
