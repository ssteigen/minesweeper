var W = 400;
var H = 400;

var blockWidth = W / COLS;
var blockHeight = H / ROWS;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var colors = ['blue', 'green', 'red', 'navyblue', 'darkred', 'cyan', 'purple', 'black'];

var mineIcon = new Image();
mineIcon.src = 'fontawesome-pro-5.0.2/advanced-options/raw-svg/regular/bug.svg';

var flagIcon = new Image();
flagIcon.src = 'fontawesome-pro-5.0.2/advanced-options/raw-svg/regular/flag.svg';

var colors2 = [
  '#2980b9', // blue
  '#27ae60', // green
  '#c0392b', // red
  '#d35400', // orange
  '#16a085', // bluegreen
  '#f39c12', // yellow
  '#8e44ad', // purple
  '#34495e' // darkblue
];

// f6f4f7
// 7f8582
// 8cabc3
// 886f87
// 288089

function modelToView(x, y) {
  return {
    x: x * blockWidth,
    y: y * blockHeight
  }
}

function viewToModel(x, y) {
  return {
    x: Math.floor(x / blockWidth),
    y: Math.floor(y / blockHeight)
  };
}

function renderBlock(x, y) {
  var viewCoordinates = modelToView(x, y);

  if (boardStatus[x][y] == BLOCK_OPENED) {
    ctx.fillStyle = '#ecf0f1';
  }
  else {
    ctx.fillStyle = '#bdc3c7';
  }
  
  ctx.strokeStyle = '#95a5a6';
  ctx.lineWidth = 3;
  ctx.fillRect(viewCoordinates.x, viewCoordinates.y, blockWidth, blockHeight);
  ctx.strokeRect(viewCoordinates.x, viewCoordinates.y, blockWidth, blockHeight);

  if (boardStatus[x][y] === BLOCK_OPENED) {
    ctx.fillStyle = colors2[board[x][y] - 1];

    switch (board[x][y]) {
      case 0:
        break;
      case BLOCK_MINE:
        renderMine(x, y);
        break;
      default:
        renderNumber(x, y);
        break;
    }
  }

  if (boardStatus[x][y] == BLOCK_FLAGGED) {
    renderFlag(x, y);
  }
}

function renderNumber(x, y) {
  var viewCoordinates = modelToView(x, y);

  ctx.font = '20px Space Mono';
  var textSizeM = ctx.measureText('M');
  var textSizeNum = ctx.measureText(board[x][y]);
 
  ctx.fillText(
    board[x][y],
    viewCoordinates.x + Math.floor(blockWidth / 2) - textSizeNum.width / 2,
    viewCoordinates.y + Math.floor(blockHeight / 2) + textSizeM.width / 2
  );
}

function renderFlag(x, y) {
  var viewCoordinates = modelToView(x, y);
  ctx.drawImage(
    flagIcon,
    viewCoordinates.x + blockWidth / 4,
    viewCoordinates.y + blockHeight / 4,
    blockWidth / 2,
    blockHeight / 2
  );
}

function renderMine(x, y) {
  var viewCoordinates = modelToView(x, y);
  ctx.drawImage(
    mineIcon,
    viewCoordinates.x + blockWidth / 4,
    viewCoordinates.y + blockHeight / 4,
    blockWidth / 2,
    blockHeight / 2
  );
}

function render() {
  for (var x = 0; x < ROWS; x++) {
    for (var y = 0; y < COLS; y++) {
      renderBlock(x, y);
    }
  }
}

render();
