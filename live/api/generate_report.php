<?php
include 'db.php';
header("Content-Type: application/vnd.ms-excel");
header("Content-Disposition: attachment; filename=Employee_Report_with_Cases.xls");

// Filters from GET
$fra_id = $_GET['fra_id'] ?? '';
$date_from = $_GET['date_from'] ?? '';
$date_to   = $_GET['date_to'] ?? '';
$main_status_filter = $_GET['main_status'] ?? '';

// Build WHERE conditions for employees
$conditions = [];
if($fra_id != '') $conditions[] = "e.fra_id='$fra_id'";
if($date_from != '') $conditions[] = "e.date_deployment >= '$date_from'";
if($date_to != '')   $conditions[] = "e.date_deployment <= '$date_to'";
if($main_status_filter != '') $conditions[] = "e.main_status='$main_status_filter'";
$where = '';
if(!empty($conditions)) $where = 'WHERE '.implode(" AND ", $conditions);

// Fetch employees
$employees = mysqli_query($conn, "
SELECT e.*, f.name AS fra_name
FROM employee_employee e
LEFT JOIN fra_fra f ON e.fra_id = f.id
$where
ORDER BY e.last_name ASC
");
?>

<table border="1">
<tr style="background:#1d4ed8; color:white;">
<th>Applicant Name</th>
<th>FRA</th>
<th>Date Deployed</th>
<th>Main Status</th>
<th>Case Category</th>
<th>Case Report</th>
<th>Date Reported</th>
</tr>

<?php while($emp = mysqli_fetch_assoc($employees)): ?>

<?php
// Fetch cases for this employee
$cases = mysqli_query($conn, "SELECT * FROM cases_case WHERE employee_id='{$emp['id']}' ORDER BY date_reported ASC");
$first_case = true;
?>

<?php if(mysqli_num_rows($cases) > 0): ?>
    <?php while($case = mysqli_fetch_assoc($cases)): ?>
    <tr>
        <?php if($first_case): ?>
        <td><?= htmlspecialchars($emp['last_name'].', '.$emp['first_name']) ?></td>
        <td><?= htmlspecialchars($emp['fra_name']) ?></td>
        <td><?= htmlspecialchars($emp['date_deployment']) ?></td>
        <td><?= htmlspecialchars($emp['main_status']) ?></td>
        <?php else: ?>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <?php endif; ?>

        <td><?= htmlspecialchars($case['category']) ?></td>
        <td>• <?= nl2br(htmlspecialchars($case['report'])) ?></td>
        <td><?= htmlspecialchars($case['date_reported']) ?></td>
    </tr>
    <?php $first_case = false; endwhile; ?>
<?php else: ?>
<tr>
<td><?= htmlspecialchars($emp['last_name'].', '.$emp['first_name']) ?></td>
<td><?= htmlspecialchars($emp['fra_name']) ?></td>
<td><?= htmlspecialchars($emp['date_deployment']) ?></td>
<td><?= htmlspecialchars($emp['main_status']) ?></td>
<td colspan="3">No Cases</td>
</tr>
<?php endif; ?>

<?php endwhile; ?>
</table>
