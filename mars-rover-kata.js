// Global Variables
// ===============================================================
let gridWidth = 8
let gridHeight = 8
let emptyGridSpace = "[   ]"
let objectiveGridSpace = "[|||]"



// Console Layouts
// Create console.log lines, empty spaces or any repition
// Width is automatically calculated
// ===============================================================
function gridLayout(type) {
	console.log(type.repeat(gridWidth * 7.7))
}



// Grid Creation
// Create the grid based on the grid size specified in gridSize
// ===============================================================
let grid = []

for (let x = 0; x < gridWidth; x++) {
	grid[x] = []
	for (let y = 0; y < gridHeight; y++) {
		grid[x][y] = emptyGridSpace
	}
}



// Obstacle and Rover Generator
// ===============================================================
function randomNumber(max) {
	return Math.floor(Math.random() * (max - 0.001))
}

function genSpawnPoint() {
	return [randomNumber(gridWidth), randomNumber(gridHeight)]
}

let obstacles = {}
let rovers = {
	rover0: {
		name: "WALL-E",
		nameInitial: "WE",
		direction: "N",
		x: randomNumber(gridWidth),
		y: randomNumber(gridHeight),
		travelLog: {
			x: [],
			y: []
		},
		commands: ""
	}
}


function generate(item, percentage) {
	let i = 0
	while (i <= (gridWidth * gridHeight) * (percentage / 100) + 1) {
		let [x, y] = genSpawnPoint()

		if (grid[x][y] === emptyGridSpace) {
			switch (item) {
				case "obstacle":
					obstacles["obs" + [i]] = {
						"x": x,
						"y": y
					}
					grid[x][y] = objectiveGridSpace
					break;
				case "rovers":
					rovers["rover" + [i + 1]] = {
						"name": "HAL900" + [i],
						"nameInitial": "H" + [i],
						"direction": "N",
						"x": x,
						"y": y,
						"travelLog": {
							"x": [],
							"y": []
						},
						"commands": []
					}
					faceNorth(rovers["rover" + [i]])
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
	grid[rover.y][rover.x] = "[" + rover.nameInitial + "^]"
}

function faceWest(rover) {
	rover.direction = "W"
	grid[rover.y][rover.x] = "[" + rover.nameInitial + "<]"
}

function faceSouth(rover) {
	rover.direction = "S"
	grid[rover.y][rover.x] = "[" + rover.nameInitial + "v]"
}

function faceEast(rover) {
	rover.direction = "E"
	grid[rover.y][rover.x] = "[" + rover.nameInitial + ">]"
}



// Turning Commands
// ===============================================================

function turnLeft(rover) {
	console.log(rover.name + " was commanded to turn left.");
	gridLayout(" ")

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

function turnRight(rover) {
	console.log(rover.name + " was commanded to turn right.");
	gridLayout(" ")

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

function moveRover(direction, rover, roverX = 0, roverY = 0) {

	let xx = rover.x + roverX
	let yy = rover.y + roverY

	if (xx < 0 || xx >= gridWidth || yy < 0 || yy >= gridHeight) {
		console.log(rover.name + " will fall off the grid. Movement command not processed.")
		gridLayout("_")
	} else if (grid[yy][xx] !== emptyGridSpace) {
		console.log(`${rover.name}'s path not clear. Movement command not processed.`)
		gridLayout("_")
	} else {
		grid[rover.y][rover.x] = emptyGridSpace
		rover.x += roverX
		rover.y += roverY
		switch (direction) {
			case "up":
				grid[rover.y][rover.x] = "[" + rover.nameInitial + "^]"
				break;
			case "right":
				grid[rover.y][rover.x] = "[" + rover.nameInitial + ">]"
				break;
			case "down":
				grid[rover.y][rover.x] = "[" + rover.nameInitial + "v]"
				break;
			case "left":
				grid[rover.y][rover.x] = "[" + rover.nameInitial + "<]"
				break;
		}
		rover.travelLog.x.push(rover.x)
		rover.travelLog.y.push(rover.y)
		printGrid()
	}
}

function moveForward(rover) {
	console.log(`${rover.name} was commanded to move forward.`);

	if (rover.direction === "N") {
		moveRover("up", rover, 0, -1)
	} else if (rover.direction === "W") {
		moveRover("left", rover, -1, 0)
	} else if (rover.direction === "S") {
		moveRover("down", rover, 0, 1)
	} else if (rover.direction === "E") {
		moveRover("right", rover, 1, 0)
	}

	// console.log("[DEBUG --- " + rover.name + "] positions: x ="+ rovers.rover0.x + ",  " + "y =" + rovers.rover0.y + ",  direction = " + rovers.rover0.direction )
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

	// console.log("[DEBUG --- " + rover.name + "] positions: x ="+ rovers.rover0.x + ",  " + "y =" + rovers.rover0.y + ",  direction = " + rovers.rover0.direction )

}



// Create a function that will print the grid cleanly
// ===============================================================

function printGrid() {
	for (let i = 0; i < grid.length; i++) {
		console.log(grid[i].join("   "))
	}
	gridLayout("_")
}


// Function to place the rovers on the grid initially
// ===============================================================

function placeRover(rover) {
	switch (rover.direction) {
		case "N":
			faceNorth(rover)
			break;
		case "W":
			faceWest(rover)
			break;
		case "S":
			faceSouth(rover)
			break;
		case "E":
			faceEast(rover)
			break;
	}
}



// Command Function
// ===============================================================
let validOrders = ['f', 'b', 'l', 'r']


// this just generates a random command list based on submitted player commands for WALLE
function generateCommandsList(playerCommands) {
	return playerCommands.split('').map(() => validOrders[Math.floor((Math.random() * 100)) % validOrders.length])
}


function commands(orders) {
	rovers.rover0.commands = orders.split("")

	// TODO: Use Array.prototype functions instead of for loops.
	for (let i = 1; i < Object.keys(rovers).length; i++) {
		rovers["rover" + [i]].commands = generateCommandsList(orders)
	}

	// TODO: Use Array.prototype functions instead of for loops.
	for (let i = 0; i < orders.length; i++) {
		for (let i = 0; i < Object.keys(rovers).length; i++) {
			switch (rovers["rover" + [i]].commands[i]) {
				case "l":
					turnLeft(rovers["rover" + [i]])
					break;
				case "r":
					turnRight(rovers["rover" + [i]])
					break;
				case "f":
					moveForward(rovers["rover" + [i]])
					break;
				case "b":
					moveBackwards(rovers["rover" + [i]])
					break;
			}
		}
	}


}



// Print the rover travel log
// ===============================================================
function listTravellog(rover) {
	for (let i = 0; i < rover.travelLog.x.length; i++) {
		console.log(`${i+1} - x: ${rover.travelLog.x[i]}, y: ${rover.travelLog.y[i]}`)
	}
}


function main() {

	// Generate rovers and obstacles
	// ===============================================================
	// place our main rover
	placeRover(rovers.rover0)
	generate("obstacle", 10)
	generate("rovers", 10)

	//console.log(rovers)
	//console.log(obstacles)


	// Print the intial grid to show what the grid starts with
	// ===============================================================
	gridLayout(" ")
	console.log("-  Starting Initial Grid")
	console.log(`-  ${rovers.rover0.name} Rover, ${Object.keys(rovers).length - 1} HAL Rovers, ${Object.keys(obstacles).length} Obstacles Generated`)
	gridLayout("_")
	printGrid()


	// User movemwnr commands below
	// ===============================================================
	gridLayout(" ")
	console.log("-  Begin Movement Commands Below")
	gridLayout("_")

	// add commands below.
	commands("frflfrb")


	// Print the main rover's travel log
	// ===============================================================
	gridLayout(" ")
	console.log(`-  ${rovers.rover0.name} Travel Log`)
	gridLayout("_")
	listTravellog(rovers.rover0);
}

main()