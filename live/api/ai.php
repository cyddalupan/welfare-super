<?php
header('Content-Type: text/plain');

require_once 'config.php';

// Set up error handling
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Function to decrypt data (reused from database.php)
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

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Invalid request method. Only POST is accepted.');
    }

    // Read and decrypt the request
    $input = file_get_contents('php://input');
    if (empty($input)) {
        throw new Exception('No input data received.');
    }

    $decodedInput = base64_decode($input);
    if ($decodedInput === false) {
        throw new Exception('Base64 decoding failed.');
    }

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

    if (!isset($requestData['messages']) || !is_array($requestData['messages'])) {
        throw new Exception('Messages not provided or in incorrect format in the request.');
    }

    // Prepare data for OpenAI API
    $openai_data = [
        'model' => 'gpt-5-mini',
        'messages' => $requestData['messages']
    ];

    // Call OpenAI API using cURL
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://api.openai.com/v1/chat/completions');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($openai_data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Authorization: Bearer ' . OPENAI_API_KEY
    ]);

    $openai_response = curl_exec($ch);

    if (curl_errno($ch)) {
        throw new Exception('cURL Error: ' . curl_error($ch));
    }

    curl_close($ch);

    $openai_result = json_decode($openai_response, true);

    if (isset($openai_result['error'])) {
        throw new Exception('OpenAI API Error: ' . $openai_result['error']['message']);
    }

    if (!isset($openai_result['choices'][0]['message']['content'])) {
        throw new Exception('Could not extract message from OpenAI response.');
    }

    // Echo the AI's message content
    echo $openai_result['choices'][0]['message']['content'];

} catch (Exception $e) {
    http_response_code(500);
    echo 'Error: ' . $e->getMessage();
}
?>
