
const newReleaseContainer = document.querySelector(".list-new-releases");

async function searchNewReleases() {
  const apiKey = "AIzaSyBg3X9-hcCNH3lvsX7lyhXd4NQ2ES28ZBA";
  const url = `https://www.googleapis.com/books/v1/volumes?q=subject:fiction&orderBy=newest&printType=books&maxResults=16&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    console.log(data); // Muestra la respuesta en la consola

    newReleaseContainer.innerHTML = ""; // Limpiar contenido anterior

    // Extraer información de los libros
    data.items.forEach(book => {

      const listElement = document.createElement("li");
      const imageLinks = book.volumeInfo.imageLinks;

      if (imageLinks && imageLinks.thumbnail) {
        const img = document.createElement("img");
        img.src = imageLinks.thumbnail;
        img.alt = "Book Cover";
        img.classList.add("new-release-book");

        listElement.appendChild(img)
        newReleaseContainer.appendChild(listElement)
        
      }


    });
    
  } catch (error) {
    console.error("Error al obtener los libros:", error);
  }
}

// Llamar a la función con una búsqueda
searchNewReleases();
