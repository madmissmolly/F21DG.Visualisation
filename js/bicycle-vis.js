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

    // Check we have the parameters availabe to draw the bike
    if (isDrawable(b)) {

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
}

function findBikeCoords(b) {
    b.rear_wheel = findRearWheel(b);

    b.front_wheel = findFrontWheel(b);

    b.bottom_bracket = findBottomBracket(b);

    b.steering_axis_bottom = findSteeringAxisBottom(b);

    b.steering_axis_top = findSteeringAxisTop(b);

    b.head_tube_bottom = findHeadTubeBottom(b);

    b.seat_tube_top = findSeatTubeTop(b);
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

// Drawing the bike parts once points have been calculated
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

//Function that determines whether we can draw a bike or not
function isDrawable(b) {
    //Checks if nessecary parameters are present, calculates them if not, returns false if this is not possible
    if (b.chainstay == null) {
        //Chainstay cannot be calculated from other parameters
        return false;
    } 
    else if (b.bb_drop == null) {
        //bb_drop cannot be calulated from other parameters
        return false;
    } 
    else if (b.wheelbase == null) {
        if (front_centre == null) {
            //front_centre cannot be calculated from other parameters
            return false;
        } else {
            //wheelbase can be calculated from other parameters
            b.wheelbase = Math.sqrt(Math.pow(b.chainstay, 2) - Math.pow(b.bb_drop, 2)) + Math.sqrt(Math.pow(b.front_centre, 2)) - (Math.pow(b.bb_drop, 2));
        }
    }
    else if (b.head_angle == null && b.stack == null) {
        return false;
    } 
    else if (b.seat_angle == null){
        return false;
    }
    else if (b.stack == null) {
        if ((b.head_tube == null || b.head_angle == null || b.fork_length == null) && (b.standover == null || b.bb_height == null)) {
            // stack cannot be calculated from other parameters
            return false;
        }else if (b.seat_tube_length_eff != null){
            b.stack = b.seat_tube_length_eff * Math.sin(b.seat_angle); 
        } else if (b.standover == null || b.bb_height == null) {
            //stack can be calculated from other parameters
            b.stack = b.bbdrop + (Math.sin(b.head_angle * (180 / Math.PI)) * b.head_tube) + (b.fork_length * Math.sin(b.headAngle * (180 / Math.PI)));
        } else {
            //stack can be calculated from other parameters
            b.stack = b.standover - b.bb_height + b.bb_drop;
        }
    }
    else if (b.head_angle == null) {
        if (b.head_tube == null || b.fork_length == null){
            return false
        }
        b.head_angle = (b.stack) / Math.arcsine(b.head_tube + b.fork_length);
    }
    else if(b.head_tube == null){
        if (b.forklength == null){
            return false;
        } else {
            b.head_tube = (b.stack / Math.sin(b.headAngle)) - b.fork_length;
        }
    }
    else if (b.fork_rake == null){
        //return false;
    }
    else if (b.seat_tube_length == null){
        if (b.seat_tube_length_cc != null){b.seat_tube_length = b.seat_tube_length_cc}
        else if (b.seat_tube_length_eff != null){b.seat_tube_length = b.seat_tube_length_eff}
    }

    return true;
}
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

//Find bottom of steering axis by taking fork rake away from front wheel
function findSteeringAxisBottom(b) {
    return new Point(b.front_wheel - new Point(b.fork_rake, 0));
}

function findSteeringAxisTop(b) {
    // Calculate length of steering axis
    var steering_axis_length = (b.stack - b.bb_drop) / Math.sin(b.head_angle * (180 / Math.PI));

    // Use Pythagoras' Theorem to find X offset of top of steering axis from front wheel
    var steering_axis_top_offset = new Point(b.front_wheel - new Point(b.fork_rake + Math.sqrt(Math.pow(steering_axis_length, 2) - Math.pow((b.stack - b.bb_drop), 2)), 0));

    // Find coordinate for top of steering axis / head tube
    var steering_axis_top = steering_axis_top_offset - new Point(0, (b.stack - b.bb_drop));

    return steering_axis_top;
}

function findHeadTubeBottom(b) {
    // Find coordinate for bottom of head tube y offset from top of head tube sin * hyp
    var head_tube_y_offset = (Math.sin(b.head_angle * (180 / Math.PI)) * b.head_tube);

    var head_tube_bottom = b.steering_axis_top - new Point(0, head_tube_y_offset);

    //x offset from top of head tube
    head_tube_bottom += new Point(Math.sqrt((Math.pow(b.head_tube, 2) - Math.pow(head_tube_y_offset, 2))), 0);

    return head_tube_bottom;
}

function findSeatTubeTop(b) {
    // Find coordinates for top of seat tube offset from bottom bracket sin * hyp
    var seat_tube_y_offset = (Math.sin(b.seat_angle * (180 / Math.PI)) * b.seat_tube_length);

    var point = b.bottom_bracket + new Point(0, seat_tube_y_offset);

    //x offset from top of bottom bracket tube
    point -= new Point(Math.sqrt((Math.pow(b.seat_tube_length, 2) - Math.pow(seat_tube_y_offset, 2))), 0);

    return point;
}