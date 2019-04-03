// This is just for reference as to how to interact with bicycle-vis.js so elements are created on the fly
// In a live site it would probably suit better to generate this interface in the backend

function createInterface(bike_array) {
    // No interface needed if there is only one bike supplied
    if (bike_array.length === 1) {
        return true;
    }

    var interface_wrap = document.getElementById('interface');

    var checkbox_show_bike_group = document.createElement('div');

    // Create a checkbox for each bike
    for (var i = 0; i < bike_array.length; i++) {
        var checkbox_show_bike = document.createElement('input');

        checkbox_show_bike.type = 'checkbox';
        checkbox_show_bike.checked = false;
        checkbox_show_bike.name = "checkbox-show-bike";
        checkbox_show_bike.setAttribute("data-label", ("Bike " + (i + 1)));
        checkbox_show_bike.bike = bike_array[i];

        // This handles each click event
        checkbox_show_bike.onchange = function () {
            var previously_active = removeActiveStateFromCheckboxes();

            this.setAttribute("data-status", "(Active)");

            window.globals.active_bikes = [];
            window.globals.active_bikes.push(this.bike);
            this.checked = true;

            if (previously_active != null) {
                if(this !== previously_active) {
                    window.globals.active_bikes.push(previously_active.bike);
                    previously_active.checked = true;
                }
            }

            window.globals.main(window.globals.active_bikes);
        };

        checkbox_show_bike_group.appendChild(checkbox_show_bike);
    }

    var checkbox_toggle_testing = document.createElement('input');
    checkbox_toggle_testing.type = 'checkbox';
    checkbox_toggle_testing.checked = window.globals.testing;
    checkbox_toggle_testing.setAttribute("data-label", "Toggle testing");

    checkbox_toggle_testing.onchange = function () {
        window.globals.testing = this.checked;
        window.globals.main(activeBikes());
    };

    interface_wrap.appendChild(checkbox_toggle_testing);
    interface_wrap.appendChild(checkbox_show_bike_group);

    window.globals.main(activeBikes());
}

function removeActiveStateFromCheckboxes() {
    var active_box;

    document.querySelectorAll('input[name=checkbox-show-bike]').forEach(function (box) {
        if (box.getAttribute("data-status") !== null) {
            active_box = box;
            box.removeAttribute("data-status");
        }

        box.checked = false;
    });

    return active_box;
}

// Sets the active bikes depending on testing status and which bikes are selected
function activeBikes() {
    window.globals.active_bikes = [];

    var checkedBoxes = document.querySelectorAll('input[name=checkbox-show-bike]');

    checkedBoxes.forEach(function (box) {
        if (window.globals.testing || box.checked) {
            window.globals.active_bikes.push(box.bike);
        }
    });

    return window.globals.active_bikes;
}