/* =========================================================
   Biblioteca Municipal — Catálogo y Cultura
   Lógica del prototipo (JavaScript puro, sin librerías)

   Este archivo NO se conecta a ninguna base de datos ni servidor:
   todo ocurre en el navegador y no se guarda ningún dato.

   Contenido:
   1. Datos de ejemplo (libros y actividades)
   2. Referencias a elementos de la página
   3. Funciones de apoyo (texto, validación, mensajes)
   4. Menú de navegación
   5. Catálogo: tarjetas, búsqueda y filtro
   6. Ficha completa (ventana modal)
   7. Formulario de reserva
   8. Actividades e inscripción
   9. Inicio de la página
   ========================================================= */
'use strict';

/* =========================================================
   1. DATOS DE EJEMPLO
   Todos los registros son DEMOSTRATIVOS y no están
   confirmados por la biblioteca. Los ISBN son de ejemplo.
   ========================================================= */

// Categorías de ejemplo (no son una clasificación oficial).
// "clase" se usa en el CSS para el color de la portada; "icono" es el símbolo.
const CATEGORIAS = {
  'Ciencia':    { clase: 'ciencia',    icono: 'i-ciencia' },
  'Literatura': { clase: 'literatura', icono: 'i-literatura' },
  'Historia':   { clase: 'historia',   icono: 'i-historia' },
  'Tecnología': { clase: 'tecnologia', icono: 'i-tecnologia' },
  'Educación':  { clase: 'educacion',  icono: 'i-educacion' },
  'Filosofía':  { clase: 'filosofia',  icono: 'i-filosofia' }
};

