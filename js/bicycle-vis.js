var colours = {
    gridline: '#f9f1e0',
    guideline: '#be639c',
    component: '#00BE5B'
};

var bicycle = {
    wheelbase: 995,
    bb_drop: 70,
    chainstay: 410,
    stack: 543,
    reach: 390,
    fork_rake: 45,
    head_angle: 74,
    head_tube: 140,
    seat_tube_length: 520,
    seat_angle: 74,
    wheel_size: 340,
};

var allBikes = new Group();

function drawGridLines() {
    for (var i = 0.1; i < 1; i += 0.1) {
        // Draw vertical line
        var pathVerticalGridLine = new Path.Line(
            new Point(view.bounds.width * i, 0), new Point(view.bounds.width * i, view.bounds.height)
        );
        pathVerticalGridLine.strokeColor = colours.gridline;

        // Draw horizontal line
        var pathHorizontalGridLine = new Path.Line(
            new Point(0, view.bounds.height * i), new Point(view.bounds.width, view.bounds.height * i)
        );
        pathHorizontalGridLine.strokeColor = colours.gridline;
    }
}

function makeBike(b) {
    // Create group for each component of the bike drawing
    b.bikeGroup = new Group();

    findBikeCoords(b);
    drawGuidelines(b);
    drawBike(b);

    // Set bike pivot (centre point) to bottom bracket
    b.bikeGroup.pivot = b.bottomBracket;
    b.bikeGroup.position = view.center;

    // Add bike group to the collection of bikes
    allBikes.addChild(b.bikeGroup);
}

function findBikeCoords(b) {
    // Create path to search for certain points
    var path = new Path();

    // Find rear wheel centre using wheelbase and the view centre point
    path.moveTo(view.center + new Point(-b.wheelbase / 2, 0));
    b.rearWheel = path.position;

    // Find front wheel centre using wheelbase and the view centre point
    path.moveTo(view.center + new Point(b.wheelbase / 2, 0));
    b.frontWheel = path.position;

    // Use Pythagoras' Theorem to find X coordinate of bottomBracket
    path.moveTo(b.rearWheel + new Point(Math.sqrt(Math.pow(b.chainstay, 2) + Math.pow(b.bb_drop, 2)), 0));
    path.moveTo(path.position + new Point(0, b.bb_drop));

    b.bottomBracket = path.position;

    // Calculate length of steering axis
    b.lengthOfSteeringAxis = (b.stack - b.bb_drop) / Math.sin(b.head_angle * (180 / Math.PI));

    //Find X offset of bottom of steering axis from front wheel
    path.moveTo(b.frontWheel - new Point(b.fork_rake, 0));
    b.steeringAxisBottom = path.position;

    // Use Pythagoras' Theorem to find X offset of top of steering axis from front wheel 
    path.moveTo(b.frontWheel - new Point(b.fork_rake + Math.sqrt(Math.pow(b.lengthOfSteeringAxis, 2) - Math.pow((b.stack - b.bb_drop), 2)), 0));
    b.steeringAxisTopOffset = path.position;

    // Find coordinate for top of steering axis / head tube 
    path.moveTo(b.steeringAxisTopOffset - new Point(0, (b.stack - b.bb_drop)));
    b.steeringAxisTop = path.position;

    // Find coordinate for bottom of head tube
    //y offset from top of head tube sin * hyp
    headTubeYOffset = (Math.sin(b.head_angle * (180 / Math.PI)) * b.head_tube);
    path.moveTo(b.steeringAxisTop - new Point(0, headTubeYOffset));
    //x offset from top of head tube
    path.moveTo(path.position + new Point(Math.sqrt((Math.pow(b.head_tube, 2) - Math.pow(headTubeYOffset, 2))), 0));
    b.head_tube_bottom = path.position;

    // Find coordinates for top of seat tube
    // y offset from bottom bracket sin * hyp
    seatTubeYOffset = (Math.sin(b.seat_angle * (180 / Math.PI)) * b.seat_tube_length);
    path.moveTo(b.bottomBracket + new Point(0, seatTubeYOffset));

    //x offset from top of bottom bracket tube
    path.moveTo(path.position - new Point(Math.sqrt((Math.pow(b.seat_tube_length, 2) - Math.pow(seatTubeYOffset, 2))), 0));
    b.seatTubeTop = path.position;
}

