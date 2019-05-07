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



for (var i = 0; i < grid.length; i++) {
  grid[i] = new Array(10);
}

for (var i = 0; i < grid.length; i++) {
  for (var j = 0; j < grid[i].length; j++) {
    grid[i][j] = 0;
  }
}

obstacle (4);//Numbers of obstacles created ramdomly


rover.travelLog.push(rover.x, rover.y, rover.direction);

command(
  prompt(
    "Please introduce a valid command list to move the rover (Allowed commands F (Forward), B (Backward), R(Right) and L(Left)."
  ).toUpperCase()
);

function command(lc) {
  //lc is list of commands
  console.log(`This is the List of commands introduced: ${lc}`);
  for (var i = 0; i < lc.length; i++) {

    if (lc[i] ==="R" || lc[i] ==="F" || lc[i] ==="L" || lc[i] ==="B"){
    switch (lc[i]) {
      case "R":
        turnRover(lc[i]);
        break;
      case "L":
        turnRover(lc[i]);
        break;
      case "F":
        moveRover(lc[i]);
        break;
      case "B":
        moveRover(lc[i]);
        break;
    }
    rover.travelLog.push(rover.x, rover.y, rover.direction);
    console.log(rover.travelLog);
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
function moveRover(forwardNBackward) {
  let copyX = rover.x;
  let copyY = rover.y;
  console.log(forwardNBackward);
  switch (rover.direction) {
    case "N":
      {
        if (
          (rover.y === 0 && forwardNBackward === "F") ||
          (rover.y === 9 && forwardNBackward === "B")
        ) {
          {
            console.log("I'm sorry but I can not get out of the grid");
            return false;
          }
        } else if (forwardNBackward === "F") {
          if (iCanMove(rover.x, rover.y - 1)) {
            rover.y--;
            console.log(`New position of rover is ${rover.x},${rover.y}`);
          } else {
            return false;
          }
        } else if (forwardNBackward === "B") {
          if (iCanMove(rover.x, rover.y + 1)) {
            rover.y++;
            console.log(`New position of rover is ${rover.x},${rover.y}`);
          } else {
            return false;
          }
        }
      }
      break;
    case "E":
      {
        if (
          (rover.x === 9 && forwardNBackward === "F") ||
          (rover.x === 0 && forwardNBackward === "B")
        ) {
          {
            console.log("I'm sorry but I can not get out of the grid");
            return false;
          }
        } else if (forwardNBackward === "F") {
          if (iCanMove(rover.x + 1, rover.y)) {
            rover.x++;
            console.log(`New position of rover is ${rover.x},${rover.y}`);
          } else {
            return false;
          }
        } else if (forwardNBackward === "B") {
          if (iCanMove(rover.x - 1, rover.y)) {
            rover.x--;
            console.log(`New position of rover is ${rover.x},${rover.y}`);
          } else {
            return false;
          }
        }
      }
      break;
    case "S":
      {
        if (
          (rover.y === 9 && forwardNBackward === "F") ||
          (rover.y === 0 && forwardNBackward === "B")
        ) {
          {
            console.log("I'm sorry but I can not get out of the grid");
            return false;
          }
        } else if (forwardNBackward === "F") {
          if (iCanMove(rover.x, rover.y + 1)) {
            rover.y++;
            console.log(`New position of rover is ${rover.x},${rover.y}`);
          } else {
            return false;
          }
        } else if (forwardNBackward === "B") {
          if (iCanMove(rover.x, rover.y - 1)) {
            rover.y--;
            console.log(`New position of rover is ${rover.x},${rover.y}`);
          } else {
            return false;
          }
        }
      }
      break;
    case "w":
      {
        if (
          (rover.x === 0 && forwardNBackward === "F") ||
          (rover.x === 9 && forwardNBackward === "B")
        ) {
          {
            console.log("I'm sorry but I can not get out of the grid");
            return false;
          }
        } else if (forwardNBackward === "F") {
          if (iCanMove(rover.x - 1, rover.y)) {
            rover.x--;
            console.log(`New position of rover is ${rover.x},${rover.y}`);
          } else {
            return false;
          }
        } else if (forwardNBackward === "B") {
          if (iCanMove(rover.x + 1, rover.y)) {
            rover.x++;
            console.log(`New position of rover is ${rover.x},${rover.y}`);
          } else {
            return false;
          }
        }
      }
      break;
  }
  
  grid[copyX][copyY] = 0; //Left this position; 0 means there aren't nothing in this position
  grid[rover.y][rover.x] = 2; //number 2 is de intern name of rover  because others rovers have other number 0 no obstacle 1 a obstacle 2 first rover 3 other rover ....

  if (forwardNBackward === "F") {
    moveForward(rover);
  } else {
    moveBackward(rover);
  }
}
function turnLeft(rover) {
  console.log(`Rover is facing ${rover.direction} and turns Left`);
  let index = compass.indexOf(rover.direction);

  if (index == 0) {
    index = 3;
  } else {
    index--;
  }
  rover.direction = compass[index];
  console.log(`Rover now is facing ${rover.direction}`);
  
  console.log("turnLeft was called!");
}

function turnRight(rover) {
  console.log(`Rover is facing ${rover.direction} and turns Right`);
  let index = compass.indexOf(rover.direction);

  if (index == 3) {
    index = 0;
  } else {
    index++;
  }
  rover.direction = compass[index];
  console.log(`Rover now is facing ${rover.direction}`);
  console.log("turnRight was called!");
}

function moveForward(rover) {
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

function obstacleGenerator(number)
{
  let x=0;
  let y=0;
  grid[x][y]=2; //Number represents our rover
  for (var i=0; i<number.length;i++){
    while (grid[x][y]>0){
    x=Math.floor (Math.random()*10);
    y=Math.floor (Math.random()*10);
    }
    grid[x][y]=1;
  }
}