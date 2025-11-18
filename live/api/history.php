<?php
include 'db.php';

// --- HANDLE FORM SUBMISSION ---
if (isset($_POST['submit'])) {

    $applicant_id       = $_POST['applicant_id'];
    $main_status        = $_POST['main_status'];
    $additional_remarks = $_POST['remarks'] ?? '';
    $remarks            = $main_status . ($additional_remarks ? " - " . $additional_remarks : "");
    $attachment         = '';

    // --- FILE UPLOAD ---
    if (!empty($_FILES['attachment']['name'])) {
        $fileName   = time() . '_' . basename($_FILES['attachment']['name']);
        $targetPath = "uploads/" . $fileName;

        if (move_uploaded_file($_FILES['attachment']['tmp_name'], $targetPath)) {
            $attachment = $fileName;
        } else {
            echo "<p style='color:red;'>File upload failed.</p>";
        }
    }

    // --- SQL INSERT using prepared statements ---
    $stmt = $conn->prepare("INSERT INTO applicant_history (applicant_id, remarks, attachment, status) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("isss", $applicant_id, $remarks, $attachment, $main_status);

    if ($stmt->execute()) {
        // --- SQL UPDATE main_status ---
        $update_stmt = $conn->prepare("UPDATE employee_employee SET main_status=? WHERE id=?");
        $update_stmt->bind_param("si", $main_status, $applicant_id);

        if ($update_stmt->execute()) {
            echo "<p style='color:green; text-align:center;'>History saved and status updated successfully!</p>";
        } else {
            echo "<p style='color:red; text-align:center;'>Error updating status: " . $conn->error . "</p>";
        }

    } else {
        echo "<p style='color:red; text-align:center;'>Error saving history: " . $conn->error . "</p>";
    }

    $stmt->close();
    if (isset($update_stmt)) $update_stmt->close();
}

// --- FETCH HISTORY ---
$applicant_id = $_GET['app_id'] ?? 0;
$applicant_id = intval($applicant_id);
$result = $conn->query("SELECT * FROM applicant_history WHERE applicant_id='$applicant_id' ORDER BY ids DESC");

// --- FETCH APPLICANT INFO ---
$resultapplicant = $conn->query("SELECT * FROM employee_employee WHERE id='$applicant_id'");
$row1 = $resultapplicant->fetch_assoc();
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Applicant History</title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
<style>
body {
    font-family: 'Poppins', sans-serif;
    background: linear-gradient(135deg, #74ebd5, #0b3d91);
    margin: 0;
    padding: 20px;
    color: #fff;
}

h1 {
    text-align: center;
    margin-bottom: 30px;
}

.container {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    width: 100%;
    margin: 0 auto;
}

.left-column {
    flex: 1;
    min-width: 300px;
    background-color: rgba(11, 61, 145, 0.9);
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(0,0,0,0.3);
}

.left-column .info-row {
    display: flex;
    justify-content: space-between;
    padding: 6px 0;
    border-bottom: 1px solid rgba(255,255,255,0.2);
    font-size: 0.95em;
}

.left-column .info-row:last-child {
    border-bottom: none;
}

.left-column .label {
    font-weight: 600;
}

.right-column {
    flex: 2;
    min-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

form {
    background: #fff;
    padding: 20px;
    border-radius: 12px;
    color: #333;
    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
    font-size: 0.95em;
}

form label {
    font-weight: 600;
    margin-bottom: 5px;
    display: block;
}

form input, form textarea, form select {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 6px;
    border: 1px solid #ccc;
    font-size: 0.95em;
}

form button {
    background: #4CAF50;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: 0.3s;
}

form button:hover {
    background: #45a049;
}

table {
    width: 100%;
    border-collapse: collapse;
    background: #fff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
    color: #333;
    font-size: 0.9em;
}

th, td {
    padding: 12px 15px;
    text-align: left;
}

th {
    background: #4CAF50;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 0.03em;
}

tr:nth-child(even) {
    background: #f2f2f2;
}

tr:hover {
    background: #d1e7dd;
    transition: 0.3s;
}

a.attachment-link {
    color: #4CAF50;
    text-decoration: none;
    font-weight: bold;
}

a.attachment-link:hover {
    text-decoration: underline;
}

@media(max-width: 900px){
    .container {
        flex-direction: column;
    }
}
</style>
</head>
<body>

<h1>Applicant History</h1>

<div class="container">

    <!-- Left Column: Applicant Info -->
    <div class="left-column">
        <div class="info-row"><span class="label">Name:</span> <?= htmlspecialchars($row1['last_name']) ?>, <?= htmlspecialchars($row1['first_name']) ?> <?= htmlspecialchars($row1['middle_name']) ?></div>
        <div class="info-row"><span class="label">Passport:</span> <?= htmlspecialchars($row1['passport_number']) ?></div>
        <div class="info-row"><span class="label">Contact:</span> <?= htmlspecialchars($row1['phone_number']) ?></div>
        <div class="info-row"><span class="label">Address:</span> <?= htmlspecialchars($row1['address']) ?></div>
        <div class="info-row"><span class="label">Facebook:</span> <?= htmlspecialchars($row1['facebook']) ?></div>
        <div class="info-row"><span class="label">Whatsapp:</span> <?= htmlspecialchars($row1['whatsapp']) ?></div>
        <div class="info-row"><span class="label">Emergency:</span> <?= htmlspecialchars($row1['emergency_contact_name']) ?> - <?= htmlspecialchars($row1['emergency_contact_phone']) ?></div>
        <br>
        
        <a href="chat.php?app_id=<?=$_GET['app_id']?>&&name=<?= htmlspecialchars($row1['last_name']) ?>, <?= htmlspecialchars($row1['first_name']) ?> <?= htmlspecialchars($row1['middle_name']) ?>" target="_blank" style="color:white;background:orange;padding:8px;margin:5px">Chat History</a> 
        <a href="sum.php?app_id=<?=$_GET['app_id']?>&&name=<?= htmlspecialchars($row1['last_name']) ?>, <?= htmlspecialchars($row1['first_name']) ?> <?= htmlspecialchars($row1['middle_name']) ?>" target="_blank" style="color:black;background:yellow;padding:8px;margin:5px">Summary Concern</a> 
    </div>

    <!-- Right Column: Form + History Table -->
    <div class="right-column">

        <!-- Form -->
        <form method="post" enctype="multipart/form-data">
            <input type="hidden" name="applicant_id" value="<?= htmlspecialchars($applicant_id) ?>">

            <label>Main Status:</label>
            <select name="main_status" required>
                <option value="<?= htmlspecialchars($row1['main_status']) ?>"><?= htmlspecialchars($row1['main_status']) ?> (Current)</option>
                <option value="CONTINUE WORKING">CONTINUE WORKING</option>
                <option value="RTW">RTW</option>
                <option value="TRANSFERRED EMPLOYER">TRANSFERRED EMPLOYER</option>
                <option value="RESOLVED">RESOLVED</option>
                <option value="ACTIVE COMPLAINT">ACTIVE COMPLAINT</option>
                <option value="CASE DETAILS UNDER CUSTODY">CASE DETAILS UNDER CUSTODY</option>
                <option value="ARRIVED">ARRIVED</option>
            </select>

            <label>Additional Remarks (Optional):</label>
            <textarea name="remarks" placeholder="Add more details..."></textarea>

            <label>Attachment:</label>
            <input type="file" name="attachment" accept=".jpg,.jpeg,.png,.pdf,.doc,.docx">

            <button type="submit" name="submit">Save History</button>
        </form>

        <!-- History Table -->
        <table>
            <tr>
                <th>ID</th>
                <th>Remarks</th>
                <th>Attachment</th>
                <th>Status</th>
                <th>Date</th>
            </tr>

            <?php while($row = $result->fetch_assoc()): ?>
            <tr>
                <td><?= htmlspecialchars($row['ids']) ?></td>
                <td><?= htmlspecialchars($row['remarks']) ?></td>
                <td>
                    <?php if($row['attachment']): ?>
                        <a class="attachment-link" href="uploads/<?= htmlspecialchars($row['attachment']) ?>" target="_blank">View</a>
                    <?php else: ?>
                        No Attachment
                    <?php endif; ?>
                </td>
                <td><?= htmlspecialchars($row['status']) ?></td>
                <td><?= date('d M Y, h:i A', strtotime($row['created_at'])) ?></td>
            </tr>
            <?php endwhile; ?>
        </table>

    </div>

</div>

</body>
</html>
