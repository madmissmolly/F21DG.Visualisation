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
    b.bike_group = new Group();

    findBikeCoords(b);
    drawGuidelines(b);
    drawBike(b);

    // Set bike pivot (centre point) to bottom bracket
    b.bike_group.pivot = b.bottom_bracket;
    b.bike_group.position = view.center;

    // Add bike group to the collection of bikes
    allBikes.addChild(b.bike_group);
}

function findBikeCoords(b) {
    // Create path to search for certain points
    var path = new Path();

    // Find rear wheel centre using wheelbase and the view centre point
    path.moveTo(view.center + new Point(-b.wheelbase / 2, 0));
    b.rear_wheel = path.position;

    // Find front wheel centre using wheelbase and the view centre point
    path.moveTo(view.center + new Point(b.wheelbase / 2, 0));
    b.front_wheel = path.position;

    // Use Pythagoras' Theorem to find X coordinate of bottomBracket
    path.moveTo(b.rear_wheel + new Point(Math.sqrt(Math.pow(b.chainstay, 2) + Math.pow(b.bb_drop, 2)), 0));
    path.moveTo(path.position + new Point(0, b.bb_drop));

    b.bottom_bracket = path.position;

    // Calculate length of steering axis
    b.steering_axis_length = (b.stack - b.bb_drop) / Math.sin(b.head_angle * (180 / Math.PI));

    //Find X offset of bottom of steering axis from front wheel
    path.moveTo(b.front_wheel - new Point(b.fork_rake, 0));
    b.steering_axis_bottom = path.position;

    // Use Pythagoras' Theorem to find X offset of top of steering axis from front wheel 
    path.moveTo(b.front_wheel - new Point(b.fork_rake + Math.sqrt(Math.pow(b.steering_axis_length, 2) - Math.pow((b.stack - b.bb_drop), 2)), 0));
    b.steering_axis_top_offset = path.position;

    // Find coordinate for top of steering axis / head tube 
    path.moveTo(b.steering_axis_top_offset - new Point(0, (b.stack - b.bb_drop)));
    b.steering_axis_top = path.position;

    // Find coordinate for bottom of head tube
    //y offset from top of head tube sin * hyp
    b.head_tube_y_offset = (Math.sin(b.head_angle * (180 / Math.PI)) * b.head_tube);
    path.moveTo(b.steering_axis_top - new Point(0, b.head_tube_y_offset));
    //x offset from top of head tube
    path.moveTo(path.position + new Point(Math.sqrt((Math.pow(b.head_tube, 2) - Math.pow(b.head_tube_y_offset, 2))), 0));
    b.head_tube_bottom = path.position;

    // Find coordinates for top of seat tube
    // y offset from bottom bracket sin * hyp
    b.seat_tube_y_offset = (Math.sin(b.seat_angle * (180 / Math.PI)) * b.seat_tube_length);
    path.moveTo(b.bottom_bracket + new Point(0, b.seat_tube_y_offset));

    //x offset from top of bottom bracket tube
    path.moveTo(path.position - new Point(Math.sqrt((Math.pow(b.seat_tube_length, 2) - Math.pow(b.seat_tube_y_offset, 2))), 0));
    b.seat_tube_top = path.position;
}

function drawGuidelines(b) {
    // Draw wheelbase guideline
    var pathWheelbase = new Path.Line(b.rear_wheel, b.front_wheel);
    pathWheelbase.strokeColor = colours.guideline;
    b.bike_group.addChild(pathWheelbase);

    // Draw bbdrop guideline
    var pathBBDrop = new Path();
    pathBBDrop.add(b.bottom_bracket.x, view.center.y);
    pathBBDrop.add(pathBBDrop.position + new Point(0, b.bb_drop));
    pathBBDrop.strokeColor = colours.guideline;
    b.bike_group.addChild(pathBBDrop);

    // Draw stack guideline
    var pathStack = new Path();
    pathStack.add(b.bottom_bracket);
    pathStack.add(pathStack.position + new Point(0, -b.stack));
    pathStack.strokeColor = colours.guideline;
    b.bike_group.addChild(pathStack);

    // Draw steering axis
    var pathSteeringAxis = new Path.Line(b.steering_axis_bottom, b.steering_axis_top);
    pathSteeringAxis.strokeColor = colours.guideline;
    b.bike_group.addChild(pathSteeringAxis);
}

// Drawing the bike parts. No calculations should occur in this function
function drawBike(b) {
    // Draw bottom bracket
    var shapeBottomBracket = new Shape.Circle(b.bottom_bracket, 5);
    shapeBottomBracket.strokeColor = colours.component;
    b.bike_group.addChild(shapeBottomBracket);

    // Draw chainstay
    var pathChainstay = new Path.Line(b.bottom_bracket, b.rear_wheel);
    pathChainstay.strokeColor = colours.component;
    b.bike_group.addChild(pathChainstay);

    // Draw Head Tube
    var pathHeadTube = new Path.Line(b.steering_axis_top, b.head_tube_bottom);
    pathHeadTube.strokeColor = colours.component;
    b.bike_group.addChild(pathHeadTube);

    // Draw Seat Tube
    var pathSeatTube = new Path.Line(b.bottom_bracket, b.seat_tube_top);
    pathSeatTube.strokeColor = colours.component;
    b.bike_group.addChild(pathSeatTube);

    // Draw Fork
    var pathFork = new Path.Line(b.head_tube_bottom, b.front_wheel);
    pathFork.strokeColor = colours.component;
    b.bike_group.addChild(pathFork);

    //Draw Top Tube
    var pathTopTube = new Path.Line(b.seat_tube_top, b.steering_axis_top);
    pathTopTube.strokeColor = colours.component;
    b.bike_group.addChild(pathTopTube);

    // Draw Down Tube. As this is estimated we move 80% up the head tube.
    var pathDownTube = new Path.Line(b.bottom_bracket, (pathHeadTube.getPointAt(pathHeadTube.length * 0.8)));
    pathDownTube.strokeColor = colours.component;
    b.bike_group.addChild(pathDownTube);

    // Draw Seat Stay
    var pathSeatStay = new Path.Line(b.rear_wheel, b.seat_tube_top);
    pathSeatStay.strokeColor = colours.component;
    b.bike_group.addChild(pathSeatStay);

    // Draw rear wheel
    var shapeRearWheel = new Shape.Circle(b.rear_wheel, b.wheel_size);
    shapeRearWheel.strokeColor = colours.component;
    b.bike_group.addChild(shapeRearWheel);

    // Draw front wheel
    var shapeFrontWheel = new Shape.Circle(b.front_wheel, b.wheel_size);
    shapeFrontWheel.strokeColor = colours.component;
    b.bike_group.addChild(shapeFrontWheel);
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
