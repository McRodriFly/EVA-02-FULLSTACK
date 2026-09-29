# Informe Técnico: Arquitectura, Funcionamiento y Flujo del Código
## Proyecto: Tienda Online Front-End (Evaluación Parcial 2 - DSY1104)

---

### 1. Resumen Ejecutivo y Objetivos

Este proyecto es una aplicación web SPA (*Single Page Application*) desarrollada con **React 19**, **Vite** y **Bootstrap**, personalizada con principios visuales del **Apple Design System**. 

Cumple con todos los indicadores de logro requeridos:
- **IE2.1.1 & IE2.1.2:** Estructura modular en componentes React con manejo claro de estado (`useState`), propiedades (`props`), ciclo de vida (`useEffect`) y diseño responsivo adaptativo.
- **Persistencia simulada en JS:** Módulo singleton independiente que implementa operaciones CRUD completas en memoria.
- **IE2.2.1 & IE2.3.1:** Suite de **10 pruebas unitarias** ejecutadas con **Karma** y **Jasmine** sobre navegador headless (*ChromeHeadless*), haciendo uso de espías (*mocks/spies*) y validación de DOM.

---

### 2. Mapa de Archivos y Responsabilidades

```text
tienda-online/
├── .babelrc                     # Transpilación JSX/ES6 para el empaquetador de Karma
├── karma.conf.cjs               # Configuración del runner Karma + Jasmine + Webpack
├── package.json                 # Dependencias, scripts de arranque y testeo
├── vite.config.js               # Configuración del bundler principal para desarrollo
├── docs/                        # Documentación técnica, ERS y pruebas
│   ├── ERS_Propuesta_V2.md
│   ├── Reporte_Cobertura_Testing.md
│   └── INFORME_ARQUITECTURA_Y_FUNCIONAMIENTO.md  <-- (Este documento)
└── src/
    ├── main.jsx                 # Punto de entrada y montaje en el DOM
    ├── App.jsx                  # Enrutamiento central y estructura base
    ├── db.js                    # Simulación de Base de Datos (CRUD en JS puro)
    ├── index.css                # Capa de estilos Apple Design sobre Bootstrap
    ├── components/
    │   ├── Navigation.jsx       # Barra de navegación responsive con efecto blur
    │   └── ProductCard.jsx      # Tarjeta reutilizable atómica de producto
    ├── pages/
    │   ├── Home.jsx             # Catálogo principal
    │   ├── Categorias.jsx       # Filtrado interactivo por categoría
    │   ├── Ofertas.jsx          # Vista filtrada de ofertas destacadas
    │   ├── Carrito.jsx          # Gestión del carrito y cálculo de totales
    │   ├── Checkout.jsx         # Formulario de validación y confirmación
    │   ├── CompraExitosa.jsx    # Pantalla de confirmación post-pago
    │   └── Admin.jsx            # Panel de control de productos y pedidos
    └── tests/
        ├── ProductCard.spec.jsx # Pruebas 1 a 5: render, props, condicional, eventos
        ├── Carrito.spec.jsx     # Pruebas 6 a 8: estado reactivo, listas, borrado
        └── Checkout.spec.jsx    # Pruebas 9 y 10: formulario controlado y mutación
```

---

### 3. Explicación Detallada: ¿Qué hace cada archivo, por qué y cómo?

#### 3.1. Núcleo y Configuración

* **`src/main.jsx`**:
  * **Qué hace:** Es el punto de arranque de la aplicación. Importa Bootstrap (`bootstrap/dist/css/bootstrap.min.css`), los estilos personalizados (`index.css`) y monta el componente raíz `<App />` dentro del nodo `#root` del HTML mediante `createRoot`.
  * **Por qué:** Garantiza que los estilos globales y los frameworks CSS se carguen antes de evaluar cualquier componente.

* **`src/App.jsx`**:
  * **Qué hace:** Define la arquitectura de navegación mediante `react-router-dom` (`BrowserRouter`, `Routes`, `Route`). Renderiza la barra fija `<Navigation />` y reserva un contenedor central con clases de Bootstrap (`container mt-4`) donde se alternan las páginas según la URL activa (`/`, `/categorias`, `/ofertas`, `/carrito`, `/checkout`, `/compra-exitosa`, `/admin`).
  * **Por qué:** Mantiene una arquitectura SPA sin recargar la página entre transiciones, cumpliendo con la navegación solicitada en el diagrama de flujo del encargo.

* **`src/db.js` (Persistencia Simulada / Mock DB)**:
  * **Qué hace:** Define una clase `Database` exportada como instancia única (*Singleton*). Mantiene arrays internos en memoria para `productos`, `carrito` y `pedidos`.
  * **Operaciones CRUD implementadas:**
    * `getProductos()` / `getProductoById(id)`: **Read** (lectura con copia defensiva para evitar mutaciones directas).
    * `addProducto(producto)`: **Create** (calcula nuevo ID incremental automáticamente).
    * `updateProducto(id, data)`: **Update** (actualiza campos por combinación de objetos).
    * `deleteProducto(id)`: **Delete** (filtra y remueve por ID).
    * Funciones de Carrito: `addToCarrito()`, `removeFromCarrito()`, `clearCarrito()`.
    * Funciones de Pedidos: `addPedido()`.
  * **Por qué:** Cumple directamente con el requerimiento de *"Crear un archivo JavaScript que actúe como una fuente de datos simulada con operaciones CRUD sin depender obligatoriamente de un backend externo"*.

