
export function setupCreatePage() {


  const $importZone = document.querySelector('.import-zone');
  const $importInput = document.querySelector(".import-image");
  const $customizedCard = document.querySelector(".customized-card");
  const $customizedCardContainer = document.querySelector('.customized-card-container');
  const $cardModal = document.querySelector(".card-modal");
  const $downloadButton = document.querySelector('.download-button'); // Botón de descarga
  
  // Evento de clic en el área de importación
  $importZone.addEventListener("click", function() {
    $importInput.click(); // Simula un clic en el input file
  
    zoomInZoomOut();
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
  
  $importZone.addEventListener('dragenter', () => {
    zoomInZoomOut()
  })
  
  $importZone.addEventListener("dragleave", () => {
    $importZone.style.border = "2px dashed gray";
    $importZone.style.backgroundColor = "#cecece";
    zoomInZoomOut();
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
    zoomInZoomOut();
  });
}
  
function zoomInZoomOut() {
  const $customizedCard = document.querySelector(".customized-card");
  const $customizedCardContainer = document.querySelector(".customized-card-container");
  
  if($customizedCard.classList.contains('show') && $customizedCardContainer.classList.contains('show-chip')) {
    $customizedCard.classList.remove("show");
    $customizedCardContainer.classList.remove("show-chip");
  } else {
    $customizedCard.classList.add("show");
    $customizedCardContainer.classList.add("show-chip");
  }
}