/**************** FINDING FUNCTIONS ****************/

// Find rear wheel centre using wheelbase and the view centre point
function findRearWheel(b) {
    return new Point(view.center + new Point(0 - b.wheelbase / 2, 0));
}

// Find front wheel centre using wheelbase and the view centre point
function findFrontWheel(b) {
    return new Point(view.center + new Point(b.wheelbase / 2, 0));
}

// Use Pythagoras' Theorem to find the bottom bracket
function findBottomBracket(b) {
    var point = new Point(b.rear_wheel);
    point += new Point(Math.sqrt(Math.pow(b.chainstay, 2) + Math.pow(b.bb_drop, 2)), 0);
    point += new Point(0, b.bb_drop);
    return point;
}

//Find bottom of steering axis by using fork rake to find distance from front wheel along wheelbase
function findSteeringAxisBottom(b) {
    return new Point(b.front_wheel - new Point(b.fork_rake / Math.sin(b.head_angle * Math.PI / 180), 0));
}

function findSteeringAxisTop(b) {
    // Calculate length of steering axis
    var steering_axis_length = (b.stack - b.bb_drop) / Math.sin(b.head_angle * Math.PI / 180);

    // Use Pythagoras' Theorem to find X offset of top of steering axis from front wheel
    // var steering_axis_top_offset = new Point(b.front_wheel - new Point(b.fork_rake + Math.sqrt(Math.pow(steering_axis_length, 2) - Math.pow((b.stack - b.bb_drop), 2)), 0));
    var steering_axis_top_offset = b.steering_axis_bottom - new Point(Math.sqrt(Math.pow(steering_axis_length, 2) - Math.pow((b.stack - b.bb_drop), 2)), 0);

    // Find coordinate for top of steering axis / head tube
    steering_axis_top_offset -= new Point(0, (b.stack - b.bb_drop));

    steering_axis_top_offset.x = b.bottom_bracket.x + b.reach;

    return steering_axis_top_offset;
}

function findHeadTubeBottom(b) {
    // Find coordinate for bottom of head tube y offset from top of head tube sin * hyp
    var y_offset = Math.sin(b.head_angle * Math.PI / 180) * b.head_tube;

    var x_offset = Math.sqrt(Math.pow(b.head_tube, 2) - Math.pow(y_offset, 2));

    return b.steering_axis_top + new Point(x_offset, y_offset);
}

function findSeatTubeTop(b) {
    // Find coordinates for top of seat tube offset from bottom bracket sin * hyp
    var y_offset = Math.sin(b.seat_angle * Math.PI / 180) * b.seat_tube_length;

    var x_offset = Math.sqrt(Math.pow(b.seat_tube_length, 2) - Math.pow(y_offset, 2));

    return b.bottom_bracket - new Point(x_offset, y_offset);
}

function findSeatPostTop(b) {
    var y_offset = Math.sin(b.seat_angle * Math.PI / 180) * 140;

    var x_offset = Math.sqrt(Math.pow(140, 2) - Math.pow(y_offset, 2));

    return b.seat_tube_top - new Point(x_offset, y_offset);
}

function findHandlebarPostTop(b) {
    var y_offset = Math.sin(b.head_angle * Math.PI / 180) * 100;

    var x_offset = Math.sqrt(Math.pow(100, 2) - Math.pow(y_offset, 2));

    return b.steering_axis_top - new Point(x_offset, y_offset);
}

/**************** DRAWING FUNCTIONS ****************/

function drawGridLines() {
    for (var i = 0.025; i < 1; i += 0.025) {
        // Draw vertical line
        var pathVerticalGridLine = new Path.Line(
            new Point(view.bounds.width * i, 0), new Point(view.bounds.width * i, view.bounds.height)
        );
        pathVerticalGridLine.opacity = 0.1;
        pathVerticalGridLine.strokeColor = window.globals.colours.gridline;

        // Draw horizontal line
        var pathHorizontalGridLine = new Path.Line(
            new Point(0, view.bounds.height * i), new Point(view.bounds.width, view.bounds.height * i)
        );
        pathHorizontalGridLine.opacity = 0.1;
        pathHorizontalGridLine.strokeColor = window.globals.colours.gridline;
    }
}