* **`src/index.css` (Diseño Apple sobre Bootstrap)**:
  * **Qué hace:** Sobrescribe visualmente las clases estándar de Bootstrap mediante variables CSS:
    * Tipografía del sistema: `-apple-system`, `SF Pro Display`, `SF Pro Text`.
    * Tarjetas (`.card`): Bordes redondeados masivos (`border-radius: 1.5rem`), eliminación de bordes duros y sombras difusas multinivel.
    * Botones (`.btn`): Estilo *pill* completamente redondeado (`border-radius: 9999px`) con áreas de toque amplias.
    * Barra de navegación (`.apple-nav`): Efecto de vidrio translúcido (*glassmorphism*) con `backdrop-filter: blur(20px)` y posición fija `sticky-top`.
  * **Por qué:** Concilia los requerimientos de la pauta (Bootstrap) con una interfaz de usuario minimalista y moderna de alto estándar estético.

---

#### 3.2. Componentes Reutilizables (`src/components/`)

* **`Navigation.jsx`**:
  * **Qué hace:** Barra de navegación superior con enlaces declarativos (`<Link to="...">`). Se adapta a pantallas móviles con botón colapsable (`navbar-toggler`) y destaca el botón de acceso al carrito.
  * **Por qué:** Proporciona un encabezado consistente y accesible desde cualquier punto de la aplicación.

* **`ProductCard.jsx`**:
  * **Qué hace:** Aplica el principio de responsabilidad única (*Single Responsibility Principle*). Recibe el objeto `producto` a través de **props**.
    * Renderiza nombre, descripción y precio formateado.
    * Aplica renderizado condicional: si `producto.oferta === true`, muestra el badge `¡En Oferta!`.
    * Botón interactivo que invoca `db.addToCarrito(producto)` y retroalimenta al usuario.
  * **Por qué:** Permite reutilizar la misma tarjeta en el Home, en la vista de Categorías y en la de Ofertas sin duplicar código HTML ni lógica.

---

#### 3.3. Vistas y Páginas (`src/pages/`)

* **`Home.jsx` (Catálogo General)**:
  * **Qué hace:** Contenedor de la tienda. En el montaje (`useEffect`), solicita la lista a `db.getProductos()` y la almacena en el estado local `productos`. Renderiza una grilla responsiva de Bootstrap (`row g-4` y `col-12 col-md-4`) iterando las tarjetas con `.map()`.
  * **Por qué:** Separa el componente contenedor (que maneja datos y estados) del componente presentacional (`ProductCard`).

* **`Categorias.jsx`**:
  * **Qué hace:** Extrae dinámicamente las categorías únicas presentes en la base de datos usando `Set` (`["Todas", ...new Set(...)]`). Dispone de un selector interactivo (`<select>`); al cambiar la opción, actualiza el estado `categoriaSelect` y filtra en tiempo real la lista visible.
  * **Por qué:** Demuestra manejo de estado reactivo interactivo dependiente de las acciones del usuario.

* **`Ofertas.jsx`**:
  * **Qué hace:** Carga únicamente los artículos cuyo campo `oferta` sea verdadero (`todos.filter(p => p.oferta)`).
  * **Por qué:** Representa la vista específica de promociones exigida en el flujo de negocio del Anexo 1.

* **`Carrito.jsx`**:
  * **Qué hace:**
    * Lee los elementos actuales del carrito con `db.getCarrito()`.
    * Si el carrito está vacío, muestra un mensaje amigable con enlace al catálogo (renderizado condicional).
    * Si contiene productos, calcula el total acumulado usando `reduce((acc, item) => acc + (item.precio * item.cantidad), 0)`.
    * Permite eliminar artículos individuales con `db.removeFromCarrito(id)` y recargar el estado.
    * Botón para avanzar a `/checkout`.
  * **Por qué:** Centraliza la lógica de compras antes del paso de facturación.

* **`Checkout.jsx`**:
  * **Qué hace:** Implementa un formulario controlado de React (`formData` con `nombre` y `direccion`).
    * Al enviar el formulario (`handleSubmit`), valida que los campos no estén vacíos y que haya productos en el carrito.
    * Si la validación pasa, registra la orden en `db.addPedido({...})`, vacía el carrito con `db.clearCarrito()` y redirige programáticamente con `useNavigate()` a `/compra-exitosa`.
    * Si falla, muestra un mensaje de alerta en pantalla (`alert alert-danger`).
  * **Por qué:** Aplica validaciones de formulario, manejo de errores en estado y persistencia de la transacción completada.

