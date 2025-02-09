<?php
require 'config.php';

header('Content-Type: application/json'); // Set the response type to JSON

try {
    // Prepare the SQL statement to fetch all weather data
    $sql = "SELECT city, temperature, latitude, longitude FROM weather_data";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    // Fetch all results as an associative array
    $weatherData = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Return the data as a JSON response
    echo json_encode($weatherData);
} catch (PDOException $e) {
    // Return an error message in case of failure
    echo json_encode(['error' => 'Could not fetch data: ' . $e->getMessage()]);
}
?>
