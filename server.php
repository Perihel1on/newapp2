<?php
session_start();
$servername = "localhost";
$username = "newapp";
$password = "5DJSCthJMz3aMyNj";
$dbname = "newapp";
$conn = new mysqli($servername, $username, $password, $dbname);
if (!$conn) {
	die("Connection failed: " . $conn->connect_error());
}
$timestamp = date("m-d-Y h:i:sa");
if (isset($_GET['connection'])) {
	$connect = $_GET['connection'];
	if ($connect == "open") {
		echo "<span class='timestamp'>[" . $timestamp . "]</span> <span class='consolemsg'>Connected to server successfully.</span><br/>";
	} elseif ($connect == "close") {
		echo "<span class='timestamp'>[" . $timestamp . "]</span> <span class='consolemsg'>Connection to server closed successfully.</span><br/>";
	}
}

if (isset($_GET['consolecmd'])) {
	$console = explode(" ", $_GET['consolecmd']);
	$cmd = $console[0];
	array_shift($console);
	if (count($console) > 1) {
		$data = implode(" ", $console);
	} else if (count($console) == 1) {
		$data = $console[0];
	} else {$data = ""; }
	switch ($cmd) {
		case "test":
			echo "<span class='timestamp'>[" . $timestamp . "]</span> <span class='consolemsg'>The data you transmitted with the test command is: " . $data . "</span><br/>";
			break;
		case "load":
			$target = stristr($data, " ", 'before_search');
			$targetData = stristr($data, " ");
			$targetData = ltrim($targetData, " ");
			if ($target == "character") {
				$firstname = stristr($targetData, " ", 'before_search');
				$lastnameA = stristr($targetData, " ");
				$lastname = ltrim($lastnameA, " ");
				$sql = "SELECT * FROM characters WHERE firstname='" . $firstname . "' AND lastname='" . $lastname . "'";
				$result = $conn->query($sql);
				if ($result->num_rows > 0) {
					while($row = $result->fetch_assoc()) {
						$charid = $row['id'];
						$account = $row['account'];
						$level = $row['level'];
						$class = $row['class'];
						$strength = $row['strength'];
						$endurance = $row['endurance'];
						$dexterity = $row['dexterity'];
						$intelligence = $row['intelligence'];
						$charisma = $row['charisma'];
						$hp = $row['hp'];
						$hp_max = $row['hp_max'];
						$mp = $row['mp'];
						$mp_max = $row['mp_max'];
						$xp = $row['xp'];
						$cp = $row['cp'];
						$room = $row['room'];
						$sprite = $row['sprite'];
						$output = "output_type=character";
						$output .= "&charid=" . $charid;
						$output .= "&account=" . $account;
						$output .= "&firstname=" . ucfirst($firstname);
						$output .= "&lastname=" . ucfirst($lastname);
						$output .= "&level=" . $level;
						$output .= "&class=" . ucfirst($class);
						$output .= "&strength=" . $strength;
						$output .= "&endurance=" . $endurance;
						$output .= "&dexterity=" . $dexterity;
						$output .= "&intelligence=" . $intelligence;
						$output .= "&charisma=" . $charisma;
						$output .= "&hp=" . $hp;
						$output .= "&hp_max=" . $hp_max;
						$output .= "&mp=" . $mp;
						$output .= "&mp_max=" . $mp_max;
						$output .= "&xp=" . $xp;
						$output .= "&cp=" . $cp;
						$output .= "&room=" . $room;
						$timestamp = date("m-d-Y h:i:sa");
						$output .= "&output=<span class='timestamp'>[" . $timestamp . "]</span> <span class='consolemsg'>Successfully loaded character " . $firstname . " " . $lastname . ".</span><br/>";
						$output .= "&sprite=" . $sprite;
						echo $output;
						$_SESSION['charid'] = $charid;
						$_SESSION['playerRoom'] = $room;
					}
				}
			}
			break;
		case "help":
			break;
		case "playerloc_update":
			$_SESSION['playerLoc'] = $data;
			break;
		case "getloc":
			$timestamp = date("m-d-Y h:i:sa");
			echo "<span class='timestamp'>[" . $timestamp . "]</span> <span class='errormsg'>Current player location is " . $_SESSION['playerLoc'] . "</span><br/>";
			break;
		case "getroom":
			$roomid = $data;
			$sql = "SELECT * FROM rooms WHERE id='" . $roomid . "'";
			$result = $conn->query($sql);
			if ($result->num_rows > 0) {
				while($row = $result->fetch_assoc()) {
					$name = $row['name'];
					$description = $row['description'];
					$tags = $row['tags'];
					$exit_n = $row['exit_n'];
					$exit_s = $row['exit_s'];
					$exit_e = $row['exit_e'];
					$exit_w = $row['exit_w'];
					$inorout = $row['inorout'];
					$maptile = $row['maptile'];
					$roomBmp = $row['room_bmp'];
					$roomTileset = $row['tileset'];
					$output = "output_type=room";
					$output .= "&name=" . $name;
					$output .= "&description=" . $description;
					$output .= "&tags=" . $tags;
					$output .= "&exit_n=" . $exit_n;
					$output .= "&exit_s=" . $exit_s;
					$output .= "&exit_e=" . $exit_e;
					$output .= "&exit_w=" . $exit_w;
					$output .= "&inorout=" . $inorout;
					$output .= "&maptile=" . $maptile;
					$output .= "&roomBmp=" . $roomBmp;
					$output .= "&tileset=" . $roomTileset;
					$output .= "&id=" . $roomid;
					echo $output;
				}
			}
			break;
		default: 
			$timestamp = date("m-d-Y h:i:sa");
			echo "<span class='timestamp'>[" . $timestamp . "]</span> <span class='errormsg'>Invalid command entered.  Type 'help' for information on available commands.</span><br/>";
			break;
	}
}

?>