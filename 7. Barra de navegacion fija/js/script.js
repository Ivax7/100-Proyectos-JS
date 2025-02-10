

async function loadBooks() {
  try {
      const response = await fetch('/books.json');
      const books = await response.json();
      const gallery = document.getElementById("gallery");

      books.forEach((book, index) => {
          let rowSpan = Math.random() > 0.5 ? 2 : 1; 
          let rowStart = rowSpan === 2 ? Math.floor(Math.random() * 2) + 1 :  Math.floor(Math.random() * 2) + 2; 

          let imgElement = document.createElement("div");
          imgElement.classList.add("grid-item");
          if (rowSpan === 2) imgElement.classList.add("span-2");
          imgElement.style.gridRow = `${rowStart} / span ${rowSpan}`;
          imgElement.style.gridColumn = `${index + 1} / span 1`;

          let img = document.createElement("img");
          img.src = book.cover_image;
          img.alt = book.title;

          imgElement.appendChild(img);
          gallery.appendChild(imgElement);
      });
  } catch (error) {
      console.error("Error cargando libros:", error);
  }
}

loadBooks();


/* Scroll Horizontal */


document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".grid-container");
  
  container.addEventListener("wheel", (event) => {
    event.preventDefault(); // Evita el scroll vertical predeterminado
    container.scrollLeft += event.deltaY; // Convierte el scroll vertical en horizontal
  });
});


/* Interactive Main Content */


const readingOrder = document.getElementById('order');
const timelineSection = document.querySelector('.timeline-section')
const pageContent = document.querySelector('page-content')

readingOrder.addEventListener('click', async() => {
  cosmereContent.style.display = 'block';

  cosmereContent.innerHTML = `      
      <img class="orden-cosmere" src="img/orden-cosmere.jpg" alt="">
    `
  
  timelineSection.style.display = 'block';
  
})



/* All books */
const cosmereContent = document.querySelector(".cosmere-content");

const allBooks = document.getElementById('all-books');

allBooks.addEventListener('click', async () => {
  console.log("Hola")
    cosmereContent.innerHTML = '';

    cosmereContent.style.display = 'grid';

    try {
      const response = await fetch('/cosmere.json');
      const sagas = await response.json();
      
      Object.values(sagas).forEach((cosmereSaga) => { 
        cosmereSaga.forEach((cosmereBook) => { 
          cosmereContent.innerHTML += `
            <div class='book-section'>
              <h3>${cosmereBook.title}</h3>
              <p>${cosmereBook.publication_year}</p>
              <img src="${cosmereBook.cover_image}" alt="${cosmereBook.title}">
            </div>
          `;

          timelineSection.style.display = 'none';
          
        });
      });
      
    } catch (error) {
      console.error("Error cargando libros:", error);
    }

  }
);


const sagaTitles = document.querySelectorAll('.saga-title');

sagaTitles.forEach(sagaTitle => {
  sagaTitle.addEventListener('click', async () => {
    console.log("Click detectado");

    cosmereContent.innerHTML = '';

    const nombreSaga = sagaTitle.textContent.trim();

    try {
      const response = await fetch('/cosmere.json');
      const sagas = await response.json();

      if (sagas[nombreSaga]) {
        console.log("Saga encontrada:", nombreSaga);
        console.log("Libros de la saga:", sagas[nombreSaga]);

        let numLibros = sagas[nombreSaga].length;
        
      

        let numFilas = Math.ceil(numLibros / 3); // Siempre 3 columnas

        if (numLibros <= 4) {
          cosmereContent.style.display = "block"; 

        } else {
          // Establecer grid dinámico
          cosmereContent.style.display = "grid";
          cosmereContent.style.gridTemplateColumns = "repeat(3, 1fr)";
          cosmereContent.style.gridTemplateRows = `repeat(${numFilas}, auto)`; // Se adapta a la cantidad de libros
        }

        let html = `<h2 class="titulo-saga">${nombreSaga}</h2>`;

        sagas[nombreSaga].forEach(libro => {
            html += `
                <div class='book-section'>
                    <h3>${libro.title}</h3>
                    <p>${libro.publication_year}</p>
                    <img src="${libro.cover_image}" alt="${libro.title}">
                </div>
            `;
        });

        cosmereContent.innerHTML = html;
        timelineSection.style.display = 'none';

    } else {
        console.log("Error: Saga no encontrada en el JSON");
    }
    } catch (error) {
      console.error("Error cargando libros:", error);
    }
  });
});


