<?php
$servername = "10.0.0.124";
$username = "viewer";
$password = "Blah1324!";
$db = "viewer";

// Create connection
$conn = new mysqli($servername, $username, $password, $db);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>