// Create a Paper.js Path to draw a line into it:
let path = new Path();

// Give the stroke a color
path.strokeColor = 'black';
let start = new Point(100, 100);

// Move to start and draw a line from there
path.moveTo(start);

// Note the plus operator on Point objects.
path.lineTo(start + [100, -50]);