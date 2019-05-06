// Rover Object Goes Here
// ======================
const rover = {
  direction: "N", //The direction property can contain one of four values: "N", "S", "E", or "W". The rover’s
  x: 0,
  y: 0,
  travelLog: []
};
// ======================

let grid = new Array(10);
const compass = "NESW"; //Clockwise

//Iniatializacion grid

for (var i = 0; i < grid.length; i++) {
  grid[i] = new Array(10);
}

for (var i = 0; i < grid.length; i++) {
  for (var j = 0; j < grid[i].length; j++) {
    grid[i][j] = 0;
  }
}
//grid[0][1] = 1;
//grid[1][0] = 1;

command(
  prompt(
    "Please introduce a valid command list to move the rover (Allowed commands F (Forward), B (Backward), R(Right) and L(Left)."
  ).toUpperCase()
);

function command(lc) {
  //lc is list of commands
  console.log(`This is the List of commands introduce: ${lc}`);
  for (var l = 0; l < command.length; l++) {
    switch (command[l]) {
      case "R" || "L":
        turnRover();
        break;
      case "F" || "B":
        moveForward(command[l]);
        break;
    }
  }
}

function turnRover(turn) {
  //To move Rover turn de Left or Right;
  if (turn === "R") {
    turnRight(rover);
  } else {
    turnLeft(rover);
  }
}
function moverover(avanceNBackward) {
  //to make de rover move forward or backward
  if (avanceNBackward === "F") {
    moveForward(rover);
  } else {
    moveBackward(rover);
  }
}
function turnLeft(rover) {
  let index = compass.indexOf(rover.direction);

  if (index == 0) {
    index = 3;
  } else {
    index--;
  }
  rover.direction = compass[index];

  console.log("turnLeft was called!");
  console.log(`New direcction is ${rover.direction}`);
}

function turnRight(rover) {
  console.log(rover.direction);
  let index = compass.indexOf(rover.direction);

  if (index == 3) {
    index = 0;
  } else {
    index++;
  }
  rover.direction = compass[index];
  console.log("turnRight was called!");
  console.log(`New direcction is ${rover.direction}`);
}

function moveForward(rover) {
  switch (rover.direction) {
    case "N":
      {
        if (rover.y == 0) {
          console.log("I'm sorry but I can not get out of the grid");
          return false;
        } else if (iCanMove(rover.x, rover.y - 1)) {
          rover.y--;
          console.log(`New position of rover is ${rover.x},${rover.y}`);
        } else {
          return false;
        }
      }
      break;
    case "E":
      {
        if (rover.x == 9) {
          console.log("I'm sorry but I can not get out of the grid");
          return false;
        } else if (iCanMove(rover.x + 1, rover.y)) {
          rover.x++;
          console.log(`New position of rover is ${rover.x},${rover.y}`);
        } else {
          return false;
        }
      }
      break;

    case "S":
      {
        if (rover.y == 9) {
          console.log("I'm sorry but I can not get out of the grid");
          return false;
        } else if (iCanMove(rover.x, rover.y + 1)) {
          rover.y++;
          console.log(`New position of rover is ${rover.x},${rover.y}`);
        } else {
          return false;
        }
      }
      break;

    case "W":
      {
        if (rover.x == 0) {
          console.log("I'm sorry but I can not get out of the grid");
          return false;
        } else if (iCanMove(rover.x - 1, rover.y)) {
          rover.x--;
          console.log(`New position of rover is ${rover.x},${rover.y}`);
        } else {
          return false;
        }
      }
      break;
  }
  rover.travelLog.push(rover.x, rover.y, rover.direction);
  grid[rover.y][rover.x] = 2; //number 2 is de intern name of rover  because others rovers have other number 0 no obstacle 1 a obstacle 2 first rover 3 other rover ....
  console.log(rover.travelLog);
  console.log("moveForward was called");
}

function moveBackward(rover) {
  console.log("moveBackward was called");
}

function iCanMove(x, y) {
  if (grid[y][x] >= 1) {
    console.log(
      `Sorry I can not move to next position (${y},${x}) there are an obstacle or other rover!!`
    );
    return false;
  } else return true;
}
