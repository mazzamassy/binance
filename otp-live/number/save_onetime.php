<?php
// Database configuration
$host = 'localhost';
$dbname = 'b_logs';
$username = 'root';
$password = '';

try {
    // Create PDO connection
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Get the code from POST request
    $code = $_POST['code'] ?? '';
    
    // Validate the code (6 digits only)
    if (!preg_match('/^[0-9]{6}$/', $code)) {
        throw new Exception('Invalid code format');
    }
    
    // Prepare and execute the insert query
    $stmt = $pdo->prepare("INSERT INTO onetimesms (code) VALUES (?)");
    $stmt->execute([$code]);
    
    // Return success response
    echo json_encode([
        'success' => true,
        'message' => 'Code saved successfully'
    ]);
    
} catch (PDOException $e) {
    // Database error
    error_log("Database error: " . $e->getMessage());
    echo json_encode([
        'success' => false,
        'message' => 'Database error occurred'
    ]);
    
} catch (Exception $e) {
    // Validation or other error
    error_log("Error: " . $e->getMessage());
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?> 