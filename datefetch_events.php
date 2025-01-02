<?php
header('Content-Type: application/json');

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$database = "your_database_name";

$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the member ID from the request
$memberId = $_GET['id'];

// Query to fetch events for the member
$sql = "SELECT date, count FROM your_table_name WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $memberId);
$stmt->execute();
$result = $stmt->get_result();

$events = [];
while ($row = $result->fetch_assoc()) {
    $events[] = [
        "date" => $row['date'],
        "count" => $row['count'],
    ];
}

// Return the events as JSON
echo json_encode($events);

$conn->close();
?>