function drawGuidelines(b) {
    // Draw wheelbase guideline
    var pathWheelbase = new Path.Line(b.rearWheel, b.frontWheel);
    pathWheelbase.strokeColor = colours.guideline;
    b.bikeGroup.addChild(pathWheelbase);

    // Draw bbdrop guideline
    var pathBBDrop = new Path();
    pathBBDrop.add(b.bottomBracket.x, view.center.y);
    pathBBDrop.add(pathBBDrop.position + new Point(0, b.bb_drop));
    pathBBDrop.strokeColor = colours.guideline;
    b.bikeGroup.addChild(pathBBDrop);

    // Draw stack guideline
    var pathStack = new Path();
    pathStack.add(b.bottomBracket);
    pathStack.add(pathStack.position + new Point(0, -b.stack));
    pathStack.strokeColor = colours.guideline;
    b.bikeGroup.addChild(pathStack);

    // Draw steering axis
    var pathSteeringAxis = new Path.Line(b.steeringAxisBottom, b.steeringAxisTop);
    pathSteeringAxis.strokeColor = colours.guideline;
    b.bikeGroup.addChild(pathSteeringAxis);
}

// Drawing the bike parts. No calculations should occur in this function
function drawBike(b) {
    // Draw bottom bracket
    var shapeBottomBracket = new Shape.Circle(b.bottomBracket, 5);
    shapeBottomBracket.strokeColor = colours.component;
    b.bikeGroup.addChild(shapeBottomBracket);

    // Draw chainstay
    var pathChainstay = new Path.Line(b.bottomBracket, b.rearWheel);
    pathChainstay.strokeColor = colours.component;
    b.bikeGroup.addChild(pathChainstay);

    // Draw Head Tube
    var pathHeadTube = new Path.Line(b.steeringAxisTop, b.head_tube_bottom);
    pathHeadTube.strokeColor = colours.component;
    b.bikeGroup.addChild(pathHeadTube);

    // Draw Seat Tube
    var pathSeatTube = new Path.Line(b.bottomBracket, b.seatTubeTop);
    pathSeatTube.strokeColor = colours.component;
    b.bikeGroup.addChild(pathSeatTube);

    // Draw Fork
    var pathFork = new Path.Line(b.head_tube_bottom, b.frontWheel);
    pathFork.strokeColor = colours.component;
    b.bikeGroup.addChild(pathFork);

    //Draw Top Tube
    var pathTopTube = new Path.Line(b.seatTubeTop, b.steeringAxisTop);
    pathTopTube.strokeColor = colours.component;
    b.bikeGroup.addChild(pathTopTube);

    // Draw Down Tube. As this is estimated we move 80% up the head tube.
    var pathDownTube = new Path.Line(b.bottomBracket, (pathHeadTube.getPointAt(pathHeadTube.length * 0.8)));
    pathDownTube.strokeColor = colours.component;
    b.bikeGroup.addChild(pathDownTube);

    // Draw Seat Stay
    var pathSeatStay = new Path.Line(b.rearWheel, b.seatTubeTop);
    pathSeatStay.strokeColor = colours.component;
    b.bikeGroup.addChild(pathSeatStay);

    // Draw rear wheel
    var shapeRearWheel = new Shape.Circle(b.rearWheel, b.wheel_size);
    shapeRearWheel.strokeColor = colours.component;
    b.bikeGroup.addChild(shapeRearWheel);

    // Draw front wheel
    var shapeFrontWheel = new Shape.Circle(b.frontWheel, b.wheel_size);
    shapeFrontWheel.strokeColor = colours.component;
    b.bikeGroup.addChild(shapeFrontWheel);
}

function main() {
    drawGridLines();

    makeBike(bicycle);

    // Resize the bikes to fit within the view
    allBikes.fitBounds(view.bounds);
    allBikes.scale(0.8);
    allBikes.bringToFront();
}

main();
