<?php
include 'db.php'; // make sure db.php has your mysqli connection $conn

$applicant_id = $_GET['app_id'] ?? 0;
// Fetch chat history
$query = "SELECT * FROM chats_chat where employee_id='$applicant_id' ORDER BY timestamp ASC";
$result = mysqli_query($conn, $query);




?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Chat History</title>
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
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.message {
    padding: 10px 15px;
    margin: 8px 0;
    border-radius: 12px;
    max-width: 75%;
    display: inline-block;
    position: relative;
}

/* AI message */
.ai {
    background: #d8e7ff;
    color: #003b8e;
    border-left: 4px solid #0056e0;
}

/* Employee message */
.employee {
    background: #d9ffe3;
    color: #006b2f;
    border-left: 4px solid #00b449;
    margin-left: auto;
}

/* Timestamp */
.timestamp {
    font-size: 12px;
    color: #555;
    margin-top: 4px;
    display: block;
}
</style>
</head>
<body>

<div class="chat-container">
    <h2 style="text-align:center; margin-bottom:20px;">Chat History</h2>
   <h3 style="text-align:center; margin-bottom:20px;"><?=$_GET['name']?></h3>
    <?php while($row = mysqli_fetch_assoc($result)): ?>
        <?php
            $sender_class = strtolower($row['sender']) === 'ai' ? 'ai' : 'employee';
        ?>
        <div class="message <?= $sender_class ?>">
            <?= nl2br(htmlspecialchars($row['message'])) ?>
            <span class="timestamp"><?= date("M d, Y h:i A", strtotime($row['timestamp'])) ?></span>
        </div>
    <?php endwhile; ?>

</div>

</body>
</html>
