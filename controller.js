canvas.addEventListener('click', function(e) {
    var x = e.clientX;
    var y = e.clientY;

    // hit test
    var modelCoordinates = viewToModel(x, y);

    openBlock(modelCoordinates.x, modelCoordinates.y);
    render();
});
