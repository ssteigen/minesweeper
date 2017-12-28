var ROWS = 10;
var COLS = 10;
var MINES = 10;

var board = [];
var boardStatus = [];

var BLOCK_MINE = -1;

var BLOCK_CLOSED = 0;
var BLOCK_OPENED = 1;
var BLOCK_FLAGGED = 2;

var playing = true;

// https://www.youtube.com/watch?v=LRnnNInjmN0
// 32:19

function init() {
  for (var x = 0; x < ROWS; x++) {
    board[x] = [];

    for (var y = 0; y < COLS; y++) {
      board[x][y] = 0;
    }
  }

  boardStatus = JSON.parse(JSON.stringify(board));

  board = placeMines(board, MINES);

  for (var x = 0; x < ROWS; x++) {
    for (var y = 0; y < COLS; y++) {
      if (board[x][y] !== BLOCK_MINE) {
        board[x][y] = countAdjacentMines(x, y);
      }
    }
  }
}

function countAdjacentMines(x, y) {
  var mineCount = 0;

  for (var i = x - 1; i <= x + 1; i++) {
    for (var j = y - 1; j <= y + 1; j++) {
      if (inBounds(i, j)) {
        if (board[i][j] == BLOCK_MINE) {
          mineCount++;
        }
      }
    }
  }

  return mineCount;
}

function inBounds(x, y) {
  return (x >= 0 && y >= 0 && x < ROWS && y < COLS);
}

function placeMines(board, numMines) {
  var mine = 0;

  while (mine < numMines) {
    var x = Math.floor(Math.random() * ROWS);
    var y = Math.floor(Math.random() * COLS);

    if (board[x][y] !== BLOCK_MINE) {
    board[x][y] = BLOCK_MINE;
      mine++;
    }
  }

  return board;
}

function flagBlock(x, y) {
  if (!playing || boardStatus[x][y] == BLOCK_OPENED) {
    return;
  }

  if (boardStatus[x][y] !== BLOCK_FLAGGED) {
    boardStatus[x][y] = BLOCK_FLAGGED;
  }
  else {
    boardStatus[x][y] = BLOCK_CLOSED
  }
}

function openBlock(x, y) {
  if (!playing || boardStatus[x][y] === BLOCK_FLAGGED) {
    return;
  }

  if (board[x][y] == BLOCK_MINE) {
    alert('Game over!');
    playing = false;
    revealBoard();
  }

  boardStatus[x][y] = BLOCK_OPENED;
  if (board[x][y] == 0) {
    // Flood fill.
    for (var dx = -1; dx <= 1; dx++) {
      for (var dy = -1; dy <= 1; dy++) {
        var xx = x + dx;
        var yy = y + dy;

        if (inBounds(xx, yy)) {
          if (boardStatus[xx][yy] != BLOCK_OPENED) {
            openBlock(xx, yy);
          }
        }
      }
    }
  }
}

function revealBoard() {
  for (var x = 0; x < COLS; x++) {
    for (var y = 0; y < ROWS; y++) {
      boardStatus[x][y] = BLOCK_OPENED;
    }
  }
}

init();
