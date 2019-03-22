
class BikeGraphic {
    constructor() {
        this.bikeGraphics = {};
    }

    addGraphicObj(paramName, paramObj){
        console.log("hello");
        this.bikeGraphics[paramName] = paramObj;
    }
    
    getGraphicObj(paramName){
		  if (this.bikeGraphics.hasOwnProperty(paramName))	{
		  		  return this.bikeGraphics[paramName]; 
		  } else {
			     return null;
		  }
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
