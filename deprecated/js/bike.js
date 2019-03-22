
class Bike {
    constructor(bikeDeets) {
        this.bikeDeets = bikeDeets
        console.log("this is the bayke")
        console.log(bikeDeets);
         
    }

    myfun(){
        console.log("hello");
        
    }
}
window.globals = {}

function toggle() {
    window.globals.tog();
    // paper.showDetails = !paper.showDetails
    console.log("show show");
    
}

// class Rule {
//     constructor(start,end) {
//         this.start = start
//         this.end = end
//         console.log(" line says hello");

//     }

//     getStart(){
//         console.log("hello");
//         return this.start;
//     }
// }
