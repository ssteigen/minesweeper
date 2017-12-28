var W = 600;
var H = 600;

var blockWidth = W / COLS;
var blockHeight = H / ROWS;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');


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

	ctx.fillStyle = ('#aaa');
	ctx.strokeStyle = ('black');
	ctx.fillRect(viewCoordinates.x, viewCoordinates.y, blockWidth, blockHeight);
	ctx.strokeRect(viewCoordinates.x, viewCoordinates.y, blockWidth, blockHeight);

  ctx.font = '30px Arial';

  // For debugging purposes.
  ctx.fillStyle = ('gray');
  ctx.strokeStyle = ('gray');

  if (boardStatus[x][y] === BLOCK_OPENED) {
    ctx.fillStyle = ('black');
    ctx.strokeStyle = ('black');
  }
  
  var textSize = ctx.measureText('M');
  ctx.fillText(
    board[x][y],
    viewCoordinates.x + Math.floor(blockWidth / 2) - textSize.width / 2,
    viewCoordinates.y + Math.floor(blockHeight / 2) + textSize.width / 2
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