* **`CompraExitosa.jsx`**:
  * **Qué hace:** Vista estática de éxito que confirma el pedido y ofrece un botón para regresar a la tienda.
  * **Por qué:** Cierra el embudo de conversión del cliente (*checkout flow*).

* **`Admin.jsx` (Panel Administrativo)**:
  * **Qué hace:**
    * Tabla 1: Lista todos los productos y provee un botón **Eliminar** que invoca `db.deleteProducto(id)` y refresca la tabla en vivo.
    * Tabla 2: Lista todos los pedidos confirmados con ID, usuario, total pagado y fecha formateada.
  * **Por qué:** Cubre la vista del sistema administrativo solicitada en la pauta, completando el ciclo CRUD (permite la eliminación y lectura de pedidos).

---

### 4. Arquitectura y Estrategia de Testing (Jasmine + Karma)

#### 4.1. Configuración del Entorno de Pruebas
* **`karma.conf.cjs`**: Inicializa el servidor Karma configurando el framework `jasmine`, apuntando a los archivos `src/**/*.spec.jsx`. Utiliza el preprocesador `webpack` para transpilar código JSX y empaquetar dependencias antes de enviarlas al navegador. Se ejecuta en `ChromeHeadless` en modo `singleRun: true`.
* **`.babelrc`**: Contiene `@babel/preset-env` y `@babel/preset-react` con `runtime: "automatic"` para que los tests entiendan JSX moderno.

#### 4.2. Cobertura de las 10 Pruebas Unitarias

| # | Archivo de Prueba | Componente Evaluado | Qué verifica | Indicador de la Pauta |
|---|---|---|---|---|
| 1 | `ProductCard.spec.jsx` | `ProductCard` | Renderizado correcto de título y descripción. | Renderizado DOM |
| 2 | `ProductCard.spec.jsx` | `ProductCard` | Recepción y renderizado de propiedad de precio formatado. | Manejo de Props |
| 3 | `ProductCard.spec.jsx` | `ProductCard` | Renderizado condicional: NO muestra badge si `oferta = false`. | Render Condicional |
| 4 | `ProductCard.spec.jsx` | `ProductCard` | Renderizado condicional: SÍ muestra badge si `oferta = true`. | Render Condicional |
| 5 | `ProductCard.spec.jsx` | `ProductCard` | Simulación de evento click: invoca `db.addToCarrito` con espía (`spyOn`). | Eventos y Mocks |
| 6 | `Carrito.spec.jsx` | `Carrito` | Renderizado condicional de alerta cuando el carrito está vacío. | Render Condicional |
| 7 | `Carrito.spec.jsx` | `Carrito` | Renderizado de listas dinámicas y cálculo del total acumulado. | Gestión de Estado |
| 8 | `Carrito.spec.jsx` | `Carrito` | Simulación de evento click en botón eliminar e invocación a `removeFromCarrito`. | Eventos y Mocks |
| 9 | `Checkout.spec.jsx` | `Checkout` | Validación de formulario: bloquea submit y muestra error si hay campos vacíos. | Formularios y Estado |
| 10 | `Checkout.spec.jsx` | `Checkout` | Flujo de compra completo: simula escritura en inputs, dispara submit y verifica creación de pedido y vaciado de carrito. | Ciclo completo y Mocks |

---

### 5. Guía para la Defensa / Presentación Oral

Si el docente formula preguntas durante la ronda abierta, aquí están las respuestas técnicas fundamentadas:

1. **¿Por qué se utilizó una clase en `db.js` en lugar de objetos simples o LocalStorage directo?**
   > *"Se diseñó como un patrón Singleton con métodos CRUD encapsulados. Esto asegura que la lógica de acceso a datos esté centralizada en un único lugar, facilita la creación de espías (*spies*) en las pruebas unitarias y desacopla la vista de la capa de almacenamiento."*

2. **¿Cómo se manejó el Principio de Responsabilidad Única (SRP) en los componentes?**
   > *"Dividimos los componentes en dos tipos: componentes contenedores o de página (`Home`, `Carrito`, `Checkout`), que se encargan del estado, llamadas a datos y lógica de negocio; y componentes presentacionales atómicos (`ProductCard`, `Navigation`), que solo reciben props y se limitan a renderizar la interfaz y emitir eventos."*

3. **¿Cómo se resolvió la integración de Jasmine y Karma con React moderno?**
   > *"Vite utiliza ES Modules de forma nativa mientras que Karma es un test runner tradicional. Para compatibilizarlos sin fricción, configuramos Karma con `karma-webpack` y `babel-loader` en `karma.conf.cjs`. Esto permite que Webpack compile el JSX y cargue `@testing-library/react` directamente en una instancia real de Chrome en segundo plano (*Headless*)."*

4. **¿Cómo se garantiza que el diseño sea responsivo?**
   > *"Se utilizó el sistema de grillas flexbox de Bootstrap (`container`, `row`, `col-12 col-md-4`) garantizando que en dispositivos móviles los elementos ocupen el 100% del ancho y en pantallas medianas o grandes se distribuyan en 3 columnas. Se complementó con estilos Apple en `index.css` respetando los breakpoints estándar de Bootstrap."*