const LIBROS = [
  {
    id: 'cien-anos-de-soledad',
    titulo: 'Cien años de soledad',
    autor: 'Gabriel García Márquez',
    categoria: 'Literatura',
    descripcion: 'La saga de la familia Buendía en el pueblo imaginario de Macondo.',
    sinopsis: 'Novela que sigue a varias generaciones de la familia Buendía en Macondo, un pueblo imaginario donde lo cotidiano y lo extraordinario conviven. Mezcla amor, guerra, soledad y memoria en una de las obras centrales del realismo mágico.',
    editorial: 'Sudamericana',
    isbn: '978-99999-0001-0',
    anio: '1967',
    disponible: true
  },
  {
    id: 'don-quijote-de-la-mancha',
    titulo: 'Don Quijote de la Mancha',
    autor: 'Miguel de Cervantes',
    categoria: 'Literatura',
    descripcion: 'Las aventuras de un hidalgo que enloquece leyendo libros de caballerías.',
    sinopsis: 'Alonso Quijano, lector apasionado de novelas de caballerías, decide convertirse en caballero andante junto a su escudero Sancho Panza. Sus aventuras mezclan humor, crítica social y una reflexión sobre la realidad y la ficción.',
    editorial: 'Alfaguara',
    isbn: '978-99999-0002-7',
    anio: '1605 (primera parte)',
    disponible: true
  },
  {
    id: 'el-principito',
    titulo: 'El principito',
    autor: 'Antoine de Saint-Exupéry',
    categoria: 'Literatura',
    descripcion: 'Un cuento poético sobre la amistad, la infancia y lo esencial.',
    sinopsis: 'Un piloto varado en el desierto conoce a un pequeño príncipe que viaja de planeta en planeta. A través de sus encuentros, el relato invita a mirar con ojos de niño lo que de verdad importa.',
    editorial: 'Salamandra',
    isbn: '978-99999-0003-4',
    anio: '1943',
    disponible: true
  },
  {
    id: 'breve-historia-del-tiempo',
    titulo: 'Breve historia del tiempo',
    autor: 'Stephen Hawking',
    categoria: 'Ciencia',
    descripcion: 'Una introducción divulgativa al universo, los agujeros negros y el tiempo.',
    sinopsis: 'Divulga ideas de la cosmología moderna (el origen del universo, los agujeros negros y la naturaleza del tiempo) con un lenguaje pensado para lectores sin formación científica especializada.',
    editorial: 'Crítica',
    isbn: '978-99999-0004-1',
    anio: '1988',
    disponible: true
  },
  {
    id: 'cosmos',
    titulo: 'Cosmos',
    autor: 'Carl Sagan',
    categoria: 'Ciencia',
    descripcion: 'Un recorrido por la historia de la astronomía y nuestro lugar en el universo.',
    sinopsis: 'Recorre la historia del conocimiento del cielo, desde los primeros observadores hasta la exploración espacial, y reflexiona sobre el lugar de la humanidad en el universo.',
    editorial: 'Planeta',
    isbn: '978-99999-0005-8',
    anio: '1980',
    disponible: false
  },
  {
    id: 'sapiens',
    titulo: 'Sapiens: de animales a dioses',
    autor: 'Yuval Noah Harari',
    categoria: 'Historia',
    descripcion: 'Una mirada general a la historia de la humanidad.',
    sinopsis: 'Propone un recorrido por la historia de nuestra especie, desde los primeros humanos hasta la actualidad, analizando cómo la cooperación, la agricultura, el dinero y las creencias compartidas dieron forma a las sociedades.',
    editorial: 'Debate',
    isbn: '978-99999-0006-5',
    anio: '2011',
    disponible: true
  },
  {
    id: 'las-venas-abiertas-de-america-latina',
    titulo: 'Las venas abiertas de América Latina',
    autor: 'Eduardo Galeano',
    categoria: 'Historia',
    descripcion: 'Un ensayo sobre la historia económica y social de América Latina.',
    sinopsis: 'Ensayo que repasa la historia de América Latina desde la colonización, poniendo el foco en la explotación de sus recursos naturales y en sus consecuencias económicas y sociales.',
    editorial: 'Siglo XXI Editores',
    isbn: '978-99999-0007-2',
    anio: '1971',
    disponible: true
  },
  {
    id: 'codigo-limpio',
    titulo: 'Código limpio',
    autor: 'Robert C. Martin',
    categoria: 'Tecnología',
    descripcion: 'Buenas prácticas para escribir programas legibles y fáciles de mantener.',
    sinopsis: 'Presenta principios y ejemplos para escribir código claro: nombres significativos, funciones pequeñas, pruebas y refactorización. Es útil para estudiantes y profesionales de la programación.',
    editorial: 'Anaya Multimedia',
    isbn: '978-99999-0008-9',
    anio: '2008',
    disponible: true
  },
  {
    id: 'introduction-to-algorithms',
    titulo: 'Introduction to Algorithms',
    autor: 'Cormen, Leiserson, Rivest y Stein',
    categoria: 'Tecnología',
    descripcion: 'Un texto de referencia sobre estructuras de datos y algoritmos.',
    sinopsis: 'Manual de consulta muy usado en cursos universitarios de informática que explica estructuras de datos y algoritmos junto con el análisis de su eficiencia. Está escrito en inglés.',
    editorial: 'MIT Press',
    isbn: '978-99999-0009-6',
    anio: '1990',
    disponible: true
  },
  {
    id: 'pedagogia-del-oprimido',
    titulo: 'Pedagogía del oprimido',
    autor: 'Paulo Freire',
    categoria: 'Educación',
    descripcion: 'Una propuesta de educación basada en el diálogo y la conciencia crítica.',
    sinopsis: 'Plantea una educación liberadora basada en el diálogo entre docentes y estudiantes, en contraste con la enseñanza que solo transmite información. Es una obra clave de la pedagogía crítica.',
    editorial: 'Siglo XXI Editores',
    isbn: '978-99999-0010-2',
    anio: '1968',
    disponible: true
  },
  {
    id: 'emilio-o-de-la-educacion',
    titulo: 'Emilio, o De la educación',
    autor: 'Jean-Jacques Rousseau',
    categoria: 'Educación',
    descripcion: 'Un clásico sobre cómo educar respetando el desarrollo natural del niño.',
    sinopsis: 'Obra en la que Rousseau imagina la educación de un niño desde su nacimiento hasta la juventud, defendiendo un aprendizaje guiado por la experiencia y el desarrollo natural.',
    editorial: 'Alianza Editorial',
    isbn: '978-99999-0011-9',
    anio: '1762',
    disponible: false
  },
  {
    id: 'meditaciones',
    titulo: 'Meditaciones',
    autor: 'Marco Aurelio',
    categoria: 'Filosofía',
    descripcion: 'Reflexiones personales de un emperador estoico sobre la virtud y la serenidad.',
    sinopsis: 'Notas personales del emperador romano Marco Aurelio, escritas como ejercicio de reflexión estoica sobre la disciplina, el deber, la muerte y el dominio de las emociones.',
    editorial: 'Gredos',
    isbn: '978-99999-0012-6',
    anio: 'Siglo II d. C.',
    disponible: true
  },
  {
    id: 'asi-hablo-zaratustra',
    titulo: 'Así habló Zaratustra',
    autor: 'Friedrich Nietzsche',
    categoria: 'Filosofía',
    descripcion: 'Una obra filosófica en forma de relato sobre el superhombre y el sentido de la vida.',
    sinopsis: 'Obra en forma de relato en la que el personaje Zaratustra expone ideas como el superhombre, la voluntad de poder y el eterno retorno.',
    editorial: 'Alianza Editorial',
    isbn: '978-99999-0013-3',
    anio: '1883–1885',
    disponible: false
  },
  {
    id: 'el-mundo-de-sofia',
    titulo: 'El mundo de Sofía',
    autor: 'Jostein Gaarder',
    categoria: 'Filosofía',
    descripcion: 'Una novela que introduce la historia de la filosofía.',
    sinopsis: 'Novela en la que una adolescente recibe cartas misteriosas que la llevan a recorrer, de forma sencilla, las grandes preguntas y corrientes de la historia de la filosofía.',
    editorial: 'Siruela',
    isbn: '978-99999-0014-0',
    anio: '1991',
    disponible: true
  }
];

