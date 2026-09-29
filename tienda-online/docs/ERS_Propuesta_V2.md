# Documento ERS - Especificación de Requisitos del Software
## Version 2: Propuesta Terminada Tienda Online

**1. Objetivos del Sistema Web Frontend**
Desarrollar una aplicación SPA en React con navegación completa y persistencia en cliente (simulada vía JavaScript) integrando responsividad a través del framework CSS Bootstrap.

**2. Requisitos Funcionales Implementados**
- **RF-01 Visualización de Catálogo:** Listar productos agrupados y con señalética visual de ofertas.
- **RF-02 Filtrado de Categorías:** Menú para separar productos en colecciones.
- **RF-03 Carrito de Compras:** Retener selección de productos calculando cantidad total y desglose de precio.
- **RF-04 Checkout:** Formulario controlado para finalizar compras integrando una pseudo-base de datos JS (CRUD).
- **RF-05 Panel Administrador:** Vista de gestión para revisar pedidos procesados y productos.

**3. Decisiones de Arquitectura Frontend (Componentes React)**
- Se implementó *Single Responsibility Principle* separando lógicas visuales (`ProductCard`) de contenedores de estado (`Home`, `Carrito`).
- Gestión de estado basada en hooks (`useState`, `useEffect`) alimentándose del archivo mock JS simulador de Base de Datos.

**4. Interfaz de Usuario y Accesibilidad**
- Uso estricto de **Bootstrap** grid columns y componentes nativos (`navbar`, `btn`, `card`) respondiendo al estándar solicitado.