var bicycle1 = {
    wheelbase: 995,
    bb_drop: 70,
    chainstay: 410,
    stack: 543,
    reach: 390,
    fork_rake: 45,
    head_angle: 72,
    head_tube: 140,
    seat_tube_length: 520,
    seat_angle: 74,
    wheel_size: 340
};

var bicycle2 = {
    wheelbase: 972,
    bb_drop: 70,
    chainstay: 405,
    stack: 517,
    reach: 372,
    fork_rake: 45,
    head_angle: 71,
    head_tube: 123,
    seat_tube_length: 425,
    seat_angle: 74.5,
    wheel_size: 311
};

var bicycle3 = {
    wheelbase: 1121.6,
    bb_drop: 43,
    chainstay: 438,
    stack: 593.1,
    reach: 402.7,
    head_angle: 67.2,
    head_tube: 95,
    seat_tube_length: 410,
    seat_angle: 73.8,
    wheel_size: 311
};

var test_bicycle = {};
var toggle_bikes = {};

var loaded = false;
var state = "";

var colours = {
    gridline: '#909090',
    guideline: '#646464',
    hovered: '#bea705',
    component: '#0093be',
    estimated: '#888888',
    wheels: '#555432'
};

var multiple = {
    gridline: '#f9f1e0',
    guideline: '#646464',
    hovered: '#0093be',
    component: ['aqua', 'red','lime', 'fuschia', 'yellow', 'maroon', 'teal','blue', 'green']
};

window.globals = {}

function readBikeData(file) {
    var xmlhttp = new XMLHttpRequest();
    var url = "dataTest.json";

    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        var notSort = [];
        for (k in myArr){
            notSort.push(myArr[k])
        }        
        
        test_bicycle = notSort.sort(function(a, b) {
            return a.stack - b.stack;
        });

        var buttons = document.getElementById("togButtons")
        for (let bikeNum = 0; bikeNum < test_bicycle.length; bikeNum++) {
            toggle_bikes[bikeNum] = true;
            var newBtn = document.createElement("button")
            newBtn.id = "togBike".concat(bikeNum);
            newBtn.onclick = function () { 
                window.globals.toggleBike(bikeNum);
                if(!this.classList.contains("active"))
                    this.classList.add("active")
                else
                    this.classList.remove("active")
                console.log(this.classList);
                
                
            } 
            newBtn.innerHTML = ""+(bikeNum+1);
            newBtn.classList.add("btn") 
            newBtn.classList.add(multiple.component[bikeNum])
            test_bicycle[bikeNum].colour = multiple.component[bikeNum]
            
            buttons.appendChild(
                newBtn
            )
        }

        loaded = true;
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    
}
