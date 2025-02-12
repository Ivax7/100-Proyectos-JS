const cosmereContent = document.querySelector(".cosmere-content");
const timelineSection = document.querySelector('.timeline-section');

export function timeline() {
  const readingOrder = document.getElementById('order');  // Obtenemos el botón al cargar la función
  if (!readingOrder) {
    console.error('El botón "Timeline" no está disponible en el DOM');
    return;
  }
  
  readingOrder.addEventListener('click', async () => {
    cosmereContent.innerHTML = ''; // Limpiar el contenido actual

    cosmereContent.innerHTML = `
      <img class="orden-cosmere" src="img/orden-cosmere.jpg" alt="">
    `;

    cosmereContent.style.display = 'block';

    try {
      const response = await fetch('/cosmere.json'); // Verifica que la ruta sea correcta
      const sagas = await response.json();

      // Iterar sobre cada saga y sus libros
      Object.values(sagas).forEach(books => {
        books.forEach(book => {
          const bookTitleClass = book.title.toLowerCase().replace(/ /g, '-');
          const circle = document.createElement('span');
          circle.classList.add('circle', `${bookTitleClass}-circle`);
          circle.dataset.title = book.title;

          cosmereContent.appendChild(circle); // Añadir el círculo a la vista
        });
      });

      timelineSection.style.display = 'block'; // Mostrar la sección de la línea de tiempo

    } catch (error) {
      console.error('❌ Error al cargar cosmere.json', error);
    }
  });
}
