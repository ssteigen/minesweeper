canvas.addEventListener('click', function(e) {
    var x = e.clientX - canvas.offsetLeft;
    var y = e.clientY - canvas.offsetTop;

    // hit test
    var modelCoordinates = viewToModel(x, y);

    openBlock(modelCoordinates.x, modelCoordinates.y);
    render();
});
