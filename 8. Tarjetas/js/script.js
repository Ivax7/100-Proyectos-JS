
const $chargePage = document.querySelector('.charge');
const $mainContent = document.querySelector('.content');

setTimeout(() => {
  $chargePage.style.opacity='0';
  $chargePage.style.display='none';
  $mainContent.style.opacity='1';
}, 2000);

document.addEventListener("DOMContentLoaded", () => {
  const images = Array.from(document.querySelectorAll(".img-container"));

  let currentIndex = 0;

  function updateCarousel() {
      const total = images.length;

      images.forEach((img, index) => {
          img.classList.remove("active", "left", "right", "hidden");

          // Calcular nueva posición de la imagen en base a `currentIndex`
          let newIndex = (index - currentIndex + total) % total;

          if (newIndex === 0) {
              img.classList.add("active"); // Imagen en el centro
          } else if (newIndex === 1) {
              img.classList.add("right"); // Imagen a la derecha
          } else if (newIndex === total - 1) {
              img.classList.add("left"); // Imagen a la izquierda
          } else {
              img.classList.add("hidden"); // Imagen oculta
          }
      });
  }

  // Evento para detectar clics en las imágenes
  document.querySelector(".carousel").addEventListener("click", (event) => {
      const clickedImg = event.target.closest(".img-container");
      if (!clickedImg) return; // Evitar errores si no se clickea una imagen

      if (clickedImg.classList.contains("right")) {
          currentIndex = (currentIndex + 1) % images.length; // Mover a la derecha
      } else if (clickedImg.classList.contains("left")) {
          currentIndex = (currentIndex - 1 + images.length) % images.length; // Mover a la izquierda
      }

      updateCarousel();
  });

  updateCarousel(); // Inicializa las posiciones del carrusel
});



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