document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', async (event) => {
    // Verificar si el clic proviene de un `.book` o `.book-section`
    const clickedBook = event.target.closest('.book');
    const clickedBookSection = event.target.closest('.book-section');

    // Si no hizo clic en ninguno de los dos, salir de la función
    if (!clickedBook && !clickedBookSection) return;

    console.log("Click detectado");

    // Limpiar el contenido antes de mostrar el nuevo libro
    cosmereContent.innerHTML = '';

    // Obtener el título del libro según el elemento clicado
    const tituloLibro = clickedBook
      ? clickedBook.textContent.trim() // Si se hizo clic en un `.book`
      : clickedBookSection.querySelector('h3').textContent.trim(); // Si se hizo clic en `.book-section`

    console.log("Título del libro clickeado:", tituloLibro);

    try {
      const response = await fetch('/cosmere.json');
      const sagas = await response.json();

      let libroEncontrado = null;

      for (const saga in sagas) {
        libroEncontrado = sagas[saga].find(libro => libro.title === tituloLibro);
        if (libroEncontrado) break;
      }

      if (libroEncontrado) {
        console.log("Libro encontrado:", libroEncontrado);

        cosmereContent.style.display = "block";

        function formatSynopsis(text) {
          return text.split('. ').map(sentence => `<p style="margin-bottom: 10px;">${sentence}.</p>`).join('');
        }

        cosmereContent.innerHTML = `
          <div class='book-review'>
            <div class='book-info'>
              <h3 class="book-title">${libroEncontrado.title}</h3>
              <p class='publication-year'>${libroEncontrado.publication_year}</p>
              <div class='synopsis'>${formatSynopsis(libroEncontrado.synopsis_en)}</div>
            </div>
            <div>
              <img src="${libroEncontrado.cover_image}" alt="${libroEncontrado.title}">
            </div>
          </div>
        `;
        timelineSection.style.display = 'none';

      } else {
        console.log("Error: Libro no encontrado");
      }
    } catch (error) {
      console.error("Error cargando libros:", error);
    }
  });
});




/* CIRCLES and MODALS MANAGMENT */

const circles = document.querySelectorAll('.circle');

circles.forEach(circle => {
  circle.addEventListener('click', async () => {
    // Obtener el nombre de la clase
    const classList = [...circle.classList]; // Convertimos la lista en un array
    const filteredClass = classList.find(cls => cls !== 'circle'); // Filtramos la clase "circle"

    if (!filteredClass) return; // Evitamos errores si no hay más clases

    // Limpiar el nombre: quitar "circle", reemplazar guiones y limpiar espacios extra
    const formattedTitle = filteredClass.replace(/circle/g, ' ').trim();
    const finalTitle = formattedTitle.replace(/-/g, ' ').trim();


    // Buscamos en el JSON el libro con el mismo título
    try {
      const response = await fetch('/cosmere.json');
      const sagas = await response.json();

      let libroEncontrado = null;

      // Iterar sobre las sagas y buscar el libro con el título formateado
      for (const saga in sagas) {
        libroEncontrado = sagas[saga].find(libro => libro.title.toLowerCase() === finalTitle.toLowerCase());
        if (libroEncontrado) break;
      }

      if (libroEncontrado) {

        // Convertir el título a minúsculas y reemplazar los espacios con guiones
        let nombreClase = libroEncontrado.title.toLowerCase().replace(/ /g, '-');

        // Buscar si ya existe el modal con ese nombre
        let modal = document.querySelector(`.modal-${nombreClase}`);

        if (modal) {
          // Si el modal ya existe, alternamos su visibilidad
          const currentDisplay = window.getComputedStyle(modal).display;

          if (currentDisplay === 'block') {
            modal.style.display = 'none'; // Ocultar si está visible
          } else {
            modal.style.display = 'block'; // Mostrar si está oculto
          }
        } else {
          // Si no existe, creamos y mostramos el modal
          modal = document.createElement('div');
          modal.classList.add(`modal-${nombreClase}`);
          modal.classList.add(`modal`);
          modal.innerHTML = `
            <p>${libroEncontrado.description}</p>
          `;

          // Agregar el modal al contenido de cosmere
          cosmereContent.appendChild(modal);

          // Mostrar el modal
          modal.style.display = 'block'; // Cambiar display a block para que sea visible
        }
      } else {
        console.log("⚠️ No se encontró un libro con ese título en el JSON.");
      }
    } catch (error) {
      console.error("❌ Error al cargar cosmere.json:", error);
    }
  });
});