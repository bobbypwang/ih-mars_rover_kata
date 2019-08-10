// Global Variables
// ===============================================================
let gridWidth = 10
let gridHeight = 10
let emptyGridSpace = "[       ]"

// Optimized for playcode.io
let objectiveGridSpace = "[llllllll]"
let roverGridSpace = "[ -R- ]"

// Optimized for codepen.io
// let objectiveGridSpace = "[|||||||]"
// let roverGridSpace = "[  -R-  ]"



// Console Layouts
// ===============================================================

// Displays a horizontal line
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

// Displays an empty line
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
// Create the grid based on the grid size specified in gridSize
// ===============================================================
let grid = [];

for (let i = 0; i < gridHeight; i++) {
	grid[i] = []
	for (let j = 0; j < gridWidth; j++) {
		grid[i][j] = emptyGridSpace
	}
}


// Obstacle and Rover Generator
// ===============================================================
function randomNum(axis) {
	switch (axis) {
	case "x" :
		return Math.floor(Math.random() * Math.floor(gridWidth));
	break;
	case "y" :
		return Math.floor(Math.random() * Math.floor(gridHeight));
	}
}

let obstacles = {}
let rovers = {
	Walle : {
		name: "Rover WALL-E",
		direction: "N",
		x: randomNum("x"),
		y: randomNum("y"),
		travelLog: {
			x : [],
			y : []
		}
	}
}

function generate(item, percentage) {
	let i = 0
	while (i <= (gridWidth * gridHeight) * (percentage / 100)) {
		let x = randomNum("x")
		let y = randomNum("y")
		if (grid[x][y] === emptyGridSpace) {
			switch (item) {
				case "obstacle" :
					obstacles[ "obs" + [i]] = {"x": x, "y": y}
					grid[x][y] = objectiveGridSpace
				break;
				case "rovers" : 
					rovers[ "rover" + [i]] = {"x": x, "y": y}
					grid[x][y] = roverGridSpace
				break;
			}
			i++
		}
	}
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
  console.log(rover.name + " was commanded to turn left.");

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
	printGrid()
}

function turnRight(rover){
  console.log(rover.name + " was commanded to turn right.");

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
	printGrid()
}



// Movenment Directions
// ===============================================================

function moveRover(direction, rover, roverX=0, roverY=0) {

	let xx = rover.x + roverX
	let yy = rover.y + roverY

		if (xx < 0 || xx >= gridWidth || yy < 0 || yy >= gridHeight) {
			console.log (rover.name + " will fall off the grid. Movement command not processed.")
			consoleHr()
		} else if (grid[yy][xx] !== emptyGridSpace) {
			console.log (`${rover.name}'s path not clear. Movement command not processed.`)
		} else {
			grid[rover.y][rover.x] = emptyGridSpace
			rover.x += roverX
			rover.y += roverY
			switch (direction) {
			case "up" :
				grid[rover.y][rover.x] = "[   ^  ]"
				break;
			case "right" :
				grid[rover.y][rover.x] = "[   >  ]"
				break;
			case "down" :
				grid[rover.y][rover.x] = "[   v  ]"
				break;
			case "left" :
				grid[rover.y][rover.x] = "[   <  ]"
				break;
			}
			rover.travelLog.x.push(rover.x)
			rover.travelLog.y.push(rover.y)
			printGrid()
		}
}

function moveForward(rover) {
  console.log(rover.name + " was commanded to move forward.")

	if (rover.direction === "N") {
		moveRover("up", rover, 0, -1)
	} else if (rover.direction === "W") {
		moveRover("left", rover, -1, 0)
	} else if (rover.direction === "S") {
		moveRover("down", rover, 0, 1)
	} else if (rover.direction === "E") {
		moveRover("right", rover, 1, 0)
	}

	// console.log("[DEBUG --- " + rover.name + "] positions: x ="+ rovers.Walle.x + ",  " + "y =" + rovers.Walle.y + ",  direction = " + rovers.Walle.direction )
}

function moveBackwards(rover) {
  console.log(rover.name + " was commanded to move backward.")

	if (rover.direction === "N") {
		moveRover("up", rover, 0, 1)
	} else if (rover.direction === "W") {
		moveRover("left", rover, 1, 0)
	} else if (rover.direction === "S") {
		moveRover("down", rover, 0, -1)
	} else if (rover.direction === "E") {
		moveRover("right", rover, -1, 0)
	}

	// console.log("[DEBUG --- " + rover.name + "] positions: x ="+ rovers.Walle.x + ",  " + "y =" + rovers.Walle.y + ",  direction = " + rovers.Walle.direction )

}



// Create a function that will print the grid cleanly
// ===============================================================

function printGrid() {
	for (let i = 0; i < grid.length; i++) {
		console.log(grid[i].join("   "))
	}
	consoleHr()
}


// Function to place the rovers on the grid initially
// ===============================================================

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
				case "l":
					turnLeft(rover)
					break;
				case "r":
					turnRight(rover)
					break;
				case "f":
					moveForward(rover)
					break;
				case "b":
					moveBackwards(rover)
					break;
			}
		}
}



// Print the rover travel log
// ===============================================================
function listTravellog(rover) {
	for (let i=0; i < rover.travelLog.x.length; i++) {
		console.log(`${i+1} - x: ${rover.travelLog.x[i]}, y: ${rover.travelLog.y[i]}`)
	}
}



// Generate rovers and obstacles
// ===============================================================
// place our main rover
placeRover(rovers.Walle)
generate("obstacle", 10)
generate("rovers", 10)


// Print the intial grid to show what the grid starts with
// ===============================================================
console.log("- - -   Starting Initial Grid")
consoleHr()
printGrid();


// User movemwnr commands below
// ===============================================================
consoleSpace()
console.log("- - -   Begin Movement Commands Below")
consoleHr()

command(rovers.Walle, "frrflb")
//command(rovers.Walle, "fbrrrrllflf")
//command(rovers.Walle, "rffbrffblfrfbf")


// Print the main rover's travel log
// ===============================================================
consoleSpace(1)
console.log(`- - -   ${rovers.Walle.name} Travel Log`)
consoleHr()
listTravellog(rovers.Walle);

// playcode.io's console gets cut off at the bottom, padding makes it visible
consoleSpace(1)
console.log(" ")