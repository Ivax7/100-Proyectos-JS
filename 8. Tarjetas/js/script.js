
/* CARGA PANTALLLA DE INICIO */
const $chargePage = document.querySelector('.charge');
const $mainContent = document.querySelector('.content');

setTimeout(() => {
  $chargePage.style.opacity='0';
  $chargePage.style.display='none';
  $mainContent.style.opacity='1';
}, 2000);


/* ESTILADO E INTERACTIVIDAD CARROUSSEL*/

// carousel.js
import { initializeCarousel } from './carousel.js';
initializeCarousel();

/* COLOR LINKS*/
  import { colorLinks } from './colorLinks.js';
  colorLinks();

/* 3D effect*/
document.querySelectorAll(".img-container").forEach((container) => {
  const img = container.querySelector("img");

  container.addEventListener("mousemove", (e) => {
    const { width, height, left, top } = container.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 20; // Mueve en X
    const y = (e.clientY - top - height / 2) / 20; // Mueve en Y

    img.style.transform = `rotateX(${y}deg) rotateY(${x}deg) scale(1.05)`;
  });

  container.addEventListener("mouseleave", () => {
    img.style.transform = "rotateX(0deg) rotateY(0deg) scale(1.05)"; // Vuelve a la posición normal
  });
});


