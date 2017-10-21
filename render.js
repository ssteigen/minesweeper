var W = 600;
var H = 600;

var blockWidth = W / COLS;
var blockHeight = H / ROWS;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

function render() {
	for (var x = 0; x < ROWS; x++) {
		for (var y = 0; y < COLS; y++) {
			renderBlock(x, y);
		}
	}
}

function renderBlock(x, y) {
	var viewCoordinates = modelToView(x, y);

	ctx.fillStyle = ('#aaa');
	ctx.strokeStyle = ('black');
	ctx.fillRect(viewCoordinates.x, viewCoordinates.y, blockWidth, blockHeight);
	ctx.strokeRect(viewCoordinates.x, viewCoordinates.y, blockWidth, blockHeight);

	if (boardStatus[x][y] === BLOCK_OPENED) {
		ctx.font = '48px serif';
		ctx.fillStyle = ('black');
		ctx.strokeStyle = ('black');
		ctx.fillText('X', viewCoordinates.x, viewCoordinates.y);
		ctx.strokeText('X', viewCoordinates.x, viewCoordinates.y);
	}
}

function modelToView(x, y) {
	return {
		x: x * blockWidth,
		y: y * blockHeight
	}
}

render();