

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

readingOrder.addEventListener('click', async() => {
  cosmereContent.style.display = 'block';

  cosmereContent.innerHTML = `
    <img class="orden-cosmere" src="img/orden-cosmere.jpg" alt="">
    `
})



/* All books */
const cosmereContent = document.querySelector(".cosmere-content");

const allBooks = document.getElementById('all-books');

allBooks.addEventListener('click', async () => {
    cosmereContent.innerHTML = '';

    console.log("Hola")
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
      } else {
        console.log("Error: Libro no encontrado");
      }
    } catch (error) {
      console.error("Error cargando libros:", error);
    }
  });
});
