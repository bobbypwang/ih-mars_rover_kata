// Global Variables
// ===============================================================
let gridWidth = 10
let gridHeight = 10


// Console Layouts
// ===============================================================

// line across
function consoleHr(x) {
	const a = "_".repeat(gridWidth*7.9)
	if ( x > 1 ) {
		for (i=0;i <= x;i++) {
			console.log(a)
		} 
	} else {
		console.log(a)
	}
}

// empty space
function consoleSpace(x) {
	const a = " ".repeat(120)
	if ( x > 1 ) {
		for (i=0;i <= x;i++) {
			console.log(a)
		} 
	} else {
		console.log(a)
	}
}

// Grid Creation
// ===============================================================

// Create gridSize function to accept custom grid sizes
// defaults to 10 as set in global variables
function gridSize(width, height) {
	gridWidth = width
	gridHeight = height
}

// Create the grid based on the grid size specified in gridSize
// ===============================================================

let grid = [];

for (let i = 0; i < gridHeight; i++) {
	grid[i] = []
	for (let j = 0; j < gridWidth; j++) {
		grid[i][j] = "[       ]"
	}
}

// Rovers 
// Create rovers here
// ===============================================================

let roverWalle = {
	name: "Rover WALL-E",
	direction: "E",
	x: 4,
	y: 4,
	travelLog: []
}

function clapTraps(percentage) {
	
}


// Obtacle Generator
// ===============================================================

function obstables(percentage) {

}




// Cardinal Directions
// ===============================================================

function faceNorth(rover) {
	rover.direction = "N"
	grid[rover.y][rover.x] = "[  ^  ]"
}

function faceWest(rover) {
	rover.direction = "W"
	grid[rover.y][rover.x] = "[  <  ]"
}

function faceSouth(rover) {
	rover.direction = "S"
	grid[rover.y][rover.x] = "[   v  ]"
}

function faceEast(rover) {
	rover.direction = "E"
	grid[rover.y][rover.x] = "[  >  ]"
}



// Turning Commands
// ===============================================================

function turnLeft(rover){
  console.log(rover.name + " was commanded to turn left");

		switch (rover.direction) {
		case "N":
			faceWest(rover)
			break;
		case "W":
			faceSouth(rover)
			break;
		case "S":
			faceEast(rover)
			break;
		case "E":
			faceNorth(rover)
			break;
	}
	console.log(rover.name + " has turned left");
	printGrid()
}

function turnRight(rover){
  console.log(rover.name + " was commanded to turn right");

		switch (rover.direction) {
		case "N":
			faceEast(rover)
			break;
		case "W":
			faceNorth(rover)
			break;
		case "S":
			faceWest(rover)
			break;
		case "E":
			faceSouth(rover)
			break;
	}
	console.log(rover.name + " has turned right");
	printGrid()
}



// Movenment Directions
// ===============================================================

function moveRover(direction, rover, roverX=0, roverY=0) {

		if (rover.x + roverX < 0 || rover.x + roverX >= gridWidth || rover.y + roverY < 0 || rover.y + roverY >= gridHeight) {
			console.log (rover.name + " is at the edge! Unable to move foward")
			consoleHr()
		} else {
			grid[rover.y][rover.x] = "[       ]"
			rover.x += roverX
			rover.y += roverY

			switch (direction) {
			case "up" :
				console.log(rover.name + " has moved up")
				grid[rover.y][rover.x] = "[   ^  ]"
				break;
			case "right" :
				console.log(rover.name + " has moved right")
				grid[rover.y][rover.x] = "[   >  ]"
				break;
			case "down" :
				console.log(rover.name + " has moved down")
				grid[rover.y][rover.x] = "[   v  ]"
				break;
			case "left" :
				console.log(rover.name + " has moved left")
				grid[rover.y][rover.x] = "[   <  ]"
				break;
			}
			rover.travelLog.push(`${rover.x}, ${rover.y}`)
			printGrid()
		}
}

function moveForward(rover) {
  console.log(rover.name + " was commanded to move forward")

	if (rover.direction === "N") {
		moveRover("up", rover, 0, -1)
	} else if (rover.direction === "W") {
		moveRover("left", rover, -1, 0)
	} else if (rover.direction === "S") {
		moveRover("down", rover, 0, 1)
	} else if (rover.direction === "E") {
		moveRover("right", rover, 1, 0)
	}

	// console.log("[DEBUG --- " + rover.name + "] positions: x ="+ roverWalle.x + ",  " + "y =" + roverWalle.y + ",  direction = " + roverWalle.direction )
}

function moveBackwards(rover) {
  console.log(rover.name + " was commanded to move backward")

	if (rover.direction === "N") {
		moveRover("up", rover, 0, 1)
	} else if (rover.direction === "W") {
		moveRover("left", rover, 1, 0)
	} else if (rover.direction === "S") {
		moveRover("down", rover, 0, -1)
	} else if (rover.direction === "E") {
		moveRover("right", rover, -1, 0)
	}

	console.log("[DEBUG --- " + rover.name + "] positions: x ="+ roverWalle.x + ",  " + "y =" + roverWalle.y + ",  direction = " + roverWalle.direction )

}



// Create a function that will print the grid cleanly
// ===============================================================

function printGrid() {
	for (let i = 0; i < grid.length; i++) {
		console.log(grid[i].join("   "))
	}
	consoleHr()
	consoleSpace()
}



// Function to place the rovers on the grid initially
function placeRover(rover) {
	switch (rover.direction) {
		case "N" :
			faceNorth(rover)
			break;
		case "W" :
			faceWest(rover)
			break;
		case "S" :
			faceSouth(rover)
			break;
		case "E" :
			faceEast(rover)
			break;
	}
}




// Command Function
// ===============================================================

function command(rover, orders) {

		for (let i = 0; i < orders.length; i++) {
			let order = orders[i];
			switch (order) {
				case "l": // move left
					turnLeft(rover)
					break;
				case "r": // move right
					turnRight(rover)
					break;
				case "f": // move foward
					moveForward(rover)
					break;
				case "b": // move backwards
					moveBackwards(rover)
					break;
			}
		}
}



// Print the rover travel log
// ===============================================================
function listTravellog(rover) {
	for (let i=0; i < rover.travelLog.length; i++) {
		console.log(rover.travelLog[i])
	}
}

// Print the intial grid to show what the grid starts with
// ===============================================================

/*
console.log("- - -   Starting Initial Grid")
consoleHr()
printGrid();
*/

// User commands below
// ===============================================================
console.log("- - -   Begin Movement Commands Below")
consoleHr()

// place our main rover
placeRover(roverWalle)

// generate obstacles

// generate additional rovers


command(roverWalle, "frfb")
//command(roverWalle, "fbrrrrllflf")
//command(roverWalle, "rffbrffblfrfbf")

consoleSpace(2)
consoleHr()
console.log("- - -   Travel Log")
consoleHr()
listTravellog(roverWalle);