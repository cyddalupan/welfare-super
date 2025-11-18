<?php
include 'db.php'; // Make sure db.php has your mysqli connection $conn

// Get applicant ID safely
$applicant_id = isset($_GET['app_id']) ? intval($_GET['app_id']) : 0;
$applicant_name = isset($_GET['name']) ? htmlspecialchars($_GET['name']) : "Unknown";

// Fetch chat history
$query = "SELECT * FROM employee_employeememory WHERE employee_id = ? ORDER BY created_at ASC";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $applicant_id);
$stmt->execute();
$result = $stmt->get_result();
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Summary Concern</title>
<style>
body {
    font-family: Arial, sans-serif;
    background: #f5f5f5;
    padding: 20px;
}

.chat-container {
    max-width: 700px;
    margin: auto;
    background: #fff;
    padding: 25px;
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.chat-container h2, .chat-container h3 {
    text-align: center;
    margin-bottom: 15px;
}

.message {
    padding: 12px 18px;
    margin: 10px 0;
    border-radius: 15px;
    background: #e0e0e0; /* neutral color since no sender */
    max-width: 100%;
    word-wrap: break-word;
}

.timestamp {
    font-size: 12px;
    color: #555;
    margin-top: 6px;
    display: block;
    text-align: right;
}
</style>
</head>
<body>

<div class="chat-container">
    <h2>Summary Concern</h2>
    <h3><?= $applicant_name ?></h3>

    <?php while($row = $result->fetch_assoc()): ?>
        <div class="message">
            <?= nl2br(htmlspecialchars($row['note'])) ?>
            <span class="timestamp"><?= date("M d, Y", strtotime($row['created_at'])) ?></span>
        </div>
    <?php endwhile; ?>

</div>

</body>
</html>
