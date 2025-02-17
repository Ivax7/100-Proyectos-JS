import { initializeCarousel } from './parts/carousel.js';
import { colorLinks } from './parts/colorLinks.js';
import { cardEffect } from "./parts/cardEffect.js";
import { setupCreatePage } from './script.js';

// Función para manejar las rutas y cargar el contenido
function route(path) {
  const mainContent = document.getElementById('main-content');
  
  switch(path) {
    case '/create':
      mainContent.innerHTML = `
        <div id="create-main-content">
          <div class="import-zone"></div>
          <input class="import-image" type="file">
          
          <div class="card-modal">
            <div class="modal-header">
              <a class="download-button" href="" download="custom-image.png">
                <img src="./images/icons/download.png" alt="Download image">
              </a>
            </div>
            <div class="customized-card-container">
              <img class="customized-card" src="./images/characters/joker.png" alt="Sticker of Joker">
              <img class="chip-image" src="./images/chip.png" alt="Chip">

            </div>
          </div>
        </div>
      `;

      // Asegúrate de que los elementos del DOM ya están cargados antes de ejecutar la funcionalidad
      setTimeout(() => {
        setupCreatePage();
      }, 0);

      break;
    case '/about':
      mainContent.innerHTML = `
      
      <h1>About Page</h1><p>Welcome to the Designs page.</p>
      
      
      `;
      break;
    case '/community':
      mainContent.innerHTML = `

      <h1>Page community</h1><p>Here is page community.</p>
      <img src="https://img.utdstc.com/icon/214/6a9/2146a9129bd9efb14667937bc7f8dc216c095c2a18214c8bb1031dd11e8dcce0:200">
      
      
      `;
      break;
    default:
      mainContent.innerHTML = `
      <main>
        <div class="carousel">
          <div class="img-container">
            <img src="images/characters/joker.png" alt="Joker sticker card">
            <p>Joker</p>
          </div>
          <div class="img-container">
            <img src="images/characters/zelda.png" alt="Zelda sticker card">
            <p>Zelda</p>
          </div>
          <div class="img-container">
            <img src="images/characters/luffy.png" alt="Luffy sticker card">
            <p>Monkey D. Luffy</p>
          </div>
          <div class="img-container">
            <img src="images/characters/jin-woo.png" alt="Jin Woo sticker card">
            <p>Sung Jin-woo</p>
          </div>
        </div>
      </main>
      `;


      initializeCarousel();
      colorLinks();
      cardEffect();


      break;
  }

}

// Función para manejar los clics en los enlaces y prevenir la recarga de la página
function setupLinks() {
  const links = document.querySelectorAll('nav a');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault(); // Previene la recarga de la página
      const path = link.getAttribute('href');
      history.pushState(null, '', path); // Actualiza la URL sin recargar la página
      route(path); // Llama a la función route con la nueva ruta
    });

    setTimeout(() => {
      document.querySelectorAll("img").forEach(img => {
        console.log("Intentando cargar:", img.src);
      });
    }, 500);
    
  });
}

// Inicializa el router cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
  setupLinks();
  route(window.location.pathname); // Muestra el contenido según la URL actual
});

// Escucha cambios de estado en el historial (por ejemplo, al presionar el botón de atrás del navegador)
window.addEventListener('popstate', () => {
  route(window.location.pathname);
});
