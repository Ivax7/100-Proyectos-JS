<?php

// Incluir la conexión a la base de datos
include 'database.php';

// Consulta para obtener el top 10 de Pokémon más populares
$sql = "
  SELECT favorite_pokemon, COUNT(favorite_pokemon) AS count
  FROM form_data
  GROUP BY favorite_pokemon 
  ORDER BY count DESC 
  LIMIT 10
";

// Ejecutar la consulta
$result = $conn->query($sql);

// Inicializar un array para almacenar los resultados
$ranking = [];

if ($result->num_rows > 0) {
    // Recorrer los resultados y almacenarlos en el array
    while ($row = $result->fetch_assoc()) {
        $ranking[] = [
            'pokemon' => $row['favorite_pokemon'],
            'count' => $row['count'],
        ];
    }
}

// Devolver los datos en formato JSON
header('Content-Type: application/json');
echo json_encode($ranking);

// Cerrar la conexión
$conn->close();

?>

