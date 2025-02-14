// Función para manejar las rutas y cargar el contenido
function route(path) {
  const content = document.getElementById('main-content');
  
  switch(path) {
    case '/designs':
      content.innerHTML = `
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
      
      break;
    case '/create':
      content.innerHTML = `
      
      <h1>Create Page</h1><p>Welcome to the Designs page.</p>
      
      
      `;
      break;
    case '/about':
      content.innerHTML = `
      
      <h1>About Page</h1><p>Welcome to the Designs page.</p>
      
      
      `;
      break;
    case '/x':
      content.innerHTML = `

      <h1>Page X</h1><p>Here is page X.</p>
      
      
      `;
      break;
    default:
      content.innerHTML = `
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