// Actividades demostrativas. NO se inventan fechas, lugares, costos ni cupos.
const ACTIVIDADES = [
  {
    id: 'circulo-de-lectura-juvenil',
    nombre: 'Círculo de lectura juvenil',
    descripcion: 'Un espacio de ejemplo para compartir lecturas, ideas y recomendaciones entre jóvenes.',
    icono: 'i-users',
    fecha: 'Por confirmar'
  },
  {
    id: 'lectura-en-familia',
    nombre: 'Lectura en familia',
    descripcion: 'Una propuesta de ejemplo para disfrutar de la lectura en un ambiente familiar.',
    icono: 'i-book-open',
    fecha: 'Por confirmar'
  },
  {
    id: 'introduccion-a-la-biblioteca',
    nombre: 'Introducción a la biblioteca',
    descripcion: 'Una actividad de ejemplo para conocer los servicios y espacios de la biblioteca.',
    icono: 'i-compass',
    fecha: 'Por confirmar'
  }
];

/* =========================================================
   2. REFERENCIAS A ELEMENTOS DE LA PÁGINA
   ========================================================= */
const $ = (id) => document.getElementById(id);

// Menú
const botonMenu = $('botonMenu');
const menuPrincipal = $('menuPrincipal');

// Catálogo
const campoBusqueda = $('campoBusqueda');
const selectorCategoria = $('selectorCategoria');
const botonRestablecer = $('botonRestablecer');
const botonRestablecerVacio = $('botonRestablecerVacio');
const formularioFiltros = $('formularioFiltros');
const infoResultados = $('infoResultados');
const listaLibros = $('listaLibros');
const sinResultados = $('sinResultados');

// Ficha (modal)
const dialogoFicha = $('dialogoFicha');

// Reserva
const formularioReserva = $('formularioReserva');
const reservaLibro = $('reservaLibro');
const reservaNombre = $('reservaNombre');
const reservaCorreo = $('reservaCorreo');
const resumenReserva = $('resumenReserva');
const mensajeReserva = $('mensajeReserva');

// Actividades e inscripción
const listaActividades = $('listaActividades');
const formularioInscripcion = $('formularioInscripcion');
const inscripcionActividad = $('inscripcionActividad');
const inscripcionNombre = $('inscripcionNombre');
const inscripcionCorreo = $('inscripcionCorreo');
const mensajeInscripcion = $('mensajeInscripcion');

// Libro que se muestra en la ficha (para el botón "Reservar este libro")
let libroEnFicha = null;
// Las tarjetas solo se animan la primera vez, para que escribir en el buscador no parpadee
let primeraCarga = true;

/* =========================================================
   3. FUNCIONES DE APOYO
   ========================================================= */

