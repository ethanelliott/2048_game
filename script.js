var boardSize = 800;

var keyMoveEnum = {
	kUP: 0,
	kDOWN: 1,
	kLEFT: 2,
	kRIGHT: 3
};

var Tile = function(_x, _y, _val) {
	this.value = _val;
	this.x = _x;
	this.y = _y;
};

function drawGameboard() {
	translate(width/2, height/2);
	stroke(0);
	strokeWeight(5);
	fill(255,255,255);
	rect(-boardSize/2, -boardSize/2, boardSize, boardSize);
	strokeWeight(3);
	var iSq = boardSize / 4;
	for (var i = -2; i < 2; i++){
		for (var j = -2; j < 2; j++){
			rect(i*iSq, j*iSq, iSq, iSq);
		}
	}
}

function drawTiles(t) {
	for (var i = 0; i < t.length; i++) {
		var iSq = boardSize / 4;
		var xPos = ((t[i].x)-3) * iSq;
		var yPos = ((t[i].y)-3) * iSq;
		if (t[i].value > 0){
			var p = Math.log(t[i].value) / Math.log(2);
			var inter = 255 / 15;
			fill(255 - (p*inter))
			noStroke();
			rect(xPos, yPos, iSq, iSq);
			fill(0);
			noStroke();
			textAlign(CENTER, CENTER);
			textSize(40);
			text(t[i].value, xPos, yPos, iSq, iSq);
		}
	}
}

function getTileByPos(t, _x, _y) {
	for (var i = 0; i < t.length; i++){
		if (t[i].x == _x && t[i].y == _y) {
			return i;
		}
	}
	return -1;
}

function addRandomTile(t) {
	var maxCount = 1;
	for(var i = 0; i < t.length; i++) {
		var c = Math.floor(random(1, 10));
		if (c === 1 && maxCount > 0) {
			if (t[i].value === 0) {
				t[i].value = 2;
				maxCount--;
			}
		}
	}
}

function makeAMove(t, kP) {
	var moves = 0;
	switch(kP) {
		case keyMoveEnum.kUP:
			for (var i = 15; i >= 0; i--) {
				if ((t[i].y - 1 )!== undefined) {
					var uT = getTileByPos(t, t[i].x, t[i].y-1);
					if ((t[i].value !== 0) && ((uT > -1 )&& (t[uT].value === 0 || t[uT].value === t[i].value)))
					{
						t[uT].value += t[i].value;
						t[i].value = 0;
						moves++;
					}
				}
			}
			break;
		case keyMoveEnum.kDOWN:
			for (var i = 0; i < 16; i++) {
				if ((t[i].y + 1 )!== undefined) {
					var uT = getTileByPos(t, t[i].x, t[i].y+1);
					if ((t[i].value !== 0) && ((uT > -1 )&& (t[uT].value === 0 || t[uT].value === t[i].value)))
					{
						t[uT].value += t[i].value;
						t[i].value = 0;
						moves++;
					}
				}
			}
			break;
		case keyMoveEnum.kLEFT:
			for (var i = 15; i >= 0; i--) {
				if ((t[i].x - 1 )!== undefined) {
					var uT = getTileByPos(t, t[i].x-1, t[i].y);
					if ((t[i].value !== 0) && ((uT > -1 )&& (t[uT].value === 0 || t[uT].value === t[i].value)))
					{
						t[uT].value += t[i].value;
						t[i].value = 0;
						moves++;
					}
				}
			}
			break;
		case keyMoveEnum.kRIGHT:
			for (var i = 0; i < 16; i++) {
				if ((t[i].x + 1 )!== undefined) {
					var uT = getTileByPos(t, t[i].x+1, t[i].y);
					if ((t[i].value !== 0) && ((uT > -1 )&& (t[uT].value === 0 || t[uT].value === t[i].value)))
					{
						t[uT].value += t[i].value;
						t[i].value = 0;
						moves++;
					}
				}
			}
			break;
	}
	console.log(moves);
	if (moves > 0) {
		addRandomTile(t);
	}
}

var tiles = [];
function setup() {
	//Make the screen
	createCanvas(windowWidth, windowHeight);
	var maxCount = 2;
	for (var i = 0; i < 16; i++) {
		var xPos = (i % 4) + 1;
		var yPos = (Math.floor(i/4.0)) + 1;
		var value = 0;
		if (maxCount > 0) {
			if (Math.floor(random(1,6)) === 2) {
				maxCount--;
				value = 2;
			}
		}
		if (i === 15 && maxCount > 0) {
			value = 2;
		}
		tiles[i] = new Tile(xPos, yPos, value);
	}
}

function draw()
{
	background(200,200,200);
	drawGameboard();
	drawTiles(tiles);
}

function keyPressed() {
	switch (key) {
		case '&':
			makeAMove(tiles, keyMoveEnum.kUP);
			break;
		case '(':
			makeAMove(tiles, keyMoveEnum.kDOWN);
			break;
		case '%':
			makeAMove(tiles, keyMoveEnum.kLEFT);
			break;
		case '\'':
			makeAMove(tiles, keyMoveEnum.kRIGHT);
			break;
	}
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
