// Get Canvas
var canvas = document.getElementById('bicycle');

// Dimension variables
var bikeBBDrop = 15;

// Helpers
function newPath(start) {
    var path = new Path();

    path.moveTo(start);

    path.strokeColor = 'black';

    return path;
}

// Drawing
function drawWheelbase() {
    var start = new Point(0, 100);

    var path = newPath(start);

    path.dashArray = [10, 4];

    path.lineTo([canvas.width, 100]);
}

function drawBBDrop() {
    var start = new Point(canvas.width / 2, 100);

    var path = newPath(start);

    path.lineTo(start + [0, bikeBBDrop]);
}

function drawChainstay() {
    var start = new Point(0, 100);

    var path = newPath(start);

    path.lineTo(start + [canvas.width / 2, bikeBBDrop]);
}

// Main
drawWheelbase();
drawBBDrop();
drawChainstay();