function drawGuidelines(b) {
    var bike_guidelines = new Group();

    // Draw wheelbase guideline
    var pathWheelbase = new Path.Line(b.rear_wheel, b.front_wheel);
    bike_guidelines.addChild(pathWheelbase);

    // Draw bbdrop guideline
    var pathBBDrop = new Path();
    pathBBDrop.add(b.bottom_bracket.x, view.center.y);
    pathBBDrop.add(pathBBDrop.position + new Point(0, b.bb_drop));
    bike_guidelines.addChild(pathBBDrop);

    // Draw stack guideline
    var pathStack = new Path.Line(b.bottom_bracket, b.bottom_bracket - new Point(0, b.stack));
    var textStack = new PointText({
        point: pathStack.bounds.center + new Point(25, 0),
        content: b.stack,
        fontSize: 25,
        justification: 'left'
    });
    bike_guidelines.addChild(textStack);
    bike_guidelines.addChild(pathStack);

    // Draw reach guideline
    var pathReach = new Path.Line(pathStack.position, new Point(b.steering_axis_top.x, pathStack.position.y));
    pathReach.translate(new Point(0, -100));
    var textReach = new PointText({
        point: pathReach.bounds.center + new Point(0, -25),
        content: Math.ceil(pathReach.length),
        fontSize: 25,
        justification: 'center'
    });
    bike_guidelines.addChild(textReach);
    bike_guidelines.addChild(pathReach);

    // Draw steering axis
    var pathSteeringAxis = new Path.Line(b.steering_axis_bottom, b.steering_axis_top);
    bike_guidelines.addChild(pathSteeringAxis);

    // Draw wheel radius
    var pathWheelRadius = new Path.Line(b.rear_wheel, b.rear_wheel + new Point(0, b.wheel_size));
    var textWheelRadius = new PointText({
        point: pathWheelRadius.bounds.center + new Point(-25, 0),
        content: b.wheel_size,
        fontSize: 25,
        justification: 'right'
    });
    bike_guidelines.addChild(textWheelRadius);
    bike_guidelines.addChild(pathWheelRadius);

    // Draw head tube guideline to the right of the head tube
    var pathHeadTubeGuideline = new Path.Line(b.steering_axis_top, b.head_tube_bottom);
    pathHeadTubeGuideline.translate(new Point(50, 0));
    var textHeadTubeLabel = new PointText({
        point: pathHeadTubeGuideline.bounds.center + new Point(25, 0),
        content: b.head_tube,
        fontSize: 25
    });
    bike_guidelines.addChild(textHeadTubeLabel);
    bike_guidelines.addChild(pathHeadTubeGuideline);

    bike_guidelines.children.forEach(function (part) {
        part.set({
            strokeCap: 'round',
            strokeWidth: 2,
            dashArray: [2, 4],
            opacity: 0.6,
            strokeColor: window.globals.colours.guideline
        });
    });

    b.bike_group.addChild(bike_guidelines);
}

