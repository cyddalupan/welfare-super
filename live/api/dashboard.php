<?php
include 'db.php';

// Get FRA list
$fraList = mysqli_query($conn, "SELECT id, name FROM fra_fra ORDER BY name ASC");

// Get status list for chart
$statusQuery = mysqli_query($conn, "SELECT status_name FROM status ORDER BY status_id ASC");

// Handle filters
$fra_id = $_GET['fra_id'] ?? '';
$date_from = $_GET['date_from'] ?? '';
$date_to   = $_GET['date_to'] ?? '';
$main_status_filter = $_GET['main_status'] ?? '';

// Build counts per status for chart
$data = [];
mysqli_data_seek($statusQuery,0);
while ($row = mysqli_fetch_assoc($statusQuery)) {
    $status = $row['status_name'];
    $conditions = [];
    if ($fra_id != '') $conditions[] = "fra_id='$fra_id'";
    if ($date_from != '') $conditions[] = "date_deployment >= '$date_from'";
    if ($date_to != '') $conditions[] = "date_deployment <= '$date_to'";
    $conditions[] = "main_status='$status'";
    $where = "WHERE " . implode(" AND ", $conditions);
    $sql = mysqli_query($conn, "SELECT COUNT(*) AS total FROM employee_employee $where");
    $count = mysqli_fetch_assoc($sql)['total'];
    $data[$status] = $count;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>FRA Employee Dashboard</title>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels"></script>
<style>
body { font-family:'Poppins',sans-serif; background: linear-gradient(135deg, #74ebd5, #0b3d91); margin:0; padding:20px; color:#fff; }
.container { max-width:1200px; margin:auto; background:rgba(255,255,255,0.95); padding:25px; border-radius:12px; color:#000; }
h2 { text-align:center; margin-bottom:20px; }
.filter-box { display:flex; gap:15px; flex-wrap:wrap; margin-bottom:20px; }
.filter-box > div { flex:1; min-width:180px; }
select, input[type=date] { padding:10px; width:100%; border-radius:6px; border:1px solid #ccc; }
button { padding:10px 20px; background:#1d4ed8; border:none; color:white; cursor:pointer; border-radius:6px; }
button:hover { background:#2563eb; }
canvas { margin-top:30px; }
</style>
</head>
<body>

<div class="container">
<h2>Employee Status Summary (Bar Chart)</h2>

<form method="GET" action="generate_report.php" target="_blank">
<div class="filter-box">
<div>
<label>FRA</label>
<select name="fra_id">
<option value="">All FRA</option>
<?php mysqli_data_seek($fraList,0); while($fra = mysqli_fetch_assoc($fraList)): ?>
<option value="<?= $fra['id'] ?>" <?= ($fra_id==$fra['id'])?'selected':'' ?>><?= htmlspecialchars($fra['name']) ?></option>
<?php endwhile; ?>
</select>
</div>

<div>
<label>Date Deployed From</label>
<input type="date" name="date_from" value="<?= htmlspecialchars($date_from) ?>">
</div>

<div>
<label>Date Deployed To</label>
<input type="date" name="date_to" value="<?= htmlspecialchars($date_to) ?>">
</div>

<div>
<label>Main Status</label>
<select name="main_status">
<option value="">All Status</option>
<?php mysqli_data_seek($statusQuery,0); while($statusOpt = mysqli_fetch_assoc($statusQuery)): ?>
<option value="<?= $statusOpt['status_name'] ?>" <?= ($main_status_filter==$statusOpt['status_name'])?'selected':'' ?>><?= htmlspecialchars($statusOpt['status_name']) ?></option>
<?php endwhile; ?>
</select>
</div>

<div style="display:flex; align-items:end;">
<button type="submit">Search</button>
</div>
</div>
</form>

<canvas id="statusChart"></canvas>
</div>

<script>
const labels = <?= json_encode(array_keys($data)) ?>;
const values = <?= json_encode(array_values($data)) ?>;

new Chart(document.getElementById('statusChart'), {
type:'bar',
plugins:[ChartDataLabels],
data:{
    labels:labels,
    datasets:[{
        label:'Total Employees',
        data:values,
        backgroundColor:labels.map(label=>{
            const l=label.toLowerCase();
            if(l.includes('complaint')) return 'rgba(239,68,68,0.7)';
            if(l.includes('arriv')) return 'rgba(22,163,74,0.7)';
            return 'rgba(29,78,216,0.7)';
        }),
        borderColor:'rgba(29,78,216,1)',
        borderWidth:1
    }]
},
options:{
    responsive:true,
    plugins:{ legend:{ display:false }, datalabels:{ color:'#000', anchor:'end', align:'end', font:{ weight:'bold', size:16 } } },
    scales:{ y:{ beginAtZero:true } }
}
});
</script>

</body>
</html>