// Evita que un texto se interprete como HTML al insertarlo en la página
function escaparHTML(texto) {
  const reemplazos = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return String(texto).replace(/[&<>"']/g, (c) => reemplazos[c]);
}

// Prepara un texto para comparar: quita espacios sobrantes, mayúsculas y tildes.
// Ejemplo: "  CIEN   años " -> "cien anos"
function normalizarTexto(texto) {
  return String(texto)
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}

function buscarLibro(id) {
  return LIBROS.find((libro) => libro.id === id) || null;
}

function buscarActividad(id) {
  return ACTIVIDADES.find((actividad) => actividad.id === id) || null;
}

function prefiereMenosMovimiento() {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Desplaza suavemente la página hasta una sección (respeta "movimiento reducido")
function irASeccion(idSeccion) {
  const seccion = $(idSeccion);
  if (!seccion) return;
  seccion.scrollIntoView({ behavior: prefiereMenosMovimiento() ? 'auto' : 'smooth', block: 'start' });
}

/* ----- Validación de campos ----- */

// Cada función devuelve un texto de error, o '' si el valor es correcto.
function validarNombre(valor) {
  const nombre = valor.trim().replace(/\s+/g, ' ');
  if (nombre === '') return 'Escribe tu nombre. Este campo es obligatorio.';
  if (nombre.length < 3) return 'El nombre es demasiado corto. Escribe al menos 3 caracteres.';
  if (!/^[\p{L}][\p{L}\s'.-]*$/u.test(nombre)) return 'El nombre solo puede contener letras y espacios.';
  return '';
}

function validarCorreo(valor) {
  const correo = valor.trim();
  if (correo === '') return 'Escribe tu correo electrónico. Este campo es obligatorio.';
  // Formato básico: texto@dominio.extensión (sin espacios)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(correo)) {
    return 'El correo no tiene un formato válido. Ejemplo: nombre@ejemplo.com';
  }
  return '';
}

function validarLibroReserva(idLibro) {
  if (idLibro === '') return 'Selecciona el libro que deseas reservar.';
  const libro = buscarLibro(idLibro);
  if (!libro) return 'El libro seleccionado no existe en el catálogo de ejemplo. Elige otro.';
  if (!libro.disponible) {
    return 'Este libro figura como “No disponible” en los datos demostrativos. Elige otro libro.';
  }
  return '';
}

function validarActividad(idActividad) {
  if (idActividad === '') return 'Selecciona la actividad en la que quieres inscribirte.';
  if (!buscarActividad(idActividad)) return 'La actividad seleccionada no existe. Elige otra.';
  return '';
}

/* ----- Mostrar y quitar errores de campo ----- */

function mostrarErrorCampo(campo, mensaje) {
  const contenedor = $(campo.id + '-error');
  contenedor.textContent = mensaje;
  contenedor.hidden = false;
  campo.setAttribute('aria-invalid', 'true');
}

function limpiarErrorCampo(campo) {
  const contenedor = $(campo.id + '-error');
  contenedor.textContent = '';
  contenedor.hidden = true;
  campo.removeAttribute('aria-invalid');
}

// Recibe una lista [campo, mensajeDeError]. Muestra o limpia cada error y
// devuelve el primer campo inválido (o null si todo está correcto).
function aplicarValidaciones(lista) {
  let primerInvalido = null;
  lista.forEach(([campo, mensaje]) => {
    if (mensaje) {
      mostrarErrorCampo(campo, mensaje);
      if (!primerInvalido) primerInvalido = campo;
    } else {
      limpiarErrorCampo(campo);
    }
  });
  return primerInvalido;
}

// Cuando el usuario corrige un campo con error, se vuelve a comprobar al escribir
function revalidarAlCorregir(campo, funcionValidar) {
  const comprobar = () => {
    if (campo.getAttribute('aria-invalid') !== 'true') return;
    const mensaje = funcionValidar();
    if (mensaje) mostrarErrorCampo(campo, mensaje);
    else limpiarErrorCampo(campo);
  };
  campo.addEventListener('input', comprobar);
  campo.addEventListener('change', comprobar);
}

/* ----- Mensajes de resultado de los formularios ----- */

function mostrarMensaje(contenedor, tipo, titulo, texto) {
  const icono = tipo === 'success' ? 'i-check' : 'i-error';
  contenedor.className = 'form-message is-visible is-' + tipo;
  contenedor.innerHTML =
    '<svg class="icon" aria-hidden="true"><use href="#' + icono + '"/></svg>' +
    '<div><strong>' + escaparHTML(titulo) + '</strong><p>' + texto + '</p></div>';
}

function ocultarMensaje(contenedor) {
  contenedor.className = 'form-message';
  contenedor.innerHTML = '';
}

/* ----- Portada dibujada con CSS (no depende de imágenes externas) ----- */
function crearPortada(libro, mini) {
  const categoria = CATEGORIAS[libro.categoria];
  const portada = document.createElement('div');
  portada.className = 'portada portada-' + categoria.clase + (mini ? ' portada-mini' : '');
  portada.setAttribute('role', 'img');
  portada.setAttribute('aria-label', 'Portada ilustrativa de ' + libro.titulo);
  portada.innerHTML =
    '<svg class="icon portada-icono" aria-hidden="true"><use href="#' + categoria.icono + '"/></svg>' +
    (mini ? '' :
      '<span class="portada-titulo">' + escaparHTML(libro.titulo) + '</span>' +
      '<span class="portada-autor">' + escaparHTML(libro.autor) + '</span>');
  return portada;
}

/* =========================================================
   4. MENÚ DE NAVEGACIÓN
   ========================================================= */
function alternarMenu(abrir) {
  const estaAbierto = menuPrincipal.classList.contains('abierto');
  const abrirMenu = typeof abrir === 'boolean' ? abrir : !estaAbierto;
  menuPrincipal.classList.toggle('abierto', abrirMenu);
  botonMenu.setAttribute('aria-expanded', String(abrirMenu));
  botonMenu.setAttribute('aria-label', abrirMenu ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
}

function iniciarMenu() {
  botonMenu.addEventListener('click', () => alternarMenu());

  // Al elegir una opción, el menú se cierra
  menuPrincipal.querySelectorAll('a').forEach((enlace) => {
    enlace.addEventListener('click', () => alternarMenu(false));
  });

  // Escape cierra el menú y devuelve el foco al botón
  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && menuPrincipal.classList.contains('abierto')) {
      alternarMenu(false);
      botonMenu.focus();
    }
  });

  // Clic fuera del menú lo cierra
  document.addEventListener('click', (evento) => {
    if (!menuPrincipal.classList.contains('abierto')) return;
    if (!menuPrincipal.contains(evento.target) && !botonMenu.contains(evento.target)) alternarMenu(false);
  });

  // Si la pantalla se ensancha, se restablece el menú
  window.addEventListener('resize', () => {
    if (window.innerWidth > 820) alternarMenu(false);
  });

  marcarEnlaceActivoAlDesplazar();
}

// Resalta en el menú la sección que se está viendo
function marcarEnlaceActivoAlDesplazar() {
  if (!('IntersectionObserver' in window)) return;
  const enlaces = Array.from(menuPrincipal.querySelectorAll('a'));
  // Las secciones de formularios se asocian con la sección principal a la que pertenecen
  const equivalencias = {
    inicio: '#inicio',
    catalogo: '#catalogo',
    reserva: '#catalogo',
    actividades: '#actividades',
    inscripcion: '#actividades',
    contacto: '#contacto'
  };
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      const destino = equivalencias[entrada.target.id];
      enlaces.forEach((enlace) => {
        if (enlace.getAttribute('href') === destino) enlace.setAttribute('aria-current', 'true');
        else enlace.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-35% 0px -60% 0px' });
  Object.keys(equivalencias).forEach((id) => {
    const seccion = $(id);
    if (seccion) observador.observe(seccion);
  });
}

/* =========================================================
   5. CATÁLOGO: TARJETAS, BÚSQUEDA Y FILTRO  (RF1, RF2, RF3)
   ========================================================= */

// Devuelve los libros que cumplen la búsqueda Y la categoría a la vez
function obtenerLibrosFiltrados() {
  const termino = normalizarTexto(campoBusqueda.value);
  const categoria = selectorCategoria.value;

  return LIBROS.filter((libro) => {
    const coincideCategoria = categoria === '' || libro.categoria === categoria;
    const textoLibro = normalizarTexto(libro.titulo + ' ' + libro.autor);
    const coincideTexto = termino === '' || textoLibro.includes(termino);
    return coincideCategoria && coincideTexto;
  });
}

function crearTarjetaLibro(libro, posicion) {
  const categoria = CATEGORIAS[libro.categoria];
  const titulo = escaparHTML(libro.titulo);
  const tarjeta = document.createElement('article');
  tarjeta.className = 'book-card' + (primeraCarga ? ' animar' : '');
  tarjeta.style.setProperty('--retraso', Math.min(posicion, 8) * 45 + 'ms');
  tarjeta.setAttribute('aria-labelledby', 'libro-titulo-' + libro.id);

  const etiquetaDisponibilidad = libro.disponible
    ? '<p class="badge badge-ok"><svg class="icon" aria-hidden="true"><use href="#i-check"/></svg> Disponible (demostrativo)</p>'
    : '<p class="badge badge-no"><svg class="icon" aria-hidden="true"><use href="#i-x"/></svg> No disponible (demostrativo)</p>';

  tarjeta.innerHTML =
    '<div class="book-media"></div>' +
    '<div class="book-info">' +
      '<p class="book-cat"><svg class="icon" aria-hidden="true"><use href="#' + categoria.icono + '"/></svg>' + escaparHTML(libro.categoria) + '</p>' +
      '<h3 id="libro-titulo-' + libro.id + '">' + titulo + '</h3>' +
      '<p class="book-autor">' + escaparHTML(libro.autor) + '</p>' +
      '<p class="book-desc">' + escaparHTML(libro.descripcion) + '</p>' +
      etiquetaDisponibilidad +
    '</div>' +
    '<div class="book-actions">' +
      '<button type="button" class="btn btn-outline" data-accion="ficha" data-id="' + libro.id + '" aria-label="Ver ficha completa: ' + titulo + '">Ver ficha completa</button>' +
      '<button type="button" class="btn btn-primary" data-accion="reservar" data-id="' + libro.id + '" aria-label="Reservar libro: ' + titulo + '">Reservar libro</button>' +
    '</div>';

  tarjeta.querySelector('.book-media').appendChild(crearPortada(libro, false));
  return tarjeta;
}

// Dibuja de nuevo el catálogo según la búsqueda y la categoría
function mostrarCatalogo() {
  const libros = obtenerLibrosFiltrados();

  listaLibros.replaceChildren();
  libros.forEach((libro, posicion) => listaLibros.appendChild(crearTarjetaLibro(libro, posicion)));
  primeraCarga = false;

  // Mensaje de resultados
  const textoBusqueda = campoBusqueda.value.trim().replace(/\s+/g, ' ');
  const categoria = selectorCategoria.value;
  let mensaje;
  if (libros.length === 0) {
    mensaje = 'No se encontraron libros.';
  } else {
    mensaje = 'Mostrando ' + libros.length + ' de ' + LIBROS.length + ' libros';
    if (textoBusqueda) mensaje += ' para “' + textoBusqueda + '”';
    if (categoria) mensaje += ' en la categoría ' + categoria;
    mensaje += '.';
  }
  infoResultados.textContent = mensaje;

  // Estado "sin coincidencias"
  sinResultados.hidden = libros.length > 0;
}

function restablecerFiltros() {
  campoBusqueda.value = '';
  selectorCategoria.value = '';
  mostrarCatalogo();
  campoBusqueda.focus();
}

function iniciarCatalogo() {
  // La búsqueda se actualiza mientras se escribe
  campoBusqueda.addEventListener('input', mostrarCatalogo);
  campoBusqueda.addEventListener('search', mostrarCatalogo); // botón "x" del campo de búsqueda
  selectorCategoria.addEventListener('change', mostrarCatalogo);
  botonRestablecer.addEventListener('click', restablecerFiltros);
  botonRestablecerVacio.addEventListener('click', restablecerFiltros);
  // Evita que Enter recargue la página
  formularioFiltros.addEventListener('submit', (evento) => evento.preventDefault());

  // Un solo "escuchador" para todos los botones de las tarjetas (delegación de eventos)
  listaLibros.addEventListener('click', (evento) => {
    const boton = evento.target.closest('button[data-accion]');
    if (!boton) return;
    if (boton.dataset.accion === 'ficha') abrirFicha(boton.dataset.id);
    if (boton.dataset.accion === 'reservar') reservarLibro(boton.dataset.id);
  });

  mostrarCatalogo();
}

/* =========================================================
   6. FICHA COMPLETA (RF4) — ventana modal accesible
   Usa el elemento <dialog>: el navegador gestiona el foco,
   la tecla Escape y el bloqueo del contenido de fondo.
   ========================================================= */
function abrirFicha(idLibro) {
  const libro = buscarLibro(idLibro);
  if (!libro) return;
  libroEnFicha = libro;

  $('fichaCategoria').textContent = libro.categoria;
  $('fichaTitulo').textContent = libro.titulo;
  $('fichaAutor').textContent = libro.autor;
  $('fichaSinopsis').textContent = libro.sinopsis;
  $('fichaEditorial').textContent = libro.editorial;
  $('fichaIsbn').textContent = libro.isbn;
  $('fichaAnio').textContent = libro.anio;
  $('fichaPortada').replaceChildren(crearPortada(libro, false));

  const disponibilidad = $('fichaDisponibilidad');
  disponibilidad.className = 'badge ' + (libro.disponible ? 'badge-ok' : 'badge-no');
  disponibilidad.innerHTML = libro.disponible
    ? '<svg class="icon" aria-hidden="true"><use href="#i-check"/></svg> Disponible (demostrativo)'
    : '<svg class="icon" aria-hidden="true"><use href="#i-x"/></svg> No disponible (demostrativo)';

  document.body.classList.add('modal-abierto');
  if (typeof dialogoFicha.showModal === 'function') dialogoFicha.showModal();
  else dialogoFicha.setAttribute('open', '');
}

function cerrarFicha() {
  if (typeof dialogoFicha.close === 'function') dialogoFicha.close();
  else dialogoFicha.removeAttribute('open');
  document.body.classList.remove('modal-abierto');
}

function iniciarFicha() {
  $('fichaCerrarX').addEventListener('click', cerrarFicha);
  $('fichaCerrar').addEventListener('click', cerrarFicha);

  $('fichaReservar').addEventListener('click', () => {
    const idLibro = libroEnFicha ? libroEnFicha.id : '';
    cerrarFicha();
    if (idLibro) window.requestAnimationFrame(() => reservarLibro(idLibro));
  });

  // Clic en el fondo oscuro (fuera del contenido) cierra la ventana
  dialogoFicha.addEventListener('click', (evento) => {
    if (evento.target === dialogoFicha) cerrarFicha();
  });

  // También se ejecuta cuando se cierra con la tecla Escape
  dialogoFicha.addEventListener('close', () => document.body.classList.remove('modal-abierto'));
}

/* =========================================================
   7. FORMULARIO DE RESERVA (RF5) — solo demostración
   ========================================================= */

// Llena la lista desplegable con los libros del catálogo
function llenarSelectorReserva() {
  LIBROS.forEach((libro) => {
    const opcion = document.createElement('option');
    opcion.value = libro.id;
    opcion.textContent = libro.titulo + ' — ' + libro.autor + (libro.disponible ? '' : ' (no disponible)');
    reservaLibro.appendChild(opcion);
  });
}

// Muestra qué libro se está reservando (y avisa si no está disponible)
function actualizarResumenReserva() {
  const libro = buscarLibro(reservaLibro.value);
  if (!libro) {
    resumenReserva.hidden = true;
    resumenReserva.replaceChildren();
    return;
  }

  const texto = document.createElement('div');
  texto.innerHTML =
    '<p class="resumen-titulo">Libro seleccionado: ' + escaparHTML(libro.titulo) + '</p>' +
    '<p>' + escaparHTML(libro.autor) + ' · ' + escaparHTML(libro.categoria) + '</p>' +
    (libro.disponible
      ? '<p>Disponibilidad demostrativa: <strong>Disponible</strong>.</p>'
      : '<p><strong>Información:</strong> según los datos de ejemplo, este libro no está disponible, por lo que no se puede continuar con la solicitud demostrativa. Elige otro libro.</p>');

  resumenReserva.className = 'book-summary' + (libro.disponible ? '' : ' is-unavailable');
  resumenReserva.replaceChildren(crearPortada(libro, true), texto);
  resumenReserva.hidden = false;
}

// Botón "Reservar libro" de una tarjeta o de la ficha
function reservarLibro(idLibro) {
  if (!buscarLibro(idLibro)) return;
  reservaLibro.value = idLibro;
  limpiarErrorCampo(reservaLibro);
  ocultarMensaje(mensajeReserva);
  actualizarResumenReserva();
  irASeccion('reserva');
  reservaLibro.focus({ preventScroll: true });
}

function iniciarReserva() {
  llenarSelectorReserva();

  reservaLibro.addEventListener('change', () => {
    ocultarMensaje(mensajeReserva);
    actualizarResumenReserva();
  });

  revalidarAlCorregir(reservaLibro, () => validarLibroReserva(reservaLibro.value));
  revalidarAlCorregir(reservaNombre, () => validarNombre(reservaNombre.value));
  revalidarAlCorregir(reservaCorreo, () => validarCorreo(reservaCorreo.value));

  formularioReserva.addEventListener('submit', (evento) => {
    evento.preventDefault(); // nunca se envía nada: es una demostración
    ocultarMensaje(mensajeReserva);

    const primerInvalido = aplicarValidaciones([
      [reservaLibro, validarLibroReserva(reservaLibro.value)],
      [reservaNombre, validarNombre(reservaNombre.value)],
      [reservaCorreo, validarCorreo(reservaCorreo.value)]
    ]);

    if (primerInvalido) {
      mostrarMensaje(mensajeReserva, 'error', 'No se puede enviar la solicitud todavía',
        'Revisa los mensajes de error que aparecen debajo de cada campo y vuelve a intentarlo. No se envió nada.');
      primerInvalido.focus();
      return;
    }

    const libro = buscarLibro(reservaLibro.value);
    mostrarMensaje(mensajeReserva, 'success', 'Solicitud de demostración completada',
      'Los datos de la solicitud para “' + escaparHTML(libro.titulo) + '” tienen un formato válido. ' +
      '<strong>Esto es solo una demostración:</strong> la solicitud no se envió a la Biblioteca Municipal, ' +
      'no se reservó ningún libro y no se guardó ningún dato.');

    // Se vacía el formulario: el prototipo no conserva datos personales
    formularioReserva.reset();
    actualizarResumenReserva();
  });
}

/* =========================================================
   8. ACTIVIDADES E INSCRIPCIÓN (RF6, RF7) — solo demostración
   ========================================================= */
function crearTarjetaActividad(actividad) {
  const nombre = escaparHTML(actividad.nombre);
  const tarjeta = document.createElement('article');
  tarjeta.className = 'activity-card';
  tarjeta.dataset.id = actividad.id;
  tarjeta.setAttribute('aria-labelledby', 'actividad-titulo-' + actividad.id);
  tarjeta.innerHTML =
    '<span class="badge-sel"><svg class="icon" aria-hidden="true"><use href="#i-check"/></svg> Seleccionada</span>' +
    '<span class="activity-icon" aria-hidden="true"><svg class="icon"><use href="#' + actividad.icono + '"/></svg></span>' +
    '<h3 id="actividad-titulo-' + actividad.id + '">' + nombre + '</h3>' +
    '<p>' + escaparHTML(actividad.descripcion) + '</p>' +
    '<p class="activity-date"><svg class="icon" aria-hidden="true"><use href="#i-calendario"/></svg> <span><strong>Fecha:</strong> ' + escaparHTML(actividad.fecha) + '</span></p>' +
    '<button type="button" class="btn btn-gold" data-id="' + actividad.id + '" aria-label="Inscribirme en: ' + nombre + '">Inscribirme</button>';
  return tarjeta;
}

function llenarSelectorActividades() {
  ACTIVIDADES.forEach((actividad) => {
    const opcion = document.createElement('option');
    opcion.value = actividad.id;
    opcion.textContent = actividad.nombre;
    inscripcionActividad.appendChild(opcion);
  });
}

// Marca visualmente la tarjeta de la actividad elegida en el formulario
function marcarActividadSeleccionada() {
  listaActividades.querySelectorAll('.activity-card').forEach((tarjeta) => {
    tarjeta.classList.toggle('is-selected', tarjeta.dataset.id === inscripcionActividad.value);
  });
}

// Botón "Inscribirme" de una tarjeta
function inscribirseEn(idActividad) {
  if (!buscarActividad(idActividad)) return;
  inscripcionActividad.value = idActividad;
  limpiarErrorCampo(inscripcionActividad);
  ocultarMensaje(mensajeInscripcion);
  marcarActividadSeleccionada();
  irASeccion('inscripcion');
  inscripcionActividad.focus({ preventScroll: true });
}

function iniciarActividades() {
  ACTIVIDADES.forEach((actividad) => listaActividades.appendChild(crearTarjetaActividad(actividad)));
  llenarSelectorActividades();

  listaActividades.addEventListener('click', (evento) => {
    const boton = evento.target.closest('button[data-id]');
    if (boton) inscribirseEn(boton.dataset.id);
  });

  inscripcionActividad.addEventListener('change', () => {
    ocultarMensaje(mensajeInscripcion);
    marcarActividadSeleccionada();
  });

  revalidarAlCorregir(inscripcionActividad, () => validarActividad(inscripcionActividad.value));
  revalidarAlCorregir(inscripcionNombre, () => validarNombre(inscripcionNombre.value));
  revalidarAlCorregir(inscripcionCorreo, () => validarCorreo(inscripcionCorreo.value));

  formularioInscripcion.addEventListener('submit', (evento) => {
    evento.preventDefault(); // nunca se envía nada: es una demostración
    ocultarMensaje(mensajeInscripcion);

    const primerInvalido = aplicarValidaciones([
      [inscripcionActividad, validarActividad(inscripcionActividad.value)],
      [inscripcionNombre, validarNombre(inscripcionNombre.value)],
      [inscripcionCorreo, validarCorreo(inscripcionCorreo.value)]
    ]);

    if (primerInvalido) {
      mostrarMensaje(mensajeInscripcion, 'error', 'No se puede registrar la inscripción todavía',
        'Revisa los mensajes de error que aparecen debajo de cada campo y vuelve a intentarlo. No se registró nada.');
      primerInvalido.focus();
      return;
    }

    const actividad = buscarActividad(inscripcionActividad.value);
    mostrarMensaje(mensajeInscripcion, 'success', 'Inscripción de demostración completada',
      'Los datos para “' + escaparHTML(actividad.nombre) + '” tienen un formato válido. ' +
      '<strong>Esto es solo una demostración local:</strong> la inscripción no fue recibida por la Biblioteca Municipal, ' +
      'no se envió ningún correo y no se guardó ningún dato personal.');

    formularioInscripcion.reset();
    marcarActividadSeleccionada();
  });
}

/* =========================================================
   9. INICIO DE LA PÁGINA
   ========================================================= */
function iniciar() {
  iniciarMenu();
  iniciarCatalogo();
  iniciarFicha();
  iniciarReserva();
  iniciarActividades();
}

iniciar();
