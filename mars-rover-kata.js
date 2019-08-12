// Global Variables
// ===============================================================
let gridWidth = 8
let gridHeight = 8
let emptyGridSpace = "[   ]"
let objectiveGridSpace = "[|||]"



// Console Layouts
// Create console.log lines, empty spaces or any repition
// ===============================================================
function gridLayout(type) {
	console.log(type.repeat(gridWidth * 7.7))
}



// Grid Creation
// ===============================================================
let grid = []

for (let x = 0; x < gridWidth; x++) {
	grid[x] = []
	for (let y = 0; y < gridHeight; y++) {
		grid[x][y] = emptyGridSpace
	}
}



// Compass
// ===============================================================

const N = 'n'
const E = 'e'
const W = 'w'
const S = 's'

let compass = {
	n: "^",
	w: "<",
	s: "v",
	e: ">"
}

function direction(rover, direction) {
	rover.direction = direction;
	grid[rover.y][rover.x] = "[" + rover.nameInitial + compass[direction] + "]"
}



// Obstacle and Rover Generator
// ===============================================================
function randomNumber(max) {
	return Math.floor(Math.random() * (max - 0.001))
}

function genSpawnPoint() {
	return [randomNumber(gridWidth), randomNumber(gridHeight)]
}

const OBSTACLES = {}

const ROVERS = {
	rover0: {
		name: "WALL-E",
		nameInitial: "WE",
		direction: N,
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
					OBSTACLES["obs" + [i]] = {
						"x": x,
						"y": y
					}
					grid[x][y] = objectiveGridSpace
					break;
				case "rovers":
					ROVERS["rover" + [i + 1]] = {
						"name": "HAL900" + [i],
						"nameInitial": "H" + [i],
						"direction": N,
						"x": x,
						"y": y,
						"travelLog": {
							"x": [],
							"y": []
						},
						"commands": []
					}
					direction(ROVERS["rover" + [i]], N)
					break;
			}
			i++
		}
	}
}


// Turning Commands
// ===============================================================

function turnLeft(rover) {
	console.log(rover.name + " was commanded to turn left.");
	gridLayout(" ")

	switch (rover.direction) {
		case N:
			direction(rover, W)
			break;
		case W:
			direction(rover, S)
			break;
		case S:
			direction(rover, E)
			break;
		case E:
			direction(rover, N)
			break;
	}
}

function turnRight(rover) {
	console.log(rover.name + " was commanded to turn right.");
	gridLayout(" ")

	switch (rover.direction) {
		case N:
			direction(rover, E)
			break;
		case W:
			direction(rover, N)
			break;
		case S:
			direction(rover, W)
			break;
		case E:
			direction(rover, S)
			break;
	}
}



// Movenment Directions
// ===============================================================

function moveRover(rover, roverX, roverY) {

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
		grid[rover.y][rover.x] = `[${rover.nameInitial}${compass[rover.direction]}]`
		rover.travelLog.x.push(rover.x)
		rover.travelLog.y.push(rover.y)
	}
}

moveLookup = {
	'n': [0,-1],
	'w': [-1, 0],
	's': [0, 1],
	'e': [1, 0]
}

function moveForward(rover) {
	console.log(`${rover.name} was commanded to move forward.`);
	moveRover(rover, moveLookup[rover.direction][0], moveLookup[rover.direction][1])
}

function moveBackwards(rover) {
	console.log(rover.name + " was commanded to move backward.")
	moveRover(rover, moveLookup[rover.direction][0]*-1, moveLookup[rover.direction][1]*-1)
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
		case N:
			direction(rover, N)
			break;
		case W:
			direction(rover, W)
			break;
		case S:
			direction(rover, S)
			break;
		case E:
			direction(rover, E)
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
	ROVERS.rover0.commands = orders.split("")

	// TODO: Use Array.prototype functions instead of for loops.
	for (let i = 1; i < Object.keys(ROVERS).length; i++) {
		ROVERS["rover" + [i]].commands = generateCommandsList(orders)
	}

	// TODO: Use Array.prototype functions instead of for loops.
	for (let i = 0; i < orders.length; i++) {
		for (let i = 0; i < Object.keys(ROVERS).length; i++) {
			switch (ROVERS["rover" + [i]].commands[i]) {
				case "l":
					turnLeft(ROVERS["rover" + [i]])
					break;
				case "r":
					turnRight(ROVERS["rover" + [i]])
					break;
				case "f":
					moveForward(ROVERS["rover" + [i]])
					break;
				case "b":
					moveBackwards(ROVERS["rover" + [i]])
					break;
			}
			printGrid()
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
	placeRover(ROVERS.rover0)
	generate("obstacle", 10)
	generate("rovers", 10)


	// Print the intial grid to show what the grid starts with
	// ===============================================================
	gridLayout(" ")
	console.log("-  Starting Initial Grid")
	console.log(`-  ${ROVERS.rover0.name} Rover, ${Object.keys(ROVERS).length - 1} HAL Rovers, ${Object.keys(OBSTACLES).length} Obstacles Generated`)
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
	console.log(`-  ${ROVERS.rover0.name} Travel Log`)
	gridLayout("_")
	listTravellog(ROVERS.rover0);
}

main()