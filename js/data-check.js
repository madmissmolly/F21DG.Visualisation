//Function that determines whether we can draw a bike or not
function isDrawable(b) {
    //Checks if necessary parameters are present, calculates them if not, returns false if this is not possible
    if (b.chainstay == null) {
        //Chainstay cannot be calculated from other parameters
        logBikeMessage("No chainstay");
        return false;
    }

    if (b.bb_drop == null) {
        //bb_drop cannot be calculated from other parameters
        logBikeMessage("No bb_drop");
        return false;
    }

    if (b.wheelbase == null) {
        if (b.front_centre == null) {
            //front_centre cannot be calculated from other parameters
            logBikeMessage("No front_centre");
            return false;
        } else {
            //wheelbase can be calculated from other parameters
            //Pythagorus thereom is used to calculate the two right angled triangles Lbb_drop/chainstay/wheelbaseLEFT and Lbb_drop/front_centre/wheelbaseRIGHT
            b.wheelbase = Math.sqrt(Math.pow(b.chainstay, 2) - Math.pow(b.bb_drop, 2)) + Math.sqrt(Math.pow(b.front_centre, 2) - Math.pow(b.bb_drop, 2));
        }
    }

    if (b.head_angle == null && b.stack == null) {
        //head_angle cannot be calculated from other parameters
        logBikeMessage("No stack or head_angle");
        return false;
    }

    if (b.seat_angle == null) {
        //seat_angle cannot be calculated from other parameters
        logBikeMessage("No seat_angle");
        return false;
    }

    if (b.stack == null) {
        if ((b.head_tube == null || b.head_angle == null || b.fork_length == null) && (b.standover == null || b.bb_height == null)) {
            // stack cannot be calculated from other parameters
            logBikeMessage("No stack");
            return false;
        } else if (b.seat_tube_length_eff != null) {
            //stack can be calculated from other parameters
            //Sine Rule -> O = seat_tube_lenghth and Theta = seat_angle
            b.stack = b.seat_tube_length_eff * Math.sin(b.seat_angle);
        } else if (b.standover == null || b.bb_height == null) {
            //stack can be calculated from other parameters
            //From bb_drop bottom to top of stack = bb_drop + Sine Rule -> O = head_tube and Theta = head_angle + Sine Rule - O = fork_length and Theta = head_angle
            b.stack = b.bb_drop + (Math.sin(b.head_angle * Math.PI / 180) * b.head_tube) + (b.fork_length * Math.sin(b.head_angle * Math.PI / 180));
        } else {
            //stack can be calculated from other parameters
            //Full height of bike (standover) - height wheelbase to ground (bb_height) + bb_drop
            b.stack = b.standover - b.bb_height + b.bb_drop;
        }
    }

    if (b.head_angle == null) {
        if (b.head_tube == null || b.fork_length == null) {
            //head_angle cannot be calculated from other parameters
            logBikeMessage("No head_angle");
            return false
        }
        //head_angle can be calculated from other parameters
        //(Inverse) Sine Rule - H = stack and O = head_tube + forklength
        b.head_angle = (b.stack) / Math.asin(b.head_tube + b.fork_length);
    }

    if (b.head_tube == null) {
        if (b.fork_length == null) {
            //if both headtube and fork length are null we cannot draw
            logBikeMessage("No head_tube or fork_length");
            return false;
        } else {
            //if only head tube is null then we can calculate it using head angle (already found) and fork length
            //Sine Rule - O = stack and Theta = head_angle and - fork_length
            b.head_tube = (b.stack / Math.sin(b.head_angle)) - b.fork_length;
        }
    }

    if (b.fork_rake == null) {
        //if no fork rake angle is provided we assume that the is no change in the angle
        logBikeMessage("No fork_rake, assumption is that there is no change in angle");
        b.fork_rake = 0;
    }

    if (b.seat_tube_length == null) {
        //See if any kind of seat tube is present and use that value
        if (b.seat_tube_length_cc != null) {
            b.seat_tube_length = b.seat_tube_length_cc
        } else if (b.seat_tube_length_eff != null) {
            b.seat_tube_length = b.seat_tube_length_eff
        } else {
            logBikeMessage("No seat tube of any kind");
            return false;
        }
        return false;
    }
    return true;
}

//Used to log "errors" to console
function logBikeMessage(message) {
    console.info(("Bike check: " + message));
}