// Draw the bike parts once points have been calculated
function drawBike(b) {
    // For bike parts that are estimated due to lack of data
    var bike_parts_estimated = new Group();

    // For the bike wheels
    var bike_wheels = new Group();

    // For bike parts that we know the properties of
    var bike_parts = new Group();

    // Draw rear wheel
    var shapeRearWheel = new Shape.Circle(b.rear_wheel, b.wheel_size);
    bike_wheels.addChild(shapeRearWheel);

    // Draw front wheel
    var shapeFrontWheel = new Shape.Circle(b.front_wheel, b.wheel_size);
    bike_wheels.addChild(shapeFrontWheel);

    // Draw Head Tube
    var pathHeadTube = new Path.Line(b.steering_axis_top, b.head_tube_bottom);
    pathHeadTube.label = "Head tube";
    bike_parts.addChild(pathHeadTube);

    // Draw Down Tube. As this is estimated we move 80% up the head tube.
    var pathDownTube = new Path.Line(b.bottom_bracket, (pathHeadTube.getPointAt(pathHeadTube.length * 0.8)));
    bike_parts_estimated.addChild(pathDownTube);

    // Draw Seat Stay
    var pathSeatStay = new Path.Line(b.rear_wheel, b.seat_tube_top);
    bike_parts_estimated.addChild(pathSeatStay);

    // Draw Seat Post continuing from seat tube
    var pathSeatPost = new Path.Line(b.seat_tube_top, b.seat_post_top);
    bike_parts_estimated.addChild(pathSeatPost);

    // Draw handlebars from head tube
    var pathHandlebars = new Path.Line(b.steering_axis_top, b.handlebar_post_top);
    pathHandlebars.add(pathHandlebars.position + new Point(100, -25));
    pathHandlebars.smooth();
    bike_parts_estimated.addChild(pathHandlebars);

    // Draw chainstay
    var pathChainstay = new Path.Line(b.bottom_bracket, b.rear_wheel);
    pathChainstay.label = "Chainstay";
    bike_parts.addChild(pathChainstay);

    // Draw Seat Tube
    var pathSeatTube = new Path.Line(b.bottom_bracket, b.seat_tube_top);
    pathSeatTube.label = "Seat tube";
    bike_parts.addChild(pathSeatTube);

    // Draw Fork
    var pathFork = new Path.Line(b.head_tube_bottom, b.front_wheel);
    pathFork.label = "Fork";
    bike_parts.addChild(pathFork);

    //Draw Top Tube
    var pathTopTube = new Path.Line(b.seat_tube_top, b.steering_axis_top);
    pathTopTube.label = "Top tube";
    bike_parts.addChild(pathTopTube);

    // Draw bottom bracket
    var shapeBottomBracket = new Shape.Circle(b.bottom_bracket, 25);
    shapeBottomBracket.fillColor = window.globals.colours.component;
    shapeBottomBracket.label = "Bottom bracket";
    bike_parts.addChild(shapeBottomBracket);

    // Apply styling and interactivity to each bike part that we know the value of
    bike_parts.children.forEach(function (part) {
        part.set({
            strokeCap: 'round',
            strokeWidth: 10,
            strokeColor: window.globals.colours.component,
            selected: true,
            opacity: 0.6,
            onMouseEnter: function () {
                hoverLabel.content = this.label;
                this.strokeColor = window.globals.colours.hovered;
                this.bringToFront();
            },
            onMouseLeave: function () {
                hoverLabel.content = "";
                this.strokeColor = window.globals.colours.component;
                this.bringToFront();
            }
        });
    });

    bike_wheels.children.forEach(function (part) {
        part.set({
            strokeCap: 'round',
            strokeWidth: 12,
            strokeColor: window.globals.colours.wheels,
            opacity: 0.3,
            onMouseEnter: function () {
                hoverLabel.content = 'Wheel radius';
                this.strokeColor = window.globals.colours.hovered;
                this.bringToFront();
            },
            onMouseLeave: function () {
                hoverLabel.content = "";
                this.strokeColor = window.globals.colours.wheels;
                this.bringToFront();
            }
        });
    });

    bike_parts_estimated.children.forEach(function (part) {
        part.set({
            strokeCap: 'round',
            strokeWidth: 8,
            opacity: 0.3,
            strokeColor: window.globals.colours.estimated
        });
    });

    b.bike_group.addChild(bike_wheels);
    b.bike_group.addChild(bike_parts_estimated);
    b.bike_group.addChild(bike_parts);
}

/**************** CORE FUNCTIONS ****************/

function findBikeCoords(b) {
    b.rear_wheel = findRearWheel(b);

    b.front_wheel = findFrontWheel(b);

    b.bottom_bracket = findBottomBracket(b);

    b.steering_axis_bottom = findSteeringAxisBottom(b);

    b.steering_axis_top = findSteeringAxisTop(b);

    b.head_tube_bottom = findHeadTubeBottom(b);

    b.seat_tube_top = findSeatTubeTop(b);

    b.seat_post_top = findSeatPostTop(b);

    b.handlebar_post_top = findHandlebarPostTop(b);
}

function makeBike(b) {
    // Check we have the parameters available to draw the bike
    if (isDrawable(b)) {
        // Create group for each component of the bike drawing
        b.bike_group = new Group();

        findBikeCoords(b);
        drawGuidelines(b);
        drawBike(b);

        // Set bike pivot (centre point) to bottom bracket
        b.bike_group.pivot = b.bottom_bracket;
        b.bike_group.position = view.center;

        // Add the drawn bike's group of parts to collection of bikes
        return b.bike_group;
    }
}

window.globals.main = function (bikes_array) {
    project.clear();

    // All groups of bike parts are collected in here
    var allBikes = new Group();

    hoverLabel = new PointText(hoverLabelSettings);

    drawGridLines();

    bikes_array.forEach(function (b) {
        console.log(b);
        // Create, draw, and add bike parts to all bikes group
        allBikes.addChild(makeBike(b));
    });

    // Resize the bikes to fit within the view
    allBikes.fitBounds(view.bounds);
    allBikes.scale(0.8);
    allBikes.bringToFront();
};

var hoverLabel;

var hoverLabelSettings = {
    point: view.bounds.bottomCenter - new Point(0, 10),
    fillColor: 'black',
    fontFamily: 'Helvetica',
    fontSize: 14,
    justification: 'center'
};

window.globals.main([window.globals.example_bikes.bicycle_1]);
