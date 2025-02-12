
const cosmereContent = document.querySelector('.cosmere-content');


/* CIRCLES and MODALS MANAGMENT */

export function circlesModals () {

  cosmereContent.addEventListener('click', async (event) => {
    const circle = event.target; // Detecta el elemento clickeado
    
    if (!circle.classList.contains('circle')) return; // Ignora si no es un círculo
    
    const classList = [...circle.classList];
    const filteredClass = classList.find(cls => cls !== 'circle');
    
    if (!filteredClass) return;
    
    const formattedTitle = filteredClass.replace(/circle/g, ' ').trim();
    const finalTitle = formattedTitle.replace(/-/g, ' ').trim();
    
    try {
      const response = await fetch('/cosmere.json');
      const sagas = await response.json();
      
      let libroEncontrado = null;
      for (const saga in sagas) {
        libroEncontrado = sagas[saga].find(libro => libro.title.toLowerCase() === finalTitle.toLowerCase());
        if (libroEncontrado) break;
      }
      
      if (libroEncontrado) {
        let nombreClase = libroEncontrado.title.toLowerCase().replace(/ /g, '-');
        let modal = document.querySelector(`.modal-${nombreClase}`);
        
        if (modal) {
          modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
        } else {
          modal = document.createElement('div');
          modal.classList.add(`modal-${nombreClase}`, 'modal');
          modal.innerHTML = `<p>${libroEncontrado.description}</p>`;
          cosmereContent.appendChild(modal);
          modal.style.display = 'block';
        }
      } else {
        console.log("⚠️ No se encontró un libro con ese título en el JSON.");
      }
    } catch (error) {
      console.error("❌ Error al cargar cosmere.json:", error);
    }
  });
}