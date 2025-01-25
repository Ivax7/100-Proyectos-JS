<?php
// Habilitar los errores
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Incluir la conexión a la base de datos
include 'database.php';

// Verificar si el formulario fue enviado
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Limpiar y validar los datos del formulario
    $name = isset($_POST['name']) ? trim($_POST['name']) : '';
    $surname = isset($_POST['surname']) ? trim($_POST['surname']) : '';
    $dob = isset($_POST['dob']) ? $_POST['dob'] : '';
    $favorite_pokemon = isset($_POST['favorite_pokemon']) ? trim($_POST['favorite_pokemon']) : '';

    if (!empty($name) && !empty($surname) && !empty($dob) && !empty($favorite_pokemon)) {
        // Preparar la consulta SQL
        $stmt = $conn->prepare("INSERT INTO form_data (name, surname, dob, favorite_pokemon) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $name, $surname, $dob, $favorite_pokemon);

        // Ejecutar y verificar
        if ($stmt->execute()) {
            echo "¡Datos guardados exitosamente!";
        } else {
            echo "Error al guardar los datos: " . $stmt->error;
        }

        $stmt->close();
    } else {
        echo "Por favor, completa todos los campos.";
    }
} else {
    echo "No se recibió ningún formulario.";
}

// Cerrar conexión
$conn->close();
?>
