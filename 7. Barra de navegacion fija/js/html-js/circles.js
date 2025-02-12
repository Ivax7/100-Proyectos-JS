export async function circles() {

  try {
    const response = await fetch('../cosmere.json');
    const sagas = await response.json();
    
    // Iterar sobre cada saga y sus libros
    Object.values(sagas).forEach(books => {
      books.forEach(book => {
        const bookTitleClass = book.title.toLowerCase().replace(/ /g, '-');
        const circle = document.createElement('span');
        circle.classList.add('circle', `${bookTitleClass}-circle`);
        circle.dataset.title = book.title;
        
        cosmereContent.appendChild(circle);
      });
    }); 
  } catch (error) {
  console.error('❌ Error al cargar cosmere.json', error);
  }
};