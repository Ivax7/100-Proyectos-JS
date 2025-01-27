const form = document.getElementById('pokeForm');
const modal = document.getElementById('pokemonModal');
const pokemonName = document.getElementById('pokemonName');
const pokemonImage = document.getElementById('pokemonImage');
const pokemonType = document.getElementById('pokemonType');
const pokemonMessage = document.getElementById('pokemonMessage');
const rankingModal = document.getElementById('ranking');
const rankingContent = document.getElementById('rankingContent');
const closeRanking = document.querySelector('.close-ranking');
const openRankingButton = document.querySelector('.open-ranking'); // Botón para abrir el ranking

// Función para manejar el envío del formulario
form.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevenir la recarga de la página al enviar el formulario

  const favoritePokemon = document.getElementById('pokemon').value.trim().toLowerCase();

  // Verificar si el usuario ingresó un Pokémon
  if (!favoritePokemon) {
    alert('Por favor, ingresa el nombre de un Pokémon.');
    return;
  }

  try {
    // Llamada a la API de Pokémon para obtener información del Pokémon
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${favoritePokemon}`);
    if (!response.ok) throw new Error('Pokémon no encontrado');

    const data = await response.json();

    // Actualizar contenido del modal
    pokemonName.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    pokemonImage.src = data.sprites.other['official-artwork'].front_default || 'default-image.png';
    pokemonImage.alt = data.name;

    // Mostrar los tipos del Pokémon
    pokemonType.innerHTML = '';
    data.types.forEach((typeInfo) => {
      const typeImg = document.createElement('img');
      typeImg.className = 'type';
      typeImg.src = `https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/${typeInfo.type.name}.svg`;
      typeImg.alt = typeInfo.type.name;
      pokemonType.appendChild(typeImg);
    });

    pokemonMessage.textContent = `¡Tu formulario ha sido enviado con éxito! ¡Gracias, ${data.name}sito!`;

    // Mostrar el modal con la información
    modal.style.display = 'flex';

    // Enviar el formulario al backend
    const formData = new FormData(form);
    const formResponse = await fetch('php/process_form.php', {
      method: 'POST',
      body: formData,
    });

    const result = await formResponse.text();
    alert(result); // Muestra el mensaje del backend (éxito o error)
  } catch (error) {
    console.error('Error al procesar el formulario:', error);
    alert('No se pudo encontrar ese Pokémon o hubo un error en el envío.');
  }
});

// Cerrar modal de Pokémon
document.querySelector('.close').addEventListener('click', () => {
  modal.style.display = 'none';
});

// Cerrar modal al hacer clic fuera del contenido
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

async function fetchRanking() {
  try {
    const response = await fetch('php/getRanking.php');
    const text = await response.text(); // Obtén el texto crudo
    console.log('Respuesta cruda:', text); // Inspecciona en la consola del navegador

    // Buscar y extraer el JSON dentro de la respuesta cruda
    const jsonStartIndex = text.indexOf('['); // Encuentra el inicio del JSON
    const jsonEndIndex = text.lastIndexOf(']') + 1; // Encuentra el final del JSON

    if (jsonStartIndex === -1 || jsonEndIndex === -1) {
      throw new Error('No se encontró un JSON válido en la respuesta.');
    }

    const jsonString = text.slice(jsonStartIndex, jsonEndIndex); // Extrae el JSON
    const data = JSON.parse(jsonString); // Convierte el texto extraído en JSON

    // Procesar el ranking
    rankingContent.innerHTML = '';
    data.forEach((pokemon, index) => {
      const rankItem = document.createElement('div');
      rankItem.classList.add('rank-item');
      rankItem.innerHTML = `
        <span class="rank">${index + 1}</span>
        <span class="pokemon-name">${pokemon.pokemon}</span>
        <span class="count">${pokemon.count} votos</span>
      `;
      rankingContent.appendChild(rankItem);
    });
  } catch (error) {
    console.error('Error al cargar el ranking:', error);
    alert('Hubo un problema al cargar el ranking.');
  }
}




// Mostrar el modal de ranking
openRankingButton.addEventListener('click', () => {
  rankingModal.style.display = 'flex';
  fetchRanking(); // Cargar el ranking al abrir el modal
});

// Cerrar el modal de ranking
closeRanking.addEventListener('click', () => {
  rankingModal.style.display = 'none';
});

// Cerrar el modal de ranking al hacer clic fuera
window.addEventListener('click', (event) => {
  if (event.target === rankingModal) {
    rankingModal.style.display = 'none';
  }
});


// Enviar el formulario al backend
const formData = new FormData(form);
const formResponse = await fetch('php/process_form.php', {
  method: 'POST',
  body: formData,
});

// Manejar la respuesta del servidor
const result = await formResponse.text();

