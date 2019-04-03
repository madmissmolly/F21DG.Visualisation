function createInterface(bike_array) {
    // No interface needed if there is only one bike supplied
    if (bike_array.length === 1) {
        return true;
    }

    var interface_wrap = document.getElementById('interface');

    var checkbox_show_bike_group = document.createElement('div');

    for (var i = 0; i < bike_array.length; i++) {
        var checkbox_show_bike = document.createElement('input');

        checkbox_show_bike.type = 'checkbox';
        checkbox_show_bike.checked = true;
        checkbox_show_bike.setAttribute("data-label", ("Bike " + (i + 1)));
        checkbox_show_bike.bike = bike_array[i];

        checkbox_show_bike.onchange = function () {
            window.globals.main(activeBikes(checkbox_show_bike_group));
        };

        checkbox_show_bike_group.appendChild(checkbox_show_bike);
    }

    var checkbox_toggle_testing = document.createElement('input');
    checkbox_toggle_testing.type = 'checkbox';
    checkbox_toggle_testing.checked = window.globals.testing;
    checkbox_toggle_testing.setAttribute("data-label", "Toggle testing");

    checkbox_toggle_testing.onchange = function () {
        window.globals.testing = this.checked;
        window.globals.main(activeBikes(checkbox_show_bike_group));
    };

    interface_wrap.appendChild(checkbox_toggle_testing);
    interface_wrap.appendChild(checkbox_show_bike_group);

    window.globals.main(activeBikes(checkbox_show_bike_group));
}

function activeBikes(group) {
    var active_bikes = [];

    for (var i = 0; i < group.children.length; i++) {
        if (group.children[i].checked) {
            active_bikes.push(group.children[i].bike);
        }
    }

    return active_bikes;
}