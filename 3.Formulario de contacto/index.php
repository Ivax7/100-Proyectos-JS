<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Pokemon selector form">
  <link rel="stylesheet" href="style.css">
  <title>PokeForm</title>
</head>
<body>
  <main>
    <h1>Pokemon Form</h1>

    <form id="pokeForm" action="php/process_form.php" method="POST">
    <label for="name">Name</label>
    <input type="text" id="name" name="name" required>

    <label for="surname">Surname</label>
    <input type="text" id="surname" name="surname" required>

    <label for="date">Date of Birth</label>
    <input type="date" id="date" name="dob" required>

    <label for="pokemon">Favourite Pokemon</label>
    <input type="text" id="pokemon" name="favorite_pokemon" required>

    <input type="submit" class="submit" value="Submit">
    </form>


    <!-- Modal para mostrar información del Pokémon -->
    <section class="modal" id="pokemonModal" style="display: none;">
      <div id="pokemonModalContent">
        <span class="close">&times;</span>
        <div class="imagen">
          <img id="pokemonImage" src="gengar.png" alt="Imagen del pokemon">
        </div>
        <div class="pokemonInfo">
          <h2 id="pokemonName">Gengar</h2>
          <div class="type" id="pokemonType"></div>
          <p id="pokemonMessage">¡Tu formulario ha sido enviado Gengarsito!</p>
        </div>
      </div>
    </section>

    <!-- Modal para mostrar el ranking -->
    <section id="ranking">
      <button class="close-ranking">&times;</button>
      <h2>Top 10 Pokémon Favoritos</h2>
      <div id="rankingContent"></div>
    </section>

    <button class="open-ranking">Ver Ranking</button>
  </main>

  <script type="module" src="script.js"></script>
</body>
</html>
