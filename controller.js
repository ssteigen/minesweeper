var MOUSE_LEFT = 1;
var MOUSE_RIGHT = 3;

canvas.addEventListener('mousedown', function(e) {
  var x = e.clientX - canvas.offsetLeft;
  var y = e.clientY - canvas.offsetTop;

  // hit test
  var modelCoordinates = viewToModel(x, y);

  switch(e.which) {
    case MOUSE_LEFT:
      openBlock(modelCoordinates.x, modelCoordinates.y);
      break;
    case MOUSE_RIGHT:
      flagBlock(modelCoordinates.x, modelCoordinates.y);
      break;
    default:
      break;
  }

  render();
});

canvas.addEventListener('contextmenu', function(e) {
  e.preventDefault();
  return false; 
}, false);
