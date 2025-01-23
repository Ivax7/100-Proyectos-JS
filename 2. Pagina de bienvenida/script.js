// Selección de elementos
const cuaderno = document.querySelector('.cuaderno');
const modal = document.getElementById('cuadernoModal');
const closeModal = document.querySelector('.modal-content .close');

// Abrir el modal al hacer clic en el cuaderno
cuaderno.addEventListener('click', () => {
  modal.style.display = 'block';
});

// Cerrar el modal al hacer clic en la "X"
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Cerrar el modal al hacer clic fuera del contenido
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});
