<?php
// Enable error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Database connection
$servername = 'localhost';
$db_name    = 'ztbsytte_welfare';
$username   = 'ztbsytte_cyd';
$password   = 'cU{DfkDcoQPL';

$conn = mysqli_connect($servername, $username, $password, $db_name);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>
