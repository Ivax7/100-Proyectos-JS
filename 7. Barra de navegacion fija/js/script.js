// const newReleaseContainer = document.querySelector('.list-new-releases');

// fetch('/books.json')
//   .then(response => response.json())
//   .then(data => {
//     const rows = 3; // Número de filas
//     const columns = Math.ceil(data.length / rows); // Aproximado de columnas necesarias
//     const occupiedPositions = Array.from({ length: rows }, () => Array(columns).fill(false));

//     data.forEach(book => {
//       const listElement = document.createElement("li");
//       const img = document.createElement("img");

//       img.src = book.cover_image;
//       img.alt = book.title;
//       img.classList.add("new-release-book");

//       // Decide si ocupará 1 o 2 filas
//       const rowSpan = Math.random() > 0.5 ? 2 : 1;
//       img.classList.add(rowSpan === 1 ? "one-row" : "two-rows");

//       // Encuentra una posición libre
//       let placed = false;
//       for (let col = 0; col < columns; col++) {
//         for (let row = 0; row <= rows - rowSpan; row++) {
//           // Verificar si el espacio está libre
//           let spaceAvailable = true;
//           for (let r = 0; r < rowSpan; r++) {
//             if (occupiedPositions[row + r][col]) {
//               spaceAvailable = false;
//               break;
//             }
//           }

//           if (spaceAvailable) {
//             // Marcar la posición como ocupada
//             for (let r = 0; r < rowSpan; r++) {
//               occupiedPositions[row + r][col] = true;
//             }

//             // Asignar posición en la grilla
//             listElement.style.gridRow = `span ${rowSpan}`;
//             listElement.style.gridColumnStart = col + 1;

//             listElement.appendChild(img);
//             newReleaseContainer.appendChild(listElement);
//             placed = true;
//             break;
//           }
//         }
//         if (placed) break;
//       }
//     });
//   })
//   .catch(error => console.error('Error al cargar los datos JSON:', error));



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



/* All books */
const cosmereContent = document.querySelector(".cosmere-content");
const allBooksCheckBox = document.getElementById('all-books');

allBooksCheckBox.addEventListener("change", async() => {
  cosmereContent.innerHTML = '';

  if (allBooksCheckBox.checked) {
    cosmereContent.style.display = 'grid';

    try {
      const response = await fetch('/cosmere.json');
      const sagas = await response.json();
      
      Object.values(sagas).forEach((cosmereSaga) => { 
        cosmereSaga.forEach((cosmereBook) => { 
          cosmereContent.innerHTML += `
            <div>
              <h3>${cosmereBook.title}</h3>
              <p>"${cosmereBook.publication_year}"</p>
              <img src="${cosmereBook.cover_image}" alt="${cosmereBook.title}">
            </div>
          `;
        });
      });
      
    } catch (error) {
      console.error("Error cargando libros:", error);
    }

  } else {
    // Restaurar la imagen original cuando se desmarca el checkbox
    cosmereContent.style.display = 'block';
    cosmereContent.innerHTML = `<img class="orden-cosmere" src="img/orden-cosmere.jpg" alt="Orden Cosmere">`;
  }
});






document.addEventListener("DOMContentLoaded", async function () {
  try {
    // Cargar los datos desde el JSON
    const response = await fetch("/cosmere.json");
    const sagas = await response.json();

    const mainContent = document.querySelector(".cosmere-content");
    const checkboxes = document.querySelectorAll(".book-list input[type='checkbox']");
    const allBooksCheckbox = document.getElementById("all-books");

    // Agregar evento a cada checkbox
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener("change", updateBookDisplay);
    });

    function updateBookDisplay() {
      let selectedBooks = [];

      if (allBooksCheckbox.checked) {
        // Mostrar todos los libros
        selectedBooks = Object.values(sagas).flat();
      } else {
        // Obtener solo los libros seleccionados
        checkboxes.forEach(checkbox => {
          if (checkbox.checked && checkbox.id !== "all-books") {
            const bookInfo = getBookInfoById(checkbox.id);
            if (bookInfo) selectedBooks.push(bookInfo);
          }
        });
      }

      displayBooks(selectedBooks);
    }

    function getBookInfoById(bookId) {
      // Buscar el libro en cada saga
      for (const saga in sagas) {
        const book = sagas[saga].find(book => normalizeTitle(book.title).includes(normalizeTitle(bookId)));
        if (book) return book;
      }
      return null;
    }

    function normalizeTitle(title) {
      // Normaliza el título eliminando números y convirtiendo a minúsculas
      return title.toLowerCase().replace(/\d+/g, "").trim();
    }

    function displayBooks(books) {
      mainContent.innerHTML = ""; // Limpiar contenido anterior

      if (books.length === 0) {
        mainContent.innerHTML = '<p>Selecciona un libro para ver su información.</p>';
        return;
      }

      books.forEach(book => {
        const bookElement = document.createElement("div");
        bookElement.classList.add("book-card");
        bookElement.innerHTML = `
          <h2>${book.title}</h2>
          <p><strong>Año de publicación:</strong> ${book.publication_year}</p>
          <p>${book.description}</p>
          <img src="${book.cover_image}" alt="${book.title}">
        `;
        mainContent.appendChild(bookElement);
      });
    }
  } catch (error) {
    console.error("Error al cargar los datos del Cosmere:", error);
  }
});

