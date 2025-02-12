export function allBooks() {
  const allBooksButton = document.getElementById('all-books');
  
  if (!allBooksButton) {
    console.error('El botón "All Books" no está disponible en el DOM');
    return;
  }

  console.log("Hola, el botón 'All Books' ha sido encontrado");

  allBooksButton.addEventListener('click', async () => {
    console.log("¡El botón 'All Books' ha sido clickeado!"); // Verifica si este log aparece en la consola

    const cosmereContent = document.querySelector('.cosmere-content');
    const timelineSection = document.querySelector('.timeline-section');

    cosmereContent.innerHTML = ''; // Limpiar el contenido actual
    cosmereContent.style.display = 'grid';

    try {
      const response = await fetch('/cosmere.json');
      const sagas = await response.json();

      let bookHTML = '';
      Object.values(sagas).forEach(cosmereSaga => {
        cosmereSaga.forEach(cosmereBook => {
          bookHTML += `
            <div class='book-section'>
              <h3>${cosmereBook.title}</h3>
              <p>${cosmereBook.publication_year}</p>
              <img src="${cosmereBook.cover_image}" alt="${cosmereBook.title}">
            </div>
          `;
        });
      });

      cosmereContent.innerHTML = bookHTML;
      timelineSection.style.display = 'none';

    } catch (error) {
      console.error("Error cargando libros:", error);
    }
  });
}
