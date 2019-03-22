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

    // Use Pythagoras' Theorem to find X coordinate of bottomBracket
    path.moveTo(b.rearWheel + new Point(Math.sqrt(Math.pow(b.chainstay, 2) + Math.pow(b.bbdrop, 2)), 0));
    path.moveTo(path.position + new Point(0, b.bbdrop));

    b.bottomBracket = path.position;
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
}

function main() {
    makeBike(bicycle);

    // Resize the bikes to fit within the view
    allBikes.fitBounds(view.bounds);
    allBikes.scale(0.8);
}

main();
