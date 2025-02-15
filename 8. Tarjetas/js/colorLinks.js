export function colorLinks() {
  // Selecciona los enlaces dentro del contenedor .links
  const links = document.querySelectorAll('.links');

  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      // Prevenir que la página se recargue si los enlaces son internos
      e.preventDefault();

      // Eliminar la clase 'active-link' de todos los enlaces
      links.forEach((link) => link.classList.remove('active-link'));
      
      // Añadir la clase 'active-link' al enlace clickeado
      link.classList.add('active-link');
    });
  });
}
