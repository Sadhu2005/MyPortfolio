<?php
// --- Step 1: Simple admin password protection ---
$admin_password = "Sadhu@1947"; // <-- Change this to your own secure password
session_start();
if (!isset($_SESSION['logged_in'])) {
    if (isset($_POST['password']) && $_POST['password'] === $admin_password) {
        $_SESSION['logged_in'] = true;
    } else {
        echo '<form method="post">
                <input type="password" name="password" placeholder="Enter admin password" required>
                <button type="submit">Login</button>
              </form>';
        exit;
    }
}

// --- Step 2: Connect to database ---
$host = "localhost";
$db = "u575564595_portfolio_db";
$user = "u575564595_Sadhu_J";
$pass = "Sadhu@1947"; // Replace this with your actual database password

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);

// --- Step 3: Upload image and insert record ---
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['certificate'])) {
    $description = $conn->real_escape_string($_POST['description']);
    $target_dir = "certificates/";
    $filename = basename($_FILES["certificate"]["name"]);
    $target_file = $target_dir . time() . "_" . $filename;

    if (move_uploaded_file($_FILES["certificate"]["tmp_name"], $target_file)) {
        $conn->query("INSERT INTO certificates (image_url, description) VALUES ('$target_file', '$description')");
        echo "<p style='color:green;'>Certificate uploaded!</p>";
    } else {
        echo "<p style='color:red;'>Upload failed!</p>";
    }
}
?>

<!-- --- Step 4: HTML Form --- -->
<form method="post" enctype="multipart/form-data">
    <label>Choose Certificate Image:</label><br>
    <input type="file" name="certificate" required><br><br>
    
    <label>Description:</label><br>
    <textarea name="description" required></textarea><br><br>
    
    <button type="submit">Upload Certificate</button>
</form>
