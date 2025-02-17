
/* CARGA PANTALLLA DE INICIO */
// const $chargePage = document.querySelector('.charge');
const $mainContent = document.querySelector('.content');

// setTimeout(() => {
//   $chargePage.style.opacity='0';
//   $chargePage.style.display='none';
  $mainContent.style.opacity='1';
// }, 2000);


/* CREATE OWN CARD */

/* Lógica de importar la imagen */
const $importZone = document.querySelector('.import-zone');
const $importInput = document.querySelector(".import-image");
const $customizedCard = document.querySelector(".customized-card");
const $cardModal = document.querySelector(".card-modal");

$importZone.addEventListener("click", function() {
  $importInput.click(); // Simula un clic en el input file
  $customizedCard.classList.remove("show"); 
});

$importInput.addEventListener("change", function(event) {
  handleFile(event.target.files[0]);
  updateDownloadLink();
});

/* Lógica de arrastrar la imagen */

// Permitir arrastrar sobre import-zone sin que el navegador lo bloquee
$importZone.addEventListener("dragover", (event) => {
  event.preventDefault();
  $importZone.style.border = "2px dashed black";
  $importZone.style.backgroundColor = "#fefefe";
});

// Restaurar estilo cuando el mouse sale del área
$importZone.addEventListener("dragleave", () => {
  $importZone.style.border = "2px dashed gray";
  $importZone.style.backgroundColor = "#cecece";
  updateDownloadLink();
});

// Manejar el archivo cuando se suelta sobre import-zone
$importZone.addEventListener("drop", (event) => {
  event.preventDefault();
  $importZone.style.border = "2px dashed gray";
  $importZone.style.backgroundColor = "#cecece";
  const file = event.dataTransfer.files[0]; // Obtener el archivo
  if (file) {
    handleFile(file);
  }
});

function handleFile(file) {
  if (file && file.type.startsWith("image/")) {
    const imageURL = URL.createObjectURL(file);
    $customizedCard.src = imageURL;
    $cardModal.style.display = "block";

    setTimeout(() => {
      $customizedCard.classList.add("show"); 
    }, 10);
  } else {
    console.log("Por favor, sube un archivo de imagen válido.");
  }
}


/* Download Button */
const $downloadButton = document.querySelector('.download-button');

function updateDownloadLink() {
  const imageSrc = $customizedCard.src;
  $downloadButton.href = imageSrc;
  updateDownloadLink();
}


