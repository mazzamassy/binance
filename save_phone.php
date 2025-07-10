<?php
header('Content-Type: application/json');
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $phone = $_POST['phone'] ?? '';
    
    if (!empty($phone)) {
        try {
            // Save phone number to session for later use
            session_start();
            $_SESSION['phone'] = $phone;
            
            echo json_encode(['success' => true, 'message' => 'Phone saved']);
        } catch(Exception $e) {
            echo json_encode(['success' => false, 'message' => 'Error saving phone']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Phone number required']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?> 