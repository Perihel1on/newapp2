function sendToServer(command, data) {
	var xhttp, command, data;
	if (window.XMLHttpRequest) {
		xhttp = new XMLHttpRequest();
		} else {
		// code for IE6, IE5
		xhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			var outputText = xhttp.responseText.split("&");
			var outputTypeIndex = outputText[0].indexOf("=") + 1;
			var outputType = outputText[0].slice(outputTypeIndex);
			if (outputType == "character") {
				var charIdIndex = outputText[1].indexOf("=") + 1;
				var charId = outputText[1].slice(charIdIndex);
				var charAccountIndex = outputText[2].indexOf("=") + 1;
				var charAccount = outputText[2].slice(charAccountIndex);
				var charFirstnameIndex = outputText[3].indexOf("=") + 1;
				var charFirstname = outputText[3].slice(charFirstnameIndex);
				document.getElementById('charFirstname').innerHTML = charFirstname;
				var charLastnameIndex = outputText[4].indexOf("=") + 1;
				var charLastname = outputText[4].slice(charLastnameIndex);
				document.getElementById('charLastname').innerHTML = charLastname;
				var charLevelIndex = outputText[5].indexOf("=") + 1;
				var charLevel = Number(outputText[5].slice(charLevelIndex));
				document.getElementById('charLevel').innerHTML = charLevel;
				document.getElementById('xplevel').innerHTML = charLevel;
				var charClassIndex = outputText[6].indexOf("=") + 1;
				var charClass = outputText[6].slice(charClassIndex);
				document.getElementById('charClass').innerHTML = charClass;
				var charStrengthIndex = outputText[7].indexOf("=") + 1;
				var charStrength = Number(outputText[7].slice(charStrengthIndex));
				document.getElementById('charStrength').innerHTML = charStrength;
				var charEnduranceIndex = outputText[8].indexOf("=") + 1;
				var charEndurance = Number(outputText[8].slice(charEnduranceIndex));
				document.getElementById('charEndurance').innerHTML = charEndurance;
				var charDexterityIndex = outputText[9].indexOf("=") + 1;
				var charDexterity = Number(outputText[9].slice(charDexterityIndex));
				document.getElementById('charDexterity').innerHTML = charDexterity;
				var charIntelligenceIndex = outputText[10].indexOf("=") + 1;
				var charIntelligence = Number(outputText[10].slice(charIntelligenceIndex));
				document.getElementById('charIntelligence').innerHTML = charIntelligence;
				var charCharismaIndex = outputText[11].indexOf("=") + 1;
				var charCharisma = Number(outputText[11].slice(charCharismaIndex));
				document.getElementById('charCharisma').innerHTML = charCharisma;
				var charHpIndex = outputText[12].indexOf("=") + 1;
				var charHp = Number(outputText[12].slice(charHpIndex));
				var charHp_maxIndex = outputText[13].indexOf("=") + 1;
				var charHp_max = Number(outputText[13].slice(charHp_maxIndex));
				document.getElementById('charHp').innerHTML = charHp + " / " + charHp_max;
				var hpPct = ((charHp / charHp_max) * 100);
				hpPct = hpPct + "%";
				document.getElementById('meter_hp').setAttribute("style", "width: '" + hpPct + "'");
				var charMpIndex = outputText[14].indexOf("=") + 1;
				var charMp = Number(outputText[14].slice(charMpIndex));
				var charMp_maxIndex = outputText[15].indexOf("=") + 1;
				var charMp_max = Number(outputText[15].slice(charMp_maxIndex));
				document.getElementById('charMp').innerHTML = charMp + " / " + charMp_max;
				var mpPct = ((charMp / charMp_max) * 100);
				mpPct =  mpPct + "%";
				document.getElementById('meter_mp').setAttribute("style", "width: '" + mpPct + "'");
				var charXpIndex = outputText[16].indexOf("=") + 1;
				var charXp = Number(outputText[16].slice(charXpIndex));
				document.getElementById('charXp').innerHTML = charXp;
				var charCpIndex = outputText[17].indexOf("=") + 1;
				var charCp = Number(outputText[17].slice(charCpIndex));
				document.getElementById('charCp').innerHTML = charCp;
				document.getElementById('cp_count').innerHTML = charCp;
				var charRoomIndex = outputText[18].indexOf("=") + 1;
				var charRoom = outputText[18].slice(charRoomIndex);
				var consoleOutputIndex = outputText[19].indexOf("=") + 1;
				var consoleOutput = outputText[19].slice(consoleOutputIndex);
				var charSpriteIndex = outputText[20].indexOf("=") + 1;
				var charSprite = outputText[20].slice(charSpriteIndex);
				document.getElementById('console').innerHTML += consoleOutput;
			} 
			else if (outputType == "room") {
				buildRoom(outputText);
			}
			else {
				document.getElementById('console').innerHTML += xhttp.responseText;
			}
		}
	};
	xhttp.open("GET", "server.php?" + String(command) + "=" + String(data), true);
	xhttp.send();
}
function cmdSubmit(e) {
	var e;
    e = e || window.event;
	if (e.keyCode == '13') {	// Enter
		inputSrc = document.getElementById('consolecmd').value;
		sendToServer('consolecmd', inputSrc);
	}	
	return;
}
window.addEventListener("load", sendToServer('connection', 'open'));
console = document.getElementById('console');
console.addEventListener("keydown", cmdSubmit);
window.addEventListener("load", multiPage("inventory"));
window.addEventListener("load", createInventorySlots("32"));
window.addEventListener("load", sendToServer('consolecmd', 'load character perihelion everwhere'));

