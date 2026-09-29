# Documento Cobertura de Testing Front-End

**Implementación de Entorno**
- Framework Analítico: *Jasmine*
- Corredor de Pruebas: *Karma Server*
- Browser: *Headless Chrome*
- Bundler de Pruebas: *Webpack con Babel-Loader (Preset React)*

**Alcance del Reporte**
Se desarrollaron **10 pruebas unitarias** abarcando los procesos críticos, dando respuesta directa al indicador de evaluación *IE2.2.1* e *IE2.3.1*.

**Técnicas Claves Utilizadas**
- **Renderizado y DOM:** Uso de `@testing-library/react` renderizando sobre document container para evitar los hooks `<script>` de Karma.
- **Uso de Mocks / Spies:** Se implementó `spyOn(db, 'metodo')` para aislar los componentes React de la fuente de datos global `db.js`.

**Detalle de Casos de Prueba (Coverage)**
1. Renderizado correcto de Card de Producto validando propiedades inyectadas ($).
2. Renderizado condicional mostrando estado `oferta = true`.
3. Renderizado condicional ocultando componente si `oferta = false`.
4. Eventos de simulación verificando la intercepción mediante Spy sobre `db.addToCarrito`.
5. Testing de carrito vacío reaccionando ante array nulo con vista condicional.
6. Cálculo dinámico y visualización de montos totales del carrito.
7. Testeo de métodos de eliminación dentro de lista carrito.
8. Control y prevención de Submit inválido en Formulario Checkout (Prevención de Error React).
9. Despacho exitoso de formulario generando payload y limpiando el store general.