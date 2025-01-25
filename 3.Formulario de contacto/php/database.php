<?php
$host = 'localhost';
$dbname = 'pokeform_db';
$username = 'root';
$password = '';

// Crear conexión
$conn = new mysqli($host, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die('Error de conexión: ' . $conn->connect_error);
} else {
    echo "Conexión exitosa a la base de datos"; // Solo para pruebas
}
?>
