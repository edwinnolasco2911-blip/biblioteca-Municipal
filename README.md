# Biblioteca Municipal — Catálogo y Cultura

Prototipo académico de sitio web (Fase II · Caso 5 · Módulo Diseño y Desarrollo de Soluciones Web, Instituto Nacional Isidro Menéndez, sección C22).

> **Importante:** es un prototipo local. Los libros, actividades y datos son **ejemplos demostrativos** y no provienen de la biblioteca. Las reservas e inscripciones **no se envían a ninguna parte** ni se guarda ningún dato.

---

## 1. Qué contiene el proyecto

```
biblioteca-municipal/
├── index.html        Estructura de la página (una sola página con secciones)
├── css/
│   └── estilos.css   Estilos, animaciones y diseño adaptable
├── js/
│   └── script.js     Datos de ejemplo y toda la lógica interactiva
├── assets/
│   └── favicon.svg   Icono temporal de libros (no es un logotipo oficial)
└── README.md
```

Secciones de la página: Inicio · Catálogo de libros · Solicitud de reserva · Actividades culturales · Inscripción · Contacto · Pie de página.

## 2. Tecnologías

- HTML5 (estructura semántica)
- CSS3 (variables, grid, flexbox, animaciones, media queries)
- JavaScript puro (sin frameworks, sin librerías, sin base de datos ni servidor)
- Tipografía Arial. No usa recursos externos: las portadas se dibujan con CSS y los iconos son SVG incluidos en el HTML.

## 3. Cómo abrirlo en Visual Studio Code

1. Descomprime el ZIP.
2. En Visual Studio Code: **Archivo → Abrir carpeta…** y elige `biblioteca-municipal`.
3. Abre `index.html` para revisar el código.

## 4. Cómo ejecutarlo en el navegador

- **Opción simple:** haz doble clic en `index.html` (o clic derecho → *Abrir con* → tu navegador).
- **Opción con Live Server (opcional):** instala la extensión *Live Server* en VS Code, clic derecho sobre `index.html` → *Open with Live Server*.

No necesita instalar nada más ni conexión a internet.

## 5. Funcionalidades implementadas

| Código | Funcionalidad | Cómo se implementó |
|---|---|---|
| RF1 | Ver información del libro | Tarjetas con portada, título, autor, categoría, descripción y disponibilidad demostrativa |
| RF2 | Buscar por título o autor | Filtra mientras se escribe; ignora mayúsculas, tildes y espacios sobrantes |
| RF3 | Filtrar por categoría | Selector de categorías; funciona junto con la búsqueda; botón para restablecer |
| RF4 | Abrir detalle | Ventana modal accesible (`<dialog>`) con sinopsis, editorial, ISBN, categoría y disponibilidad |
| RF5 | Solicitar reserva | Formulario con validación; el botón “Reservar libro” selecciona el libro automáticamente |
| RF6 | Consultar actividades | Tres tarjetas con fecha “Por confirmar” |
| RF7 | Inscribirse | Formulario con validación; el botón “Inscribirme” selecciona y marca la actividad |

Además: menú hamburguesa en móviles, encabezado fijo, resaltado de la sección activa, mensajes de “sin coincidencias” y de libro “no disponible”, foco visible, navegación por teclado, etiquetas de formulario, atributos ARIA, enlace para saltar al contenido y respeto de la preferencia de movimiento reducido.

## 6. Limitaciones del prototipo

- **RF8 y RF9 NO están implementados** (gestión de libros y consulta de registros por el personal bibliotecario). Requieren un panel de administración, inicio de sesión, permisos y almacenamiento (base de datos o servidor), algo que no se puede hacer de forma segura solo con HTML, CSS y JavaScript en el navegador. Quedan para una fase posterior.
- No hay base de datos, almacenamiento permanente, autenticación, envío de correos ni confirmación de disponibilidad real.
- Las reservas e inscripciones son **demostraciones**: solo comprueban que los datos tengan formato válido y muestran un aviso. El formulario se vacía después. **Usa datos ficticios** al probar.
- Los libros usan portadas dibujadas con CSS; los ISBN son **números de ejemplo** (no pertenecen a ediciones reales).
- No hay comercio electrónico (ni carrito, ni pagos, ni entregas): no corresponde a la solución.
- El mapa del sitio del documento incluye apartados fuera del alcance de este prototipo (por ejemplo “Mi cuenta”, “Mis reservas”, “Nosotros” y un formulario de contacto); no se implementaron.

## 7. Información que debe confirmarse con la biblioteca antes de publicar

- Títulos, autores, editoriales, **ISBN**, disponibilidad y ubicación de los libros del catálogo.
- Categorías oficiales de clasificación.
- Actividades: nombres, descripciones, **fechas, horarios, lugares, costos y cupos**.
- **Contacto:** dirección, teléfono, correo electrónico y horarios de atención (hoy figuran como “Pendiente de confirmación por la institución”).
- Logotipo institucional autorizado y, si se desea, fotografías con permiso de uso.
- Política de privacidad y protección de datos personales antes de recopilar información real.

## Pruebas sugeridas (para el plan de pruebas del documento)

| ID | Prueba | Qué hacer | Resultado esperado |
|---|---|---|---|
| P01 | Navegación | Pulsar Inicio, Catálogo, Actividades, Contacto | Cada enlace lleva a su sección |
| P02 | Búsqueda | Buscar “Hawking” y luego “zzzz” | 1 coincidencia / mensaje sin resultados |
| P03 | Filtro | Elegir “Ciencia” | Solo libros de Ciencia |
| P04 | Ficha | “Ver ficha completa” | Sinopsis, editorial e ISBN del libro elegido |
| P05 | Reserva vacía | “Enviar solicitud” sin datos | Mensajes de error; no se envía |
| P06 | Reserva completa | Libro + nombre y correo ficticios válidos | Aviso de demostración |
| P07 | Correo inválido | Escribir `ana@ejemplo` | Error de formato |
| P08 | Inscripción | Actividad + datos ficticios válidos | Aviso de prueba local |
| P09 | Adaptabilidad | Probar a 360, 390, 768, 1024 y 1440 px | Sin desplazamiento horizontal; menú adaptable |
| P10 | Administración | Buscar panel para agregar/eliminar libros | No existe (pendiente, RF8–RF9) |

Recuerda agregar **capturas reales** de cada prueba en el documento final.
