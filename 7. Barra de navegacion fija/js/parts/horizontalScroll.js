
export async function loadBooks() {
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

export function horizontalScroll() {
    const container = document.querySelector(".grid-container");
    if (!container) return; // Evita errores si no encuentra el contenedor
    
    container.addEventListener("wheel", (event) => {
      event.preventDefault(); // Evita el scroll vertical predeterminado
      container.scrollLeft += event.deltaY; // Convierte el scroll vertical en horizontal
    });
};

