const form = document.getElementById('pokeForm');
const modal = document.getElementById('pokemonModal');
const pokemonName = document.getElementById('pokemonName');
const pokemonImage = document.getElementById('pokemonImage');
const pokemonType = document.getElementById('pokemonType');
const pokemonMessage = document.getElementById('pokemonMessage');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const favoritePokemon = document.getElementById('pokemon').value.toLowerCase();

  try {
    // Conectar a la PokéAPI
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${favoritePokemon}`);
    
    if (!response.ok) {
      throw new Error('Pokémon no encontrado');
    }

    const data = await response.json();

    // Actualizar contenido del modal
    pokemonName.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1); // Capitaliza el nombre
    pokemonImage.src = data.sprites.other['official-artwork'].front_default; // Imagen oficial del Pokémon

    // Tipos de Pokémon
    pokemonType.innerHTML = ''; // Limpiar tipos previos
    data.types.forEach((typeInfo) => {
      const typeImg = document.createElement('img');
      typeImg.className="type";
      typeImg.src = `https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/${typeInfo.type.name}.svg`;
      typeImg.alt = typeInfo.type.name;
      typeImg.style.width = '50px';
      pokemonType.appendChild(typeImg);
    });

    // Mensaje personalizado
    pokemonMessage.textContent = `¡Tu formulario ha sido enviado ${data.name}sito!`;

    // Mostrar modal
    modal.style.display = 'flex';
  } catch (error) {
    alert('No se pudo encontrar ese Pokémon. Por favor, revisa el nombre.');
  }
});