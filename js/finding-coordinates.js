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
    return new Point(b.front_wheel - new Point(b.fork_rake / Math.sin(b.head_angle), 0));
}

function findSteeringAxisTop(b) {
    // Calculate length of steering axis
    var steering_axis_length = (b.stack - b.bb_drop) / Math.sin(b.head_angle * Math.PI / 180);

    // Use Pythagoras' Theorem to find X offset of top of steering axis from front wheel
    // var steering_axis_top_offset = new Point(b.front_wheel - new Point(b.fork_rake + Math.sqrt(Math.pow(steering_axis_length, 2) - Math.pow((b.stack - b.bb_drop), 2)), 0));
    var steering_axis_top_offset = b.steering_axis_bottom - new Point(Math.sqrt(Math.pow(steering_axis_length, 2) - Math.pow((b.stack - b.bb_drop), 2)), 0);

    // Find coordinate for top of steering axis / head tube
    return steering_axis_top_offset - new Point(0, (b.stack - b.bb_drop));
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
