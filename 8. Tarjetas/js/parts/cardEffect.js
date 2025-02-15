export function cardEffect() {
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



}