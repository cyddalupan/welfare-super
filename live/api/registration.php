<?php
include 'db.php';

// Handle form submission
$message = "";

if (isset($_POST['submit'])) {

    $first_name  = mysqli_real_escape_string($conn, $_POST['first_name']);
    $middle_name = mysqli_real_escape_string($conn, $_POST['middle_name']);
    $last_name   = mysqli_real_escape_string($conn, $_POST['last_name']);
    $passport    = mysqli_real_escape_string($conn, $_POST['passport_number']);
    $dob         = mysqli_real_escape_string($conn, $_POST['date_of_birth']);
    $address     = mysqli_real_escape_string($conn, $_POST['address']);
    $phone       = mysqli_real_escape_string($conn, $_POST['phone_number']);
    $fra_id      = mysqli_real_escape_string($conn, $_POST['fra_id']);
    $fb          = mysqli_real_escape_string($conn, $_POST['facebook']);
    $wa          = mysqli_real_escape_string($conn, $_POST['whatsapp']);
    $em_name     = mysqli_real_escape_string($conn, $_POST['emergency_contact_name']);
    $em_phone    = mysqli_real_escape_string($conn, $_POST['emergency_contact_phone']);
    $deploy_date = mysqli_real_escape_string($conn, $_POST['date_deployment']); // NEW FIELD

    // Check duplicate passport number
    $check = mysqli_query($conn, "SELECT passport_number FROM employee_employee WHERE passport_number='$passport'");
    if (mysqli_num_rows($check) > 0) {
        $message = "<p class='error'>⚠ Passport number is already registered!</p>";
    } else {

        // INSERT DATA (with date_deployment)
        $sql = "INSERT INTO employee_employee 
                (first_name, middle_name, last_name, passport_number, date_of_birth, address, phone_number, fra_id, facebook, whatsapp, emergency_contact_name, emergency_contact_phone, date_deployment)
                VALUES 
                ('$first_name','$middle_name','$last_name','$passport','$dob','$address','$phone','$fra_id','$fb','$wa','$em_name','$em_phone','$deploy_date')";

        if (mysqli_query($conn, $sql)) {
            $message = "<p class='success'>✔ Employee registered successfully!</p>";
        } else {
            $message = "<p class='error'>Database Error: " . mysqli_error($conn) . "</p>";
        }
    }
}

?>
<!DOCTYPE html>
<html>
<head>
<title>Employee Registration</title>

<style>
body {
    margin: 0;
    font-family: 'Poppins', Arial, sans-serif;
    background: url('https://images.unsplash.com/photo-1521791136064-7986c2920216') no-repeat center center/cover;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

.form-container {
    width: 450px;
    padding: 25px;
    background: rgba(255,255,255,0.95);
    border-radius: 20px;
    box-shadow: 0 8px 30px rgba(0,0,0,0.3);
}

.form-container h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #222;
    font-weight: 700;
}

input, select {
    width: 100%;
    padding: 12px;
    margin: 8px 0 18px 0;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: 15px;
    background: #f8f8f8;
}

button {
    width: 100%;
    background: #0077cc;
    padding: 12px;
    border: none;
    color: white;
    font-size: 17px;
    border-radius: 10px;
    cursor: pointer;
    font-weight: bold;
    transition: 0.3s ease;
}

button:hover {
    background: #005fa3;
}

.success {
    background: #d4ffd4;
    color: #227722;
    padding: 10px;
    text-align: center;
    border-radius: 8px;
    margin-bottom: 10px;
    font-weight: bold;
}

.error {
    background: #ffd4d4;
    color: #aa0000;
    padding: 10px;
    text-align: center;
    border-radius: 8px;
    margin-bottom: 10px;
    font-weight: bold;
}
</style>

</head>
<body>

<div class="form-container">
   <a href="https://welfare.reviewcenterphil.com/api/doha.apk"> <img src="qr1.png" style="width:150px"></a>



<?php echo $message; ?>

<form method="POST">

    <input type="text" name="first_name" placeholder="First Name" required>
    <input type="text" name="middle_name" placeholder="Middle Name" required>
    <input type="text" name="last_name" placeholder="Last Name" required>

    <input type="text" name="passport_number" placeholder="Passport Number" required>

    <label>Date of Birth:</label>
    <input type="date" name="date_of_birth" required>

    <input type="text" name="address" placeholder="Address" required>
    <input type="text" name="phone_number" placeholder="Phone Number" required>

    <!-- FRA DROPDOWN -->
    <select name="fra_id" required>
        <option value="">Select FRA</option>
        <?php
        $fra = mysqli_query($conn, "SELECT * FROM fra_fra ORDER BY name ASC");
        while ($row = mysqli_fetch_assoc($fra)) {
            echo "<option value='{$row['id']}'>{$row['name']}</option>";
        }
        ?>
    </select>

    <input type="text" name="facebook" placeholder="Facebook URL">
    <input type="text" name="whatsapp" placeholder="WhatsApp Number">

    <input type="text" name="emergency_contact_name" placeholder="Emergency Contact Name" required>
    <input type="text" name="emergency_contact_phone" placeholder="Emergency Contact Phone" required>

    <!-- NEW FIELD -->
    <label>Date of Deployment:</label>
    <input type="date" name="date_deployment" required>

    <button type="submit" name="submit">Register</button>
</form>

</div>

</body>
</html>
