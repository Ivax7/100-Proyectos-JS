const themeButtons = document.querySelectorAll('.theme ul li');
const body = document.querySelector('body');
const main = document.querySelector('main');
const monospaceFont = document.getElementById('monospace-font');

// Manejo de Monospaced
monospaceFont.addEventListener('click', () => {
  body.classList.toggle('monospace-font'); // Alterna la clase 'monospace-font'
  console.log("Monospaced font toggled!");
});

// Inicia en dark mode por defecto
body.classList.add('dark-mode');
main.classList.add('dark-mode');

// Manejo de temas
themeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const mode = button.id; // Obtener el id del botón clicado

    if (mode === 'monospace-font') {
      // No cambiar el tema cuando se hace clic en Monospaced
      return;
    }

    // Quitar cualquier tema existente
    body.classList.remove('dark-mode', 'light-mode');
    main.classList.remove('dark-mode', 'light-mode');

    // Activar el nuevo tema
    body.classList.add(mode);
    main.classList.add(mode);
  });
});


const projectList = document.querySelector('.project-list');

// Variable para almacenar el padding actual
let currentPadding = 200; // El padding inicial puede ser 200px o el valor que desees

// Función para ajustar el padding-top según el scroll
function adjustPaddingOnScroll() {
  // Obtiene la cantidad de desplazamiento
  const scrollPosition = projectList.scrollTop;

  // Calcula el nuevo padding, restando el scroll al valor actual de padding
  const newPadding = Math.max(0, currentPadding - scrollPosition); // Asegura que el padding no sea menor a 0

  // Aplica el nuevo padding-top
  projects.style.paddingTop = `${newPadding}px`;

  // Actualiza el padding actual
  currentPadding = newPadding;

  console.log("Nuevo padding:", newPadding); // Para ver el valor del padding en consola
}

// Escucha el evento de scroll dentro de .project-list
projectList.addEventListener('scroll', adjustPaddingOnScroll);
