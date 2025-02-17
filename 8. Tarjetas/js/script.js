/* CARGA PANTALLLA DE INICIO */
// const $chargePage = document.querySelector('.charge');
const $mainContent = document.querySelector('.content');

// setTimeout(() => {
//   $chargePage.style.opacity='0';
//   $chargePage.style.display='none';
  $mainContent.style.opacity='1';
// }, 2000);

const $importZone = document.querySelector('.import-zone');
const $importInput = document.querySelector(".import-image");
const $customizedCard = document.querySelector(".customized-card");
const $cardModal = document.querySelector(".card-modal");
const $downloadButton = document.querySelector('.download-button'); // Botón de descarga
const $chipImage = document.querySelector('.chip-image'); // Imagen del chip

// Evento de clic en el área de importación
$importZone.addEventListener("click", function() {
  $importInput.click(); // Simula un clic en el input file
  $customizedCard.classList.remove("show");
  $customizedCardContainer.classList.remove("show-chip");
});

// Lógica de importación de la imagen
$importInput.addEventListener("change", function(event) {
  handleFile(event.target.files[0]);
});

// Lógica de arrastrar la imagen
$importZone.addEventListener("dragover", (event) => {
  event.preventDefault();
  $importZone.style.border = "2px dashed black";
  $importZone.style.backgroundColor = "#fefefe";
});

$importZone.addEventListener("dragleave", () => {
  $importZone.style.border = "2px dashed gray";
  $importZone.style.backgroundColor = "#cecece";
});

$importZone.addEventListener("drop", (event) => {
  event.preventDefault();
  $importZone.style.border = "2px dashed gray";
  $importZone.style.backgroundColor = "#cecece";
  const file = event.dataTransfer.files[0]; // Obtener el archivo
  if (file) {
    handleFile(file);
  }
});

const $customizedCardContainer = document.querySelector('.customized-card-container');

// Manejar archivo y asignarlo a la tarjeta
function handleFile(file) {
  if (file && file.type.startsWith("image/")) {
    const imageURL = URL.createObjectURL(file);
    $customizedCard.src = imageURL; // Asigna la URL de la imagen a la tarjeta
    $cardModal.style.display = "block";
    
    // Añadir la clase para mostrar el chip y aplicar el efecto de escala
    $customizedCardContainer.classList.add("show-chip");

    setTimeout(() => {
      $customizedCard.classList.add("show"); 
    }, 10);
  } else {
    console.log("Por favor, sube un archivo de imagen válido.");
  }
}



$downloadButton.addEventListener('click', function(event) {
  event.preventDefault(); // Evita la acción predeterminada del enlace

  html2canvas($customizedCardContainer).then(canvas => {
    const imageURL = canvas.toDataURL('image/png'); // Convierte el canvas a PNG

    // Crea un enlace temporal para descargar la imagen
    const a = document.createElement('a');
    a.href = imageURL;
    a.download = 'custom-image.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a); // Elimina el enlace después de la descarga
  });
});


/* Animación al hacer click a la imagen */

$customizedCard.addEventListener('click', () => {
  $customizedCard.classList.toggle("show");
  $customizedCardContainer.classList.toggle("show-chip");
});
