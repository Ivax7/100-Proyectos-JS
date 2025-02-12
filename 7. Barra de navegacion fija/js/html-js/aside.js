export async function generateSagas() {
  const cosmereSaga = document.querySelector('.cosmere-saga');
  
  try {
    // Cargar el JSON con las sagas y libros
    const response = await fetch('/cosmere.json');
    const sagas = await response.json();

    // Iteramos a través de las sagas
    for (const saga in sagas) {
      if (sagas.hasOwnProperty(saga)) {
        const sagaDiv = document.createElement('div');
        sagaDiv.classList.add('saga');  // Creamos un div para la saga

        const sagaTitle = document.createElement('h3');
        sagaTitle.classList.add('saga-title');
        sagaTitle.textContent = saga;  // Establecemos el título de la saga
        sagaDiv.appendChild(sagaTitle);  // Agregamos el título a la saga

        const bookList = document.createElement('ul');
        bookList.classList.add('book-list');  // Creamos una lista para los libros

        // Iteramos sobre los libros de la saga
        sagas[saga].forEach(book => {
          const bookItem = document.createElement('li');
          const bookTitle = document.createElement('p');
          bookTitle.classList.add('book');
          bookTitle.textContent = book.title;  // Establecemos el título del libro
          bookItem.appendChild(bookTitle);  // Agregamos el título al ítem del libro
          bookList.appendChild(bookItem);  // Agregamos el ítem a la lista de libros
        });

        sagaDiv.appendChild(bookList);  // Agregamos la lista de libros a la saga
        cosmereSaga.appendChild(sagaDiv);  // Agregamos la saga completa al contenedor

        // Ahora asignamos los eventos a las sagas y libros
        addSagaEventListeners();
      }
    }
  } catch (error) {
    console.error("Error al cargar las sagas:", error);
  }
}

function addSagaEventListeners() {
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
