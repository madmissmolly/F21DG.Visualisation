//Function that determines whether we can draw a bike or not
function isDrawable(b) {
    //Checks if nessecary parameters are present, calculates them if not, returns false if this is not possible
    if (b.chainstay == null) {
        //Chainstay cannot be calculated from other parameters
        return false;
    }
    else if (b.bb_drop == null) {
        //bb_drop cannot be calulated from other parameters
        return false;
    }
    else if (b.wheelbase == null) {
        if (front_centre == null) {
            //front_centre cannot be calculated from other parameters
            return false;
        } else {
            //wheelbase can be calculated from other parameters
            b.wheelbase = Math.sqrt(Math.pow(b.chainstay, 2) - Math.pow(b.bb_drop, 2)) + Math.sqrt(Math.pow(b.front_centre, 2)) - (Math.pow(b.bb_drop, 2));
        }
    }
    else if (b.head_angle == null && b.stack == null) {
        return false;
    }
    else if (b.seat_angle == null){
        return false;
    }
    else if (b.stack == null) {
        if ((b.head_tube == null || b.head_angle == null || b.fork_length == null) && (b.standover == null || b.bb_height == null)) {
            // stack cannot be calculated from other parameters
            return false;
        }else if (b.seat_tube_length_eff != null){
            b.stack = b.seat_tube_length_eff * Math.sin(b.seat_angle);
        } else if (b.standover == null || b.bb_height == null) {
            //stack can be calculated from other parameters
            b.stack = b.bbdrop + (Math.sin(b.head_angle * (180 / Math.PI)) * b.head_tube) + (b.fork_length * Math.sin(b.headAngle * (180 / Math.PI)));
        } else {
            //stack can be calculated from other parameters
            b.stack = b.standover - b.bb_height + b.bb_drop;
        }
    }
    else if (b.head_angle == null) {
        if (b.head_tube == null || b.fork_length == null){
            return false
        }
        b.head_angle = (b.stack) / Math.arcsine(b.head_tube + b.fork_length);
    }
    else if(b.head_tube == null){
        if (b.forklength == null){
            return false;
        } else {
            b.head_tube = (b.stack / Math.sin(b.headAngle)) - b.fork_length;
        }
    }
    else if (b.fork_rake == null){
        //return false;
    }
    else if (b.seat_tube_length == null){
        if (b.seat_tube_length_cc != null){b.seat_tube_length = b.seat_tube_length_cc}
        else if (b.seat_tube_length_eff != null){b.seat_tube_length = b.seat_tube_length_eff}
    }

    return true;
}
