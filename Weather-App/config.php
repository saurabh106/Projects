<?php
$host = 'localhost'; // Database host
$db = 'weather-app'; // Database name
$user = 'root'; // Database username
$pass = ''; // Database password (default is empty for XAMPP)

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>
