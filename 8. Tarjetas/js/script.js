const $importZone = document.querySelector('.import-zone');
const $importInput = document.querySelector(".import-image");
const $customizedCard = document.querySelector(".customized-card");
const $cardModal = document.querySelector(".card-modal");
const $downloadButton = document.querySelector('.download-button'); // Botón de descarga
const $chipImage = document.querySelector('.chip-image'); // Imagen del chip

$importZone.addEventListener("click", function() {
  $importInput.click(); // Simula un clic en el input file
  $customizedCard.classList.remove("show");
  $customizedCardContainer.classList.remove("show-chip");
});

$importInput.addEventListener("change", function(event) {
  handleFile(event.target.files[0]);
  updateDownloadLink(); // Actualiza el enlace de descarga
});

/* Lógica de arrastrar la imagen */
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
    updateDownloadLink(); // Actualiza el enlace de descarga
  }
});

const $customizedCardContainer = document.querySelector('.customized-card-container');

function handleFile(file) {
  if (file && file.type.startsWith("image/")) {
    // Si es una imagen, crea una URL local para ella
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

/* Función para manejar una imagen desde una URL de internet */
function handleImageFromURL(url) {
  $customizedCard.src = url; // Establece el src con la URL de la imagen desde internet
  $cardModal.style.display = "block";
  
  // Añadir la clase para mostrar el chip y aplicar el efecto de escala
  $customizedCardContainer.classList.add("show-chip");

  setTimeout(() => {
    $customizedCard.classList.add("show");
  }, 10);
}

/* Función para actualizar el enlace de descarga */
function updateDownloadLink() {
  const imageSrc = $customizedCard.src; // Obtiene la URL de la imagen mostrada
  if (imageSrc.startsWith("http") || imageSrc.startsWith("https")) {
    // Si la imagen es de Internet, solo pasamos el enlace directo
    $downloadButton.href = imageSrc;
  } else {
    // Si la imagen es local, usamos URL.createObjectURL
    $downloadButton.href = imageSrc;
  }
  $downloadButton.download = 'custom-image.png'; // Nombre predeterminado para el archivo descargado
}
