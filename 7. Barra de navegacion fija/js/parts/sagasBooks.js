
export function searchSaga() {
  const sagaTitles = document.querySelectorAll('.saga-title');  // Asegurémonos que los títulos de las sagas estén en el DOM
  
  sagaTitles.forEach(sagaTitle => {
    sagaTitle.addEventListener('click', async () => {
      console.log("Click detectado en la saga");

      const nombreSaga = sagaTitle.textContent.trim();
      const cosmereContent = document.querySelector('.cosmere-content');
      const timelineSection = document.querySelector('.timeline-section');
      
      cosmereContent.innerHTML = '';  // Limpiamos el contenido de cosmereContent

      try {
        const response = await fetch('/cosmere.json');
        const sagas = await response.json();

        if (sagas[nombreSaga]) {
          console.log("Saga encontrada:", nombreSaga);
          
          let numLibros = sagas[nombreSaga].length;
          let numFilas = Math.ceil(numLibros / 3);  // Siempre 3 columnas

          cosmereContent.style.display = numLibros <= 4 ? "block" : "grid";  // Si hay pocos libros, mostramos en bloque

          if (numLibros > 4) {
            cosmereContent.style.gridTemplateColumns = "repeat(3, 1fr)";
            cosmereContent.style.gridTemplateRows = `repeat(${numFilas}, auto)`;  // Establecemos el grid dinámico
          }

          let html = `<h2 class="titulo-saga">${nombreSaga}</h2>`;
          
          sagas[nombreSaga].forEach(libro => {
            html += `
              <div class='book-section'>
                <h3 class='book'>${libro.title}</h3>
                <p>${libro.publication_year}</p>
                <img src="${libro.cover_image}" alt="${libro.title}">
              </div>
            `;
          });

          cosmereContent.innerHTML = html;
          timelineSection.style.display = 'none';  // Ocultamos la línea de tiempo

        } else {
          console.log("Error: Saga no encontrada en el JSON");
        }
      } catch (error) {
        console.error("Error cargando libros:", error);
      }
    });
  });
}


export function searchBook() {
  const cosmereContent = document.querySelector('.cosmere-content');
  const timelineSection = document.querySelector('.timeline-section');

  document.addEventListener('click', async (event) => {
    const clickedBook = event.target.closest('.book');
    const clickedBookSection = event.target.closest('.book-section');

    if (!clickedBook && !clickedBookSection) return;  // Si no clickeamos en un libro o sección de libro

    console.log("Click detectado en el libro");

    // Limpiar el contenido antes de mostrar el nuevo libro
    cosmereContent.innerHTML = '';

    // Obtener el título del libro clicado
    const tituloLibro = clickedBook ? clickedBook.textContent.trim() : clickedBookSection.querySelector('h3').textContent.trim();

    console.log("Título del libro clickeado:", tituloLibro);

    try {
      const response = await fetch('/cosmere.json');
      const sagas = await response.json();

      let libroEncontrado = null;

      for (const saga in sagas) {
        libroEncontrado = sagas[saga].find(libro => libro.title === tituloLibro);
        if (libroEncontrado) break;  // Si encontramos el libro, salimos del ciclo
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
}