function multiPage(pageName) {
	var pageName;
	var pageDiv = "multi_inner_" + pageName;
	var page = document.getElementById(pageDiv);
	var menuName = "menu_" + pageName;
	var menuItem = document.getElementById(menuName);
	var allPages = document.getElementsByClassName("multi_on");
	var allMenu = document.getElementsByClassName("active");
	var titleE = document.getElementById("multi_title");
	for (i=0; i<allPages.length; i++) {
		allPages[0].className = "multi_inner";
	}
	for (i=0; i<allMenu.length; i++) {
		allMenu[0].className = "";
	}
	page.className = "multi_on";
	menuItem.className = "active";
	titleE.innerHTML = pageName.toUpperCase();
	return;
}

function createInventorySlots(size) {
	var slotSize;
	var defaultSlotSize = 32;
	if (slotSize == undefined) {
		slotSize = defaultSlotSize;
	}
	var invDiv = document.getElementById("inventory");
	for (i=0; i<slotSize; i++) {
		var slot = document.createElement("p");
		var slotID = "slot" + i;
		slot.setAttribute("id", slotID);
		slot.className = "slot";
		invDiv.appendChild(slot);
	}
}
/// store key codes and currently pressed ones
var keys = {};
	keys.UP = 38;
	keys.W = 87;
	keys.LEFT = 37;
	keys.A = 65;
	keys.RIGHT = 39;
	keys.D = 68;
	keys.DOWN = 40;
	keys.S = 83;

/// store reference to character's position and element
var roomsvg = document.getElementById("roomsvg");
var roomWidth = roomsvg.getAttributeNS(null, "width");
var roomHeight = roomsvg.getAttributeNS(null, "height");
var charCenterX = (roomWidth / 2) - 16;
var charCenterY = (roomHeight / 2) - 32;
var character = {
  x: charCenterX,
  y: charCenterY,
  speedMultiplier: 3,
  element: document.getElementById("cursor")
};
var cursor = document.getElementById('cursor');
var roomwin = document.getElementById('roomwin');
var oldClass;
/// key detection (better to use addEventListener, but this will do)
roomwin.onkeyup = 
roomwin.onkeydown = function(e){
  /// prevent default browser handling of keypresses
  if (e.preventDefault) { 
	e.preventDefault();
  }
  else {
	e.returnValue = false; 
  }
  var kc = e.keyCode || e.which;
  keys[kc] = e.type == 'keydown';
  if (!keys[kc]) {
	  cursor.className = oldClass;
  }
};

/// character movement update
var moveCharacter = function(dx, dy){
  character.x += (dx||0) * character.speedMultiplier;
  character.y += (dy||0) * character.speedMultiplier;
  character.element.style.left = character.x + 'px';
  character.element.style.top = character.y + 'px';
  var playerLoc = character.x + "," + character.y;
  var consoleSend = "playerloc_update " + playerLoc;
  sendToServer('consolecmd', consoleSend);
};

/// character control
var detectCharacterMovement = function(){
	var roomsvgWidth = document.getElementById('roomsvg').getAttributeNS(null, "width");
	var roomsvgHeight = document.getElementById('roomsvg').getAttributeNS(null, "height");
	var maxX = roomsvgWidth - 32;
	var maxY = roomsvgHeight - 64;
  if (( keys[keys.LEFT] || keys[keys.A]) && character.x > 0 ) {
	moveCharacter(-1, 0);
	cursor.className = "moveLeft";
	oldClass = "lookLeft";
  }
  if (( keys[keys.RIGHT] || keys[keys.D]) && character.x < maxX ) {
	moveCharacter(1, 0);
	cursor.className = "moveRight";
	oldClass = "lookRight";
  }
  if (( keys[keys.UP] || keys[keys.W]) && character.y > 0 ) {
	moveCharacter(0, -1);
	cursor.className = "moveRight";
	oldClass = "lookRight";
  }
  if (( keys[keys.DOWN] || keys[keys.S]) && character.y < maxY ) {
	moveCharacter(0, 1);
	cursor.className = "moveLeft";
	oldClass = "lookLeft";
  }
};

/// update current position on screen
moveCharacter();

/// game loop
setInterval(function(){
  detectCharacterMovement();
}, 1000/24);
function getRoomData(id) {
	var sendCmd = "consolecmd";
	var sendData = "getroom " + String(id);
	sendToServer(sendCmd,sendData);
}

getRoomData(1);

