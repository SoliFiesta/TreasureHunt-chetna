var context = document.getElementById("puzzle");
var canvas = context.getContext("2d");


const timeOutMin = 5
const timeOutInSec = timeOutMin * 60 * 1000

var img = new Image();
img.src = './Solifi.png';
img.addEventListener('load', drawTiles, false);

var boardSize = document.getElementById('puzzle').width;
// var tileCount=3
var tileCount = document.getElementById('scale').value;

var tileSize = boardSize / tileCount;

var clickLoc = new Object;
clickLoc.x = 0;
clickLoc.y = 0;

var emptyLoc = new Object;
emptyLoc.x = 0;
emptyLoc.y = 0;

var boardParts = new Object;
setBoard();

function setBoard() {
  boardParts = new Array(tileCount);
  for (var i = 0; i < tileCount; ++i) {
    boardParts[i] = new Array(tileCount);
    for (var j = 0; j < tileCount; ++j) {
      boardParts[i][j] = new Object;
      boardParts[i][j].x = (tileCount - 1) - i;
      boardParts[i][j].y = (tileCount - 1) - j;
    }
  }
  emptyLoc.x = boardParts[tileCount - 1][tileCount - 1].x;
  emptyLoc.y = boardParts[tileCount - 1][tileCount - 1].y;
  solved = false;
}

var solved = false;

document.getElementById('scale').onchange = function () {
  tileCount = this.value;
  tileSize = boardSize / tileCount;
  setBoard();
  drawTiles();
};


document.getElementById('puzzle').onmousemove = function (e) {
  clickLoc.x = Math.floor((e.pageX - this.offsetLeft) / tileSize);
  clickLoc.y = Math.floor((e.pageY - this.offsetTop) / tileSize);
};

document.getElementById('puzzle').onclick = function () {
  if (distance(clickLoc.x, clickLoc.y, emptyLoc.x, emptyLoc.y) == 1) {
    slideTile(emptyLoc, clickLoc);
    drawTiles();
  }
  if (solved) {
    alert("You solved it!");
    document.write("<!DOCTYPE html>")
    document.write("<html lang='en'>")
    document.write("<head>")
    document.write("<meta charset='UTF-8'>")
    document.write("<meta http-equiv='X-UA-Compatible' content='IE=edge'>")
    document.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>")
    document.write("<title>Hurray</title>")
    document.write("<link rel='stylesheet' href='index.css'>")
    document.write("</head>")
    document.write("<body>")
    document.write("<h1>Hurray...!!! You have nailed it. Eligible For Further rounds</h1>")


    document.write("<div id='rules'>")
    document.write("<h3> Congrats Team -chetna</h3>")
    document.write("<h3> Here is your next clue:</h3>")
    document.write("<ul>")
    document.write("<li>Solve the Equation provided by the Host to get the Next clue</li>")
    document.write("</ul>")=
    document.write("</div>")
    document.write("</body>")
    document.write("</html>")


  }
};



function distance(x1, y1, x2, y2) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function slideTile(toLoc, fromLoc) {
  if (!solved) {
    boardParts[toLoc.x][toLoc.y].x = boardParts[fromLoc.x][fromLoc.y].x;
    boardParts[toLoc.x][toLoc.y].y = boardParts[fromLoc.x][fromLoc.y].y;
    boardParts[fromLoc.x][fromLoc.y].x = tileCount - 1;
    boardParts[fromLoc.x][fromLoc.y].y = tileCount - 1;
    toLoc.x = fromLoc.x;
    toLoc.y = fromLoc.y;
    checkSolved();
  }
}

function checkSolved() {
  var flag = true;
  for (var i = 0; i < tileCount; ++i) {
    for (var j = 0; j < tileCount; ++j) {
      if (boardParts[i][j].x != i || boardParts[i][j].y != j) {
        flag = false;
      }
    }
  }
  solved = flag;
}

function drawTiles() {
  canvas.clearRect(0, 0, boardSize, boardSize);
  for (var i = 0; i < tileCount; ++i) {
    for (var j = 0; j < tileCount; ++j) {
      var x = boardParts[i][j].x;
      var y = boardParts[i][j].y;
      if (i != emptyLoc.x || j != emptyLoc.y || solved == true) {
        canvas.drawImage(img, x * tileSize, y * tileSize, tileSize, tileSize,
          i * tileSize, j * tileSize, tileSize, tileSize);
      }
    }
  }
}
