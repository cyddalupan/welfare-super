<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Include configuration
require_once 'config.php';

// Set up error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Function to decrypt data
function decryptData($encryptedData, $key, $iv) {
    $cipher = 'aes-256-cbc';
    if (strlen($iv) !== openssl_cipher_iv_length($cipher)) {
        throw new Exception('Invalid IV length. IV must be ' . openssl_cipher_iv_length($cipher) . ' bytes long.');
    }
    $decrypted = openssl_decrypt($encryptedData, $cipher, $key, OPENSSL_RAW_DATA, $iv);
    if ($decrypted === false) {
        throw new Exception('Decryption failed: ' . openssl_error_string());
    }
    return $decrypted;
}

$response = ['success' => false, 'message' => 'An unknown error occurred.'];

try {
    // Read and decrypt the request
    $input = file_get_contents('php://input');
    if (empty($input)) {
        throw new Exception('No input data received.');
    }

    $decodedInput = base64_decode($input);
    if ($decodedInput === false) {
        throw new Exception('Base64 decoding failed.');
    }

    // Establish database connection
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8", $db_user, $db_pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    // Extract IV from the beginning of the decoded input
    $ivLength = openssl_cipher_iv_length('aes-256-cbc');
    if (strlen($decodedInput) < $ivLength) {
        throw new Exception('Input data too short to contain IV.');
    }
    $iv = substr($decodedInput, 0, $ivLength);
    $encryptedPayload = substr($decodedInput, $ivLength);

    $decryptedPayload = decryptData($encryptedPayload, hex2bin(ENCRYPTION_KEY), $iv);
    $requestData = json_decode($decryptedPayload, true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('JSON decoding failed: ' . json_last_error_msg());
    }

    if (!isset($requestData['query'])) {
        throw new Exception('Query not provided in the request.');
    }

    $query = $requestData['query'];
    $params = $requestData['params'] ?? [];

    // Prepare and execute the query
    $stmt = $pdo->prepare($query);
    $stmt->execute($params);

    // Determine response based on query type
    $queryType = strtoupper(substr(trim($query), 0, 6));
    if ($queryType === 'SELECT') {
        $results = $stmt->fetchAll();
        $response = ['success' => true, 'data' => $results];
    } else {
        $response = ['success' => true, 'affected_rows' => $stmt->rowCount()];
    }

} catch (Exception $e) {
    http_response_code(500);
    $response = ['success' => false, 'message' => 'An exception occurred: ' . $e->getMessage()];
} catch (PDOException $e) {
    http_response_code(500);
    $response = ['success' => false, 'message' => 'Database error: ' . $e->getMessage()];
}

echo json_encode($response);
?>