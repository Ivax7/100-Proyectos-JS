// carousel.js

export function initializeCarousel() {
  const images = Array.from(document.querySelectorAll(".img-container"));
  let currentIndex = 0;

  function updateCarousel() {
    const total = images.length;

    images.forEach((img, index) => {
      img.classList.remove("active", "left", "right", "hidden");

      let newIndex = (index - currentIndex + total) % total;

      if (newIndex === 0) {
        img.classList.add("active");
      } else if (newIndex === 1) {
        img.classList.add("right");
      } else if (newIndex === total - 1) {
        img.classList.add("left");
      } else {
        img.classList.add("hidden");
      }
    });
  }

  document.querySelector(".carousel").addEventListener("click", (event) => {
    const clickedImg = event.target.closest(".img-container");
    if (!clickedImg) return;

    if (clickedImg.classList.contains("right")) {
      currentIndex = (currentIndex + 1) % images.length;
    } else if (clickedImg.classList.contains("left")) {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
    }

    updateCarousel();
  });

  updateCarousel();
}
