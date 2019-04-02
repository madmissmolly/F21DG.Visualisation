function toggleTesting() {
    if (isTesting) {
        isTesting = false;
    } else {
        isTesting = true;
    }
    var newBtn = document.getElementById("toggle_test")
    if (!newBtn.classList.contains("active"))
        newBtn.classList.add("active");
    else
        newBtn.classList.remove("active");
    globals.drawBikes();
}

function toggleBike(n) {
    toggle_bikes[n] = !toggle_bikes[n];
    globals.drawBikes();
}

function setActive(bikeID) {
    var button = document.getElementById("togBike".concat(bikeID));
    button.classList.add("active");
    button.classList.add("isActive");
    button.classList.remove("isInactive");
    all_bicycle_data[bikeID].colour = colours.component;
    toggle_bikes[bikeID] = true;
}

function setInactive(bikeID) {
    var button = document.getElementById("togBike".concat(bikeID));
    button.classList.remove("isActive");
    button.classList.add("isInactive");
    all_bicycle_data[bikeID].colour = colours.component_inactve;
}

function setHidden(bikeID) {
    var button = document.getElementById("togBike".concat(bikeID));
    button.classList.remove("active");
    all_bicycle_data[bikeID].colour = colours.component_inactve;
    toggle_bikes[bikeID] = false;
}

function changeToggle(bikeID) {
    setActive(bikeID);
    if (isTesting)
        return true;
    var countVisible = 0;
    var changedInactive = false;
    for (b in toggle_bikes) {
        if (toggle_bikes[b]) {
            countVisible += 1;
        }
    }
    for (var bikeNum = 0; bikeNum < all_bicycle_data.length; bikeNum++) {
        if (bikeNum != bikeID && all_bicycle_data[bikeNum].colour == colours.component_inactve && toggle_bikes[bikeNum] && !changedInactive && countVisible >= maxVisible) {
            changedInactive = true;
            setHidden(bikeNum);
        }
        if (bikeNum != bikeID && all_bicycle_data[bikeNum].colour == colours.component) {
            setInactive(bikeNum);
        }
    }

}

function createInterface() {
    var buttons = document.getElementById("togButtons")
    var isActive = true;
    for (var bikeNum = 0; bikeNum < all_bicycle_data.length; bikeNum++) {
        var newBtn = document.createElement("button")
        newBtn.id = "togBike".concat(bikeNum);
        newBtn.type = "button";
        newBtn.onclick = function () {
            if (this.classList.contains("active")) {
                this.classList.remove("active");
                toggleBike(bikeNum);
                globals.drawBikes();
            } else {
                changeToggle(bikeNum);
                globals.drawBikes();
            }
        }
        newBtn.innerHTML = bikeNum + 1;
        newBtn.classList.add("btn");
        if (bikeNum < maxVisible) {
            newBtn.classList.add("active");
            toggle_bikes[bikeNum] = true;
        } else {
            toggle_bikes[bikeNum] = false;
        }

        if (isActive) {
            all_bicycle_data[bikeNum].colour = colours.component;
            newBtn.classList.add("isActive");
            isActive = false;
        } else {
            all_bicycle_data[bikeNum].colour = colours.component_inactve;
            newBtn.classList.add("isInactive");
        }

        buttons.appendChild(newBtn);
        globals.drawBikes();
    }

}

function readBikeData(file) {
    var xmlhttp = new XMLHttpRequest();
    var url = "dataTest.json";

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            var notSorted = [];
            for (k in myArr) {
                notSorted.push(myArr[k])
            }

            all_bicycle_data = notSorted.sort(function (a, b) {
                return a.stack - b.stack;
            });

            createInterface();
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();

}
