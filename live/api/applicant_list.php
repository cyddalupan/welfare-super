<?php
include 'db.php';

// Receive filters from dashboard
$fra_id = $_GET['fra_id'] ?? '';
$date_from = $_GET['date_from'] ?? '';
$date_to   = $_GET['date_to'] ?? '';
$main_status_filter = $_GET['main_status'] ?? '';

// Build WHERE conditions
$conditions = [];
if($fra_id != '') $conditions[] = "fra_id = '$fra_id'";
if($date_from != '') $conditions[] = "date_deployment >= '$date_from'";
if($date_to != '')   $conditions[] = "date_deployment <= '$date_to'";
if($main_status_filter != '') $conditions[] = "main_status = '$main_status_filter'";
$where = '';
if(!empty($conditions)) $where = 'WHERE ' . implode(' AND ', $conditions);

// Get applicants
$applicants = mysqli_query($conn, "SELECT * FROM employee_employee $where ORDER BY last_name ASC");

// Get all statuses for checkboxes
$statusQuery = mysqli_query($conn, "SELECT status_name FROM status ORDER BY status_id ASC");
?>
<!DOCTYPE html>
<html>
<head>
<title>Applicant List</title>
<style>
table { width:100%; border-collapse: collapse; }
th, td { padding:10px; border:1px solid #ccc; text-align:left; }
th { background:#1d4ed8; color:#fff; }
.checkbox-status { margin-right:10px; }
button { padding:10px 20px; background:#1d4ed8; border:none; color:white; cursor:pointer; border-radius:6px; }
button:hover { background:#2563eb; }
</style>
</head>
<body>

<h2>Applicant List</h2>

<form method="POST" action="generate_report.php">
<table>
<thead>
<tr>
<th>Applicant Name</th>
<th>FRA</th>
<th>Date Deployed</th>
<th>Main Status</th>
<th>Select Status</th>
</tr>
</thead>
<tbody>
<?php while($app = mysqli_fetch_assoc($applicants)): ?>
<tr>
<td><?= htmlspecialchars($app['last_name']) ?>, <?= htmlspecialchars($app['first_name']) ?></td>
<td>
<?php 
$fra = mysqli_fetch_assoc(mysqli_query($conn, "SELECT name FROM fra_fra WHERE id = '{$app['fra_id']}'"));
echo htmlspecialchars($fra['name']);
?>
</td>
<td><?= htmlspecialchars($app['date_deployment']) ?></td>
<td><?= htmlspecialchars($app['main_status']) ?></td>
<td>
<?php
mysqli_data_seek($statusQuery,0);
while($status = mysqli_fetch_assoc($statusQuery)):
?>
<label class="checkbox-status">
<input type="checkbox" name="status_selected[<?= $app['id'] ?>][]" value="<?= $status['status_name'] ?>">
<?= $status['status_name'] ?>
</label><br>
<?php endwhile; ?>
</td>
</tr>
<?php endwhile; ?>
</tbody>
</table>
<br>
<button type="submit">Generate Report</button>
</form>

</body>
</html>
