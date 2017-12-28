var W = 400;
var H = 400;

var blockWidth = W / COLS;
var blockHeight = H / ROWS;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var colors = ['blue', 'green', 'red', 'navyblue', 'darkred', 'cyan', 'purple', 'black'];

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
    ctx.fillStyle = '#ddd';
  }
  else {
    ctx.fillStyle = '#999';
  }
  
  ctx.strokeStyle = ('black');
  ctx.fillRect(viewCoordinates.x, viewCoordinates.y, blockWidth, blockHeight);
  ctx.strokeRect(viewCoordinates.x, viewCoordinates.y, blockWidth, blockHeight);

  ctx.font = '20px Verdana';

  // For debugging purposes.
  ctx.fillStyle = ('gray');
  ctx.strokeStyle = ('gray');

  if (boardStatus[x][y] === BLOCK_OPENED) {
    ctx.fillStyle = (colors[board[x][y] - 1]);
  }

  if (board[x][y] !== 0 ) {
    var textSizeM = ctx.measureText('M');
    var textSizeNum = ctx.measureText(board[x][y]);
    ctx.fillText(
      board[x][y],
      viewCoordinates.x + Math.floor(blockWidth / 2) - textSizeNum.width / 2,
      viewCoordinates.y + Math.floor(blockHeight / 2) + textSizeM.width / 2
    );
  }
}


function render() {
  for (var x = 0; x < ROWS; x++) {
    for (var y = 0; y < COLS; y++) {
      renderBlock(x, y);
    }
  }
}

render();
