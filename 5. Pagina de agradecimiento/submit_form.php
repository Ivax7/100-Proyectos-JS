<?php
// Datos de conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "akira_news";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Obtener los datos del formulario
$name = $_POST['name'];
$date_of_birth = $_POST['date'];
$email = $_POST['e-mail'];
$favorite_character = $_POST['favorite-character'];

// Insertar los datos en la base de datos
$sql = "INSERT INTO subscriptions (name, date_of_birth, email, favorite_character) 
        VALUES ('$name', '$date_of_birth', '$email', '$favorite_character')";

// Verificar si la inserción fue exitosa
if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
    header("Location: thanks.php"); // Redirige a una página de agradecimiento
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Cerrar la conexión
$conn->close();
?>
