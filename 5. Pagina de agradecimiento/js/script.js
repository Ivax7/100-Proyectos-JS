const suscribeButton = document.querySelector('.suscribe-button');
const submit = document.querySelector('.submit');
const formPage = document.querySelector('.form-page');
const thanksPage = document.querySelector('.thanks-page');

suscribeButton.addEventListener("click", () => {
  formPage.classList.add("visible"); // Activa la expansión circular
});


/* Favorite character dynamic recomendation */


const inputCharacter = document.querySelector("#favorite-character");
const suggestionsContainer = document.querySelector("#suggestions");

inputCharacter.addEventListener("keyup", async () => {
  removeSuggestions(); // Borra sugerencias anteriores
  if (inputCharacter.value.length < 3) return; // Evita búsquedas con menos de 3 caracteres

  const url = `https://api.jikan.moe/v4/characters?q=${inputCharacter.value}&limit=5`;
  const response = await fetch(url);
  const jsonData = await response.json();

  jsonData.data.forEach(character => {
    let div = document.createElement("div");
    div.classList.add("suggestion-item");
    div.textContent = character.name;
    div.onclick = () => selectCharacter(character.name);
    suggestionsContainer.appendChild(div);
  });
});

function removeSuggestions() {
  suggestionsContainer.innerHTML = "";
}

function selectCharacter(name) {
  inputCharacter.value = name; // Rellena el input con el nombre seleccionado
  removeSuggestions(); // Borra la lista de sugerencias
}
