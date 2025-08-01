<?php
header('Content-Type: application/json');

// --- Database connection ---
$host = "localhost";
$db = "u575564595_portfolio_db";
$user = "u575564595_Sadhu_J";
$pass = "Sadhu@1947"; // Replace with your actual password

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed."]));
}

// --- Fetch all certificate records ---
$result = $conn->query("SELECT * FROM certificates ORDER BY created_at DESC");

$certificates = [];
while ($row = $result->fetch_assoc()) {
    $certificates[] = $row;
}

// --- Return as JSON ---
echo json_encode($certificates);
?>
