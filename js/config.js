// Create globals to share variables between Paper.js and the JavaScript
window.bike_colours= {
    gridline: '#f6f6f6',
        guideline: '#646464',
        hovered: '#bea705',
        component: '#0093be',
        component_inactive: 'grey',
        estimated: '#888888',
        wheels: '#545455'
};

window.globals = {
    colours: window.bike_colours,

    testing: true,

    bike_part_settings: {
        strokeCap: 'round',
        strokeWidth: 10,
        strokeColor: window.bike_colours.component,
        selected: true,
        opacity: 0.6
    },

    bike_wheel_settings: {
        strokeCap: 'round',
        strokeWidth: 12,
        strokeColor: window.bike_colours.wheels,
        opacity: 0.3
    },

    bike_part_estimated_settings: {
        strokeCap: 'round',
        strokeWidth: 8,
        opacity: 0.3,
        strokeColor: window.bike_colours.estimated
    },

    hover_label_settings: {
        fillColor: 'black',
        fontFamily: 'Helvetica',
        fontSize: 14,
        justification: 'center'
    },

    bike_guideline_settings: {
        strokeCap: 'round',
        strokeWidth: 2,
        dashArray: [2, 4],
        opacity: 0.6,
        strokeColor: window.bike_colours.guideline
    },

    bike_guideline_label_settings: {
        fillColor: window.bike_colours.guideline,
        fontFamily: 'Helvetica',
        fontSize: 25
    },

    example_bikes: {
        bicycle_1: {
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
        },

        bicycle_2: {
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
        },

        bicycle_3: {
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
        }
    }
};
