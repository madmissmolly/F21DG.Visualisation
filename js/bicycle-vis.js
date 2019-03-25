var colours = {
    guideline: '#67b4be',
    component: '#36b935'
};

var bicycle = {
    wheelbase: 995,
    bbdrop: 70,
    chainstay: 410,
    stack: 543,
    wheelRadius: 340
};

var bicycle2 = {
    wheelbase: 500,
    bbdrop: 20,
    chainstay: 250,
    stack: 120,
    wheelRadius: 340
};

//Gaint TCR Advanced Pro Disc 2019 XS
var bicycle3 = {
    wheelbase: 972,
    bbdrop: 70,
    chainstay: 405,
    stack: 517,
    reach: 372,
    forkRake: 45,
    headAngle: 71,
    headTube: 123,
    seatTubeCT: 425,
    seatAngle: 74.5
};

var allBikes = new Group();

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
    console.log("Front wheel coord: "+b.frontWheel);

    // Use Pythagoras' Theorem to find X coordinate of bottomBracket
    path.moveTo(b.rearWheel + new Point(Math.sqrt(Math.pow(b.chainstay, 2) + Math.pow(b.bbdrop, 2)), 0));
    path.moveTo(path.position + new Point(0, b.bbdrop));

    b.bottomBracket = path.position;

    //lengthOfSteeringAxis=(stack-bbdrop)/sin(headAngle)
    b.lengthOfSteeringAxis = (b.stack-b.bbdrop)/Math.sin(b.headAngle);
    console.log("Length of steering axis: "+b.lengthOfSteeringAxis);


    //Find X offset of bottom of steering axis from front wheel
    path.moveTo(b.frontWheel - new Point(b.forkRake,0));
    b.steeringAxisBottom = path.position;
    console.log("Steering axis bottom: "+b.steeringAxisBottom);

    // Use Pythagoras' Theorem to find X offset of top of steering axis from front wheel 
    path.moveTo(b.frontWheel - new Point(b.forkRake+Math.sqrt(Math.pow(b.lengthOfSteeringAxis,2)-Math.pow((b.stack-b.bbdrop),2)),0));
    b.steeringAxisTopOffset = path.position;
    console.log("Steering axis top X offset: "+b.steeringAxisTopOffset);

    // Find coordinate for top of steering axis / head tube 
    path.moveTo(path.position + new Point(0,(b.stack-b.bbdrop)));
    b.steeringAxisTop = path.position;
    console.log("Steering axis top: "+b.steeringAxisTop);

    // Find coordinate for bottom of head tube
    //y offset from top of head tube sin * hyp
    headTubeYOffset = (Math.sin(b.headAngle)*b.headTube);
    path.moveTo(b.steeringAxisTop - new Point(0,headTubeYOffset));
    //x offset from top of head tube
    path.moveTo(path.position + new Point(Math.sqrt((Math.pow(b.headTube,2)-Math.pow(headTubeYOffset,2))),0));
    b.headTubeBottom = path.position;

    // Find coordinates for top of seat tube
    // y offset from bottom bracket sin * hyp
    seatTubeYOffset = (Math.sin(b.seatAngle)*b.seatTubeCT);
    path.moveTo(b.bottomBracket + new Point(0,seatTubeYOffset));
    //x offset from top of bottom bracket tube
    path.moveTo(path.position - new Point(Math.sqrt((Math.pow(b.seatTubeCT,2)-Math.pow(seatTubeYOffset,2))),0));
    b.seatTubeTop = path.position;
}

function drawGuidelines(b) {
    // Draw centre point of the view
    var shapeViewCentre = new Shape.Circle(view.center, 10);
    shapeViewCentre.strokeColor = colours.guideline;
    b.bikeGroup.addChild(shapeViewCentre);

    // Draw wheelbase guideline
    var pathWheelbase = new Path.Line(b.rearWheel, b.frontWheel);
    pathWheelbase.strokeColor = colours.guideline;
    b.bikeGroup.addChild(pathWheelbase);

    // Draw bbdrop guideline
    var pathBBDrop = new Path();
    pathBBDrop.add(b.bottomBracket.x, view.center.y);
    pathBBDrop.add(pathBBDrop.position + new Point(0, b.bbdrop));
    pathBBDrop.strokeColor = colours.guideline;
    b.bikeGroup.addChild(pathBBDrop);

    // Draw stack guideline
    var pathStack = new Path();
    pathStack.add(b.bottomBracket);
    pathStack.add(pathStack.position + new Point(0, -b.stack));
    pathStack.strokeColor = colours.guideline;
    b.bikeGroup.addChild(pathStack);

    //Draw steering axis
    var pathSteeringAxis = new Path.Line(b.steeringAxisBottom, b.steeringAxisTop);
    pathSteeringAxis.strokeColor = colours.guideline;
    b.bikeGroup.addChild(pathSteeringAxis);

    //for testing only
    //var shapeTopAxis = new Shape.Circle(b.steeringAxisTop, 5);
    //shapeTopAxis.strokeColor = colours.component;
    //b.bikeGroup.addChild(shapeTopAxis);

}

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
    var pathHeadTube = new Path.Line(b.steeringAxisTop, b.headTubeBottom);
    pathHeadTube.strokeColor = colours.component;
    b.bikeGroup.addChild(pathHeadTube);

    // Draw Seat Tube
    var pathSeatTube = new Path.Line(b.bottomBracket, b.seatTubeTop);
    pathSeatTube.strokeColor = colours.component;
    b.bikeGroup.addChild(pathSeatTube);

    //for testing only
    var shapeHeadTubeBottom = new Shape.Circle(b.headTubeBottom, 5);
    shapeHeadTubeBottom.strokeColor = colours.component;
    b.bikeGroup.addChild(shapeHeadTubeBottom);
}

function main() {
    makeBike(bicycle3);

    // Resize the bikes to fit within the view
    allBikes.fitBounds(view.bounds);
    allBikes.scale(0.8);
}

main();
