<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Form to subscribe to a newsletter">

  <link rel="shortcut icon" href="img/akira.png" type="image/x-icon">
  <link rel="stylesheet" href="css/style.css">
  <title>AkiraNews</title>
</head>
<body>

  <div class="welcome-page">
    <h1>AkiraNews</h1>
    <div class="line">
      <p> &copy; シャビセラーノ</p>
    </div>
    <div class="suscribe">
      <button class="suscribe-button">Suscribe</button>
    </div>
  </div>


  <div class="form-page">
    <form action="submit_form.php" method="POST">
    <label for="name">Name / 名前</label>
    <input type="text" id="name" name="name" required>
    
    <label for="date">Date of Birth / 生年月日</label>
    <input type="date" id="date" name="date" required>
    
    <label for="e-mail">e-mail / 電子メール</label>
    <input type="email" id="e-mail" name="e-mail" required>
    
    <div class="select-character">
      <label for="favorite-character">Favorite Anime character / <br> 好きなアニメキャラクター</label>
      <input class="favorite-character" type="text" id="favorite-character" name="favorite-character" required>
      <div id="suggestions"></div> <!-- Aquí aparecerán las sugerencias -->
    </div>
    
    <input class="submit" type="submit" value="Suscribe">
</form>

  </div>

  <script src="js/script.js"></script>
  
</body>
</html>