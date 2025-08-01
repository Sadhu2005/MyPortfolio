<?php
// Secret key protection
$secret = 'Sadhu@1947'; // Change this to something only you know
if (!isset($_GET['key']) || $_GET['key'] !== $secret) {
    die('Unauthorized');
}

$host = "localhost";
$db = "u575564595_portfolio_db";
$user = "u575564595_Sadhu_J";
$pass = "Sadhu@1947";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) die("DB connection failed");

$folder = "certificates/";
$files = scandir($folder);

foreach ($files as $file) {
    if ($file === '.' || $file === '..') continue;

    $path = $folder . $file;

    // Default: use file name (without extension) as description
    $name = pathinfo($file, PATHINFO_FILENAME);
    $desc = str_replace('_', ' ', $name); // replace underscores with spaces
    $desc = ucwords($desc); // Capitalize each word
    $desc = $conn->real_escape_string($desc);

    // Check if already in DB
    $check = $conn->query("SELECT * FROM certificates WHERE image_url = '$path'");
    if ($check->num_rows == 0) {
        $conn->query("INSERT INTO certificates (image_url, description) VALUES ('$path', '$desc')");
        echo "✅ Inserted: $file<br>";
    } else {
        echo "⏩ Already exists: $file<br>";
    }
}
?>