function buildRoom(room) {
	var NS = "http://www.w3.org/2000/svg";
	var XL = "http://www.w3.org/1999/xlink";
	var roomSizeX = 7; // Width of room (in tiles)
	var roomSizeY = 7; // Height of room (in tiles)
	var tileSize = 64;
	var roomName = room[1].replace("name=", "");
	var roomDesc = room[2].replace("description=", "");
	var roomTags = room[3].replace("tags=", "");
	var roomExitN = room[4].replace("exit_n=", "");
	var roomExitS = room[5].replace("exit_s=", "");
	var roomExitE = room[6].replace("exit_e=", "");
	var roomExitW = room[7].replace("exit_w=", "");
	var inorOut = room[8].replace("inorout=", "");
	var mapTile = room[9].replace("maptile=", "");
	var roomBmp = room[10].replace("roomBmp=", "");
	var tileSetPath = room[11].replace("tileset=", "");
	var id = room[12].replace("id=", "");
	// Define Tiles
	var tileSvg = document.createElementNS(NS, "svg");
	tileSvg.setAttributeNS(null, "class", "tile-defs");
	document.getElementById("roomsvg").appendChild(tileSvg);
	var tsDefs = document.createElementNS(NS, "defs");
	tileSvg.appendChild(tsDefs);
	var clipPath = document.createElementNS(NS, "clipPath");
	clipPath.setAttributeNS(null, "id", "tile-cp64x64");
	tsDefs.appendChild(clipPath);
	var clipRect = document.createElementNS(NS, "rect");
	clipRect.setAttributeNS(null, "x", "0");
	clipRect.setAttributeNS(null, "y", "0");
	clipRect.setAttributeNS(null, "width", tileSize);
	clipRect.setAttributeNS(null, "height", tileSize);
	clipPath.appendChild(clipRect);
	var tsImage = document.createElementNS(NS, "image");
	tsImage.setAttributeNS(null, "id", "tile-sprite");
	tsImage.setAttributeNS(null, "width", "1920");
	tsImage.setAttributeNS(null, "height", "1920");
	tsImage.setAttributeNS(XL, "xlink:href", tileSetPath);
	tsDefs.appendChild(tsImage);
	var tsG = document.createElementNS(NS, "g");
	tsG.setAttributeNS(null, "id", "tile1");
	tsG.setAttributeNS(null, "clip-path", "url(#tile-cp64x64)");
	tsDefs.appendChild(tsG);
	var tsUse = document.createElementNS(NS, "use");
	tsUse.setAttributeNS(XL, "xlink:href", "#tile-sprite");
	tsUse.setAttributeNS(null, "transform", "translate(-256,0)");
	tsG.appendChild(tsUse);
	
	var conWidth = roomSizeX * tileSize;
	var conHeight = roomSizeY * tileSize;
	var roomwin = document.getElementById("roomwin");
	var roomsvg = document.getElementById("roomsvg");
	var winSizeX = roomsvg.getAttributeNS(null, "width");
	var winSizeY = roomsvg.getAttributeNS(null, "height");
	var startX = (winSizeX - conWidth) / 2;
	var startY = (winSizeY - conHeight) / 2;
	var roomContainer = document.createElementNS(NS, "svg");
	roomContainer.setAttributeNS(null, "width", conWidth);
	roomContainer.setAttributeNS(null, "height", conHeight);
	roomContainer.setAttributeNS(null, "x", startX);
	roomContainer.setAttributeNS(null, "y", startY);
	roomContainer.setAttributeNS(null, "id", "room" + id);
	roomsvg.appendChild(roomContainer);	
	var roomBorder = document.createElementNS(NS, "rect");
	roomBorder.setAttributeNS(null, "x", "0");
	roomBorder.setAttributeNS(null, "y", "0");
	roomBorder.setAttributeNS(null, "width", conWidth);
	roomBorder.setAttributeNS(null, "height", conHeight);
	roomBorder.setAttributeNS(null, "style", "fill: none; stroke-width: 1; stroke: rgba(255,255,255,0.5)");
	roomContainer.appendChild(roomBorder);
	var tileX, tileY;
	tileX = 0;
	tileY = 0;
	var tileID = 0;
	for (i=0; i<roomSizeX; i++) {
		tileX = tileSize * i;
		for (f=0; f<roomSizeY; f++) {
			var tile = document.createElementNS(NS, "svg");
			tileID = tileID + 1;
			tileY = tileSize * f;
			tile.setAttributeNS(null, "viewBox", "0 0 64 64");
			tile.setAttributeNS(null, "x", tileX);
			tile.setAttributeNS(null, "y", tileY);
			tile.setAttributeNS(null, "width", "64");
			tile.setAttributeNS(null, "height", "64");
			tile.setAttributeNS(null, "id", "tileV" + tileID);
			roomContainer.appendChild(tile);
			var tileUse = document.createElementNS(NS, "use");
			tileUse.setAttributeNS(XL, "xlink:href", "#tile1");
			tile.appendChild(tileUse);
		} 
	} 
}



