<?php
$servername = "localhost";
$username = "newapp";
$password = "5DJSCthJMz3aMyNj";
$dbname = "newapp";
$conn = new mysqli($servername, $username, $password, $dbname);
if (!$conn) {
	die("Connection failed: " . $conn->connect_error());
}
if (isset($_GET['tileset'])) {
	$tileset = $_GET['tileset'];	
} else {
	die("Invalid Input Detected.");
}
$tsql = "SELECT filepath, icondefs, width, height FROM tilesets WHERE id=" . $tileset;
$tresult = $conn->query($tsql);
if ($tresult->num_rows > 0) {
	$ts = $tresult->fetch_assoc();
	$filepath = $ts['filepath'];
	$icondefs = $ts['icondefs'];
	$tswidth = $ts['width'];
	$tsheight = $ts['height'];
}

$sql = "SELECT * FROM tiles WHERE tilesetid=". $tileset;
$result = $conn->query($sql);
$output = "";
if ($result->num_rows > 0) {
	while($row = $result->fetch_assoc()) {
		$name = $row['name'];
		$id = $row['id'];
		$width = $row['width'];
		$height = $row['height'];
		$tags = $row['tags'];
		$posx = $row['posx'];
		$posy = $row['posy'];
		$output .= "name=" . $name . "~id=" . $id . "~width=" . $width . "~height=" . $height . "~tags=" . $tags . "~posx=" . $posx . "~posy=" . $posy . "+";
	}
	$output .= "|filepath=" . $filepath . "+icondefs=" . $icondefs . "+width=" . $tswidth . "+height=" . $tsheight;
	echo $output;
}
$conn->close();
?>