# F21DG.Visualisation

**Quick Start Instructions**

Run `npm install` to get the dependencies.

Host locally use `/index.html`.

The main file for visualisation is `bicycle-vis.js`.

Project Overview
======

What is it?
------
This repository creates 2D line drawings of bikes from JSON bike objects. Multiple bike objects can be provided but only two may be visualised at any given time with buttons to toggle which of the given bikes are being shown.

What can you do?
------
- Read in JSON format bike objects
- Extract bike parameters
- Evaluate data - do we have all the parts we need to draw the bike?
- Draw the bike
- Draw multiple bikes centered on the bottom bracket
-Toggle these bike visuals

Code In Action
------
### Screenshots
Below is a screenshot of a single bike being visualised on the left with a photograph of the same bike being dosplayed n the right:
> Placeholder for Screenshots
Below is a screenshot of 
> placeholder for screenshots

### Bike Objects
An example of how a bike JSON object is structured:
~~~~
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
        }
~~~~

### Paper.js
This project runs using Paper.js (Paperscript). This is a library that extends Javascript functionality to allow more complex drawing using the <canvas> element.

Geometry Geeks
------
This project was based on specification provided by [Geometry Geeks](https://geometrygeeks.bike "Geometry Geek's Website"), a website that allows for the upload, viewing and comparison of bike geometries.

Documentation
======
An overview of the files, what each one does with a brief how and why, where appropriate.

Files 
------
This is a brief description of the main purposes of the files, each file contains comments to explain the code step by step.

### 'index.html'
Index page that includes that '<canvas>' element that the scripts draw onto.

### js files
------

## 'bicycle-vis.js'
### Main script

#### Finding Functions
These functions calculate all the Points needed to draw a bike.
These calculations are all basic trigonomerty or geometry and have been based off of the descipriptions and diagram that can be found [here]{https://geometrygeeks.bike/understanding-bike-geometry}.
#### Drawing Functions
These functions use Path.Line and Path.(shape) to draw the elements of the bike into an HTML5 Canvas. These [Path]{https://paperjs.org/reference/path/} functions (along with [Point]{http://paperjs.org/reference/point/} objects that are provided to these functions) are from [Paper.js]{https://paperjs.org/}.
#### Core Functions
These functions create the overall structure and hierarchy that calls all of the finding and drawing functions.
This is where the main function, 'window.globals.main = function (bikes_array)' is. When you call main you must provide it with a 'bike_array' which is an array of bike data objects like the one shown above.

#### Order of Calculation
The below diagram shows the values that this project requires to draw a bike (red) and any other values that are calculated from these (white). Where lines on the diagram cross, dotted lines have been used to make the incivudal lines clearer.
> Placeholder for diagram

#### Things to keep in mind when using 'bicycle-vis.js'
- Bike calculations and drawing is always done in the same order. You could extend this project so that alternate routes from value to calculation are available for a more robust system.
- If the canvas is not cleared then new objects will be drawn on top of old ones
- [Groups]{https://paperjs.org/reference/group/} are used in Paperscript are somewhere between a tree and an array, they can be iterated over and can have subsets. You can add to them using an 'addChildren' method. In this code Groups are used to collect both the values that are generated and the sets of lines drawn for each bike.
- When testing is toggled on bikes will display in a grid rather than on top of each other
- You can visualise a maximum of two bikes overlaid on eachother
- The front most bike will be blue and the second will be grey
- Only one bike will have guidelines (stack, reach, wheelbase, bbdrop, head tube and fork shown as dashed lines) to keep the image from being cluttered
- Guidelines are labled and their values are displayed in millimeters
- If there are not enough values to draw a bike it will not appear and a message will be logged to the console (visible by pressing F12 in most browsers)
- When you see 'b' as a parameter or as an object it is referencing a single set of bike JSON data
- When you see 'i' as a parameter it is the index of indivual bike 'b' in the set of all bikes

## 'config.js'
#### Global vars
This file stores global variables. This is to ease the passing of variables from Paperscript to Javascript. These variables include the colour components used in drawing as well as 3 sets of example bike JSON data.

## 'data-check.js'
#### Checks that the data given is enough to draw a bike
This file contains a large method that is a series of if statements. This is used as a flag to determine whether or not the script should draw a particular bike. This project assumes that fairly clean and complete data is being provided and this data check should be the last line of defense rather than the main method of data validation. It checks if the required values (red boxes in the diagram above) are present and if not attempts to calculate them if not. Again this happens in a certain order and could be extended to allow multiple paths. The 'data-check.js' method is called in 'makeBike(b)' in the main code as a boolean check before continuing onto the calculations and drawing functions for that bike.

## 'interface.js'
#### Example interfaces
This file is included as an example and reference of how you would interact with the script files when integrating this project into your own webpage. It currently creates all of the check box inputs that toggle bikes and testing.

#### Other Files
------
Other files include basic CSS, package files that state the projects dependecy on Paper.js as well as the standard GitHub Project files (LICENSE, README.md, .gitignore).
