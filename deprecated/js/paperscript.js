//make line class
// Dimension variables
var wheelbase = 1043;
var bikeBBDrop = -68;
var chainstay = 462;
var seatAngle = 74;
var headAngle = 71;
var headTube = 115;
var seatTube = 74;
var effTopTube = 530;

var stack = 547;
var reach = 373;

var bb_h_to_front = 0;
var reachStart = new Point(0,0);
var endReach = new Point(0,0);
var endTopTube = new Point(0,0);
var wbLeft = new Point(0,0);
var wbRight = new Point(0,0);

var mm = (view.size.height/2)/1000;

var bikeStart = new Point(1250*mm,1250*mm);


var maxW = 3000;
var maxH = 2000;

// class Bike {
//     constructor(wheelbase) {
//         this.wheelbase = wheelbase
//         console.log(wheelbase);

//     }
// }


// Helpers
function newPath(start) {
    var path = new Path();

    path.moveTo(start);

    path.strokeColor = 'black';

    return path;
}

// Drawing
function drawWheelbase() {
    var start = new Point(1250*mm - wbStart*mm, 1250*mm +bikeBBDrop*mm);

        var path = newPath(start);

        path.dashArray = [10, 4];

        path.lineTo([start.x + wheelbase*mm, 1250*mm+bikeBBDrop*mm]);
    if(!showDetails){
        path.visible = false
    }

    wbLeft = new Point (1250*mm - wbStart*mm, 1250*mm +bikeBBDrop*mm)
    wbRight = new Point (start.x + wheelbase*mm, 1250*mm+bikeBBDrop*mm)
    return path
}

function drawBBDrop() {
    var start = new Point(bikeStart, 1250*mm);

    var path = newPath(start);

    path.lineTo(start + [0, +bikeBBDrop*mm]);
}

function drawChainstay() {
    var start = new Point(1250*mm, 1250*mm);

    var path = newPath(start);
    // console.log(height);

    path.lineTo(start - [wbStart*mm, -bikeBBDrop*mm]);
}



function drawStack() {
    var start =  new Point(1250*mm, 1250*mm);//bikeStart;

    var path = newPath(start);
    path.dashArray = [10, 4];
    path.lineTo(start + [0, -stack*mm]);

    reachStart =  new Point(start + [0, -stack*mm])
}


function drawReach() {
    var start =  new Point(reachStart.x, reachStart.y);//bikeStart;

    var path = newPath(start);
    path.dashArray = [10, 4];
    path.lineTo(start + [reach*mm, 0]);

    endReach = new Point(start + [reach*mm, 0])
}

function drawFork() {
    var start =  new Point(endReach.x, endReach.y);//bikeStart;

    var path = newPath(start);
    path.lineTo(start + [frontX*mm, frontY*mm]);
}

function drawHeadstay() {
    var start =  new Point(1250*mm, 1250*mm);//bikeStart;

    var path = newPath(start);
    path.lineTo(endReach.x - ht_x*mm, endReach.y + ht_y*mm);
}


function drawToptube() {
    var start = new Point(endReach.x, endReach.y);

    var path = newPath(start);
    path.dashArray = [10, 4];
    path.lineTo(start - [effTopTube*mm, 0]);

    endTopTube = new Point(start - [effTopTube*mm, 0])
}


function drawSeattube() {
    var start = new Point(1250*mm, 1250*mm);

    var path = newPath(start);
    // path.dashArray = [10, 4];
    path.lineTo(endTopTube);
}


function drawWheels() {
    var wheelBack = new Path.Circle(new Point(wbLeft, wbLeft), wheelSize*mm);
    wheelBack.strokeColor = 'grey';


    var wheelFront = new Path.Circle(new Point(wbRight, wbRight), wheelSize*mm);
    wheelFront.strokeColor = 'grey';
}

function tog(){
    scope.activate()
    showDetails = !showDetails
    if(!showDetails)
        wbPath.visible = false
    else
        wbPath.visible = true
    // console.log("heloo paper");
    
}

// Main
function drawBike () {
	var wbStart = Math.sqrt(chainstay*chainstay - bikeBBDrop*bikeBBDrop);
	bb_h_to_front = wheelbase - wbStart;
	var frontX = bb_h_to_front - reach;
	var frontY = stack + bikeBBDrop;
	var frontHyp = frontY / Math.sin(headAngle);
	var frontHyp2 = Math.sqrt(frontX*frontX + frontY*frontY);
	var ht_y = headTube * Math.sin(headAngle);
	var ht_x = headTube * Math.cos(headAngle);
	var wheelSize = (frontHyp - headTube)*0.75;
	
	var wbPath = drawWheelbase();
	bGraph = new BikeGraphic()
	b.addGraphicObj("BBDrop", drawBBDrop());
drawChainstay();
drawStack();
drawReach();
drawFork();
drawHeadstay();
drawToptube();
drawSeattube();
drawWheels();
}

var showDetails = false
var scope = this;
globals.tog = tog

var details = {};

details["wheelbase"] = wheelbase

bik = new Bike (details)
bik.myfun();

lin = new Rule(reachStart, endReach)
console.log(lin.getStart().x);