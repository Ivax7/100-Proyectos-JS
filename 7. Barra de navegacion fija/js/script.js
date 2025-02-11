
import { horizontalScroll, loadBooks } from "./parts/horizontal-scroll.js";
document.addEventListener("DOMContentLoaded", () => {
  loadBooks();
  horizontalScroll();
});

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

      <span class="circle sixth-of-the-dusk-circle"></span>
        
        <span class="circle elantris-circle"></span>
        
        <span class="circle the-emperors-soul-circle"></span>
        
        <span class="circle the-hope-of-elantris-circle"></span>
        
        <span class="circle the-final-empire-circle"></span>
        <span class="circle the-well-of-ascension-circle"></span>
        <span class="circle the-hero-of-ages-circle"></span>
        
        <span class="circle the-eleventh-metal-circle"></span>
        
        <span class="circle the-alloy-of-law-circle"></span>
        <span class="circle shadows-of-self-circle"></span>
        <span class="circle the-bands-of-mourning-circle"></span>
        <span class="circle the-lost-metal-circle"></span>
        
        <span class="circle alomante-jak-circle"></span>
        
        <span class="circle secret-history-circle"></span>
        
        <span class="circle warbreaker-circle"></span>
        
        <span class="circle the-way-of-kings-circle"></span>
        <span class="circle words-of-radiance-circle"></span>
        <span class="circle oathbringer-circle"></span>
        <span class="circle rhythm-of-war-circle"></span>
        
        <span class="circle edgedancer-circle"></span>
        <span class="circle dawnshard-circle"></span>
        <span class="circle the-sunlit-man-circle"></span>

        <span class="circle tress-of-the-emeral-sea-circle"></span>
      
        <span class="circle white-sand-circle"></span>
        <span class="circle yumi-and-the-nightmare-painter-circle"></span>
        <span class="circle shadows-for-silence-in-the-forests-of-hell-circle"></span>
    `
  
  timelineSection.style.display = 'block';
  
})



/* All books */
const cosmereContent = document.querySelector(".cosmere-content");

const allBooks = document.getElementById('all-books');

allBooks.addEventListener('click', async () => {
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

/* Delegación de eventos */
cosmereContent.addEventListener('click', async (event) => {
  const circle = event.target; // Detecta el elemento clickeado

  if (!circle.classList.contains('circle')) return; // Ignora si no es un círculo

  const classList = [...circle.classList];
  const filteredClass = classList.find(cls => cls !== 'circle');

  if (!filteredClass) return;

  const formattedTitle = filteredClass.replace(/circle/g, ' ').trim();
  const finalTitle = formattedTitle.replace(/-/g, ' ').trim();

  try {
    const response = await fetch('/cosmere.json');
    const sagas = await response.json();

    let libroEncontrado = null;
    for (const saga in sagas) {
      libroEncontrado = sagas[saga].find(libro => libro.title.toLowerCase() === finalTitle.toLowerCase());
      if (libroEncontrado) break;
    }

    if (libroEncontrado) {
      let nombreClase = libroEncontrado.title.toLowerCase().replace(/ /g, '-');
      let modal = document.querySelector(`.modal-${nombreClase}`);

      if (modal) {
        modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
      } else {
        modal = document.createElement('div');
        modal.classList.add(`modal-${nombreClase}`, 'modal');
        modal.innerHTML = `<p>${libroEncontrado.description}</p>`;
        cosmereContent.appendChild(modal);
        modal.style.display = 'block';
      }
    } else {
      console.log("⚠️ No se encontró un libro con ese título en el JSON.");
    }
  } catch (error) {
    console.error("❌ Error al cargar cosmere.json:", error);
  }
});
