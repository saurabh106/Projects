<?php
require 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $city = $_POST['city'] ?? '';
    $temperature = $_POST['temperature'] ?? '';
    $latitude = $_POST['latitude'] ?? '';
    $longitude = $_POST['longitude'] ?? '';

    if ($city && $temperature && $latitude && $longitude) {
        $sql = "INSERT INTO weather_data (city, temperature, latitude, longitude) VALUES (:city, :temperature, :latitude, :longitude)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':city' => $city,
            ':temperature' => $temperature,
            ':latitude' => $latitude,
            ':longitude' => $longitude,
        ]);
        echo "Weather data saved successfully.";
    } else {
        echo "Please provide all required data.";
    }
} else {
    echo "Invalid request method.";
}
?>
