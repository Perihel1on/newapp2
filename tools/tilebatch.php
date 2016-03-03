<?php 
$servername = "localhost";
$username = "newapp";
$password = "5DJSCthJMz3aMyNj";
$dbname = "newapp";
$conn = new mysqli($servername, $username, $password, $dbname);
if (!$conn) {
	die("Connection failed: " . $conn->connect_error());
}

if ($_POST['tileinput'] == "" && $_POST['tilebatch'] == "") {
	echo "ERROR: No Input.";
} else {
	$string = $_POST['tileinput'];
	$tilesize = $_POST['tilesize'];
	$tilewidth = stristr($tilesize, "x", 'before_search');
	$tileheight = ltrim(stristr($tilesize, "x"), "x");
	$tilebatch = htmlentities($_POST['tilebatch']);
	$stringBatch = str_replace("\n", "+", $tilebatch);
	$stringAr = explode("+", $stringBatch);
	for ($i=0; $i<count($stringAr); $i++) {
		$string = $stringAr[$i];
		$coords = stristr($string, " ", 'before_search');
		$tilex = stristr($coords, ",", 'before_search');
		$tiley = ltrim(stristr($coords, ","), ",");
		$tilex = $tilex * -64;
		$tiley = $tiley * -64;
		$therest = stristr($string, " ");
		$name = htmlentities(ltrim($therest, " "));
		$tilesetid = $_POST['tilesetid'];
		$sql = "INSERT INTO tiles (name, tilesetid, width, height, posx, posy) VALUES ('$name', '$tilesetid', '$tilewidth', '$tileheight', '$tilex', '$tiley')";
		if ($conn->query($sql) === TRUE) {
			echo "Successful!";
		} else {
			echo "ERROR: " . $sql . "<br>" . $conn->error;
		}
	}
	$conn->close();
}
?>