﻿// Rover Object Goes Here
// ======================
const rover = {
  direction: "N", //The direction property can contain one of four values: "N", "S", "E", or "W". The rover’s
  x: 0,
  y: 0,
  travelLog: []
};
// ======================

let grid = new Array(10);
let rovers = [];
rover.travelLog.push(rover.x, rover.y, rover.direction); //Travel log of initial position
const compassCW = "NESW"; //Clockwise   //Añadir al fichero principal
const compassACW= "WSEN"; //Anti ClockWise; //Añadir al fichero principal

let maxObstacleNumber = 4;
let maxRoverGenerator = 4;

initGrid();
grid[rover.y][rover.x] = 2; //This number represents our rover. Put our rover on the grid
roverGenerator(maxRoverGenerator);

command(
  prompt(
    "Please introduce a valid command list to move the rover (Allowed commands F (Forward), B (Backward), R(Right) and L(Left)."
  ).toUpperCase()
);

//Travel Log Our Rover and the other rovers
console.log("This is the Travel Log of our Rover");
printTravelLog(rover);
for (let i = 0; i < maxRoverGenerator; i++) {
  console.log(`This is the Travel Log of the Rover ${i + 2}`);
  printTravelLog(rovers[i]);
}

function command(lc) {
  //lc is list of commands
  console.log(`This is the List of commands introduced: ${lc}`);
  for (let i = 0; i < lc.length; i++) {
    if (lc[i] === "R" || lc[i] === "F" || lc[i] === "L" || lc[i] === "B") {
      console.log("");
      console.log("Our Rover say: ");
      movementDecisionOrTurn(lc[i], rover, 2);
      rover.travelLog.push(rover.x, rover.y, rover.direction);
    }
    for (let j = 0; j < maxRoverGenerator; j++) {
      //Movement Rover Generator
      console.log("");
      console.log(`Rover number ${j + 2} say:`);
      movementDecisionOrTurn(movementRovers(), rovers[j], j + 3);
      rovers[j].travelLog.push(rovers[j].x, rovers[j].y, rovers[j].direction);
    }
    console.log(grid);
  }
}
function movementDecisionOrTurn(lc, roverMars, id) {
  switch (lc) {
    case "R":
      turnRover(lc, roverMars);
      break;
    case "L":
      turnRover(lc, roverMars);
      break;
    case "F":
      moveRover(lc, roverMars, id);
      break;
    case "B":
      moveRover(lc, roverMars, id);
      break;
  }
}

function moveRover(forwardNBackward, roverMars, id) {
  let copyX = roverMars.x;
  let copyY = roverMars.y;
 
  switch (roverMars.direction) {
    case "N":
      {
        if (
          (roverMars.y === 0 && forwardNBackward === "F") ||
          (roverMars.y === 9 && forwardNBackward === "B")
        ) {
          {
            console.log("I'm sorry but I can not get out of the grid");
            return false;
          }
        } else if (forwardNBackward === "F") {
          if (iCanMove(roverMars.x, roverMars.y - 1)) {
            roverMars.y--;
          } else {
            return false;
          }
        } else if (forwardNBackward === "B") {
          if (iCanMove(roverMars.x, roverMars.y + 1)) {
            roverMars.y++;
          } else {
            return false;
          }
        }
      }
      break;
    case "E":
      {
        if (
          (roverMars.x === 9 && forwardNBackward === "F") ||
          (roverMars.x === 0 && forwardNBackward === "B")
        ) {
          {
            console.log("I'm sorry but I can not get out of the grid");
            return false;
          }
        } else if (forwardNBackward === "F") {
          if (iCanMove(roverMars.x + 1, roverMars.y)) {
            roverMars.x++;
          } else {
            return false;
          }
        } else if (forwardNBackward === "B") {
          if (iCanMove(roverMars.x - 1, roverMars.y)) {
            roverMars.x--;
          } else {
            return false;
          }
        }
      }
      break;
    case "S":
      {
        if (
          (roverMars.y === 9 && forwardNBackward === "F") ||
          (roverMars.y === 0 && forwardNBackward === "B")
        ) {
          {
            console.log("I'm sorry but I can not get out of the grid");
            return false;
          }
        } else if (forwardNBackward === "F") {
          if (iCanMove(roverMars.x, roverMars.y + 1)) {
            roverMars.y++;
          } else {
            return false;
          }
        } else if (forwardNBackward === "B") {
          if (iCanMove(roverMars.x, roverMars.y - 1)) {
            roverMars.y--;
          } else {
            return false;
          }
        }
      }
      break;
    case "w":
    {
      if (
        (roverMars.x === 0 && forwardNBackward === "F") ||
        (roverMars.x === 9 && forwardNBackward === "B")
      ) {
        {
          console.log("I'm sorry but I can not get out of the grid");
          return false;
        }
      } else if (forwardNBackward === "F") {
        if (iCanMove(roverMars.x - 1, roverMars.y)) {
          roverMars.x--;
        } else {
          return false;
        }
      } else if (forwardNBackward === "B") {
        if (iCanMove(roverMars.x + 1, roverMars.y)) {
          roverMars.x++;
        } else {
          return false;
        }
      }
    }      break;
  }
 
  console.log(`Last position was ${copyX},${copyY}`);
  console.log(`Rover is facing ${roverMars.direction}`);
  console.log(`New position of rover is ${roverMars.x},${roverMars.y}`);
  if (forwardNBackward === "F") {
    moveForward(roverMars);
  } else {
    moveBackward(roverMars);
  }

  //Marks the old position with free mark

  grid[copyY][copyX] = 0; //Left this position; 0 means there aren't nothing in this position

  //Marks the new position with none free mark
  grid[roverMars.y][roverMars.x] = id; //number 2 is de intern name of rover  because others rovers have other number 0 no obstacle 1 a obstacle 2 first rover 3 other rover ....
}
function movementRovers() {
  //The movemments or turns are random
  let movementOrTurn = Math.floor(Math.random() * 2); //Decide Randomly if makes  a turn or movement
  if (movementOrTurn === 0) {
    //With 0 makes a turn
    if (Math.floor(Math.random() * 2) === 0) {
      return "R";
    } else return "L";
  } else {
    //With 1 makes a movement forward or backward
    if (Math.floor(Math.random() * 2) === 0) {
      return "F";
    } else return "B";
  }
}

function turnRover(turn, roverMars) {
  //To move Rover turn de Left or Right;
  if (turn === "R") {
    turnRight(roverMars);
  } else {
    turnLeft(roverMars);
  }
}
function turnLeft(rover) {
  console.log(`Rover is facing ${rover.direction} and turns Left`);
  let index =compassCW.indexOf(rover.direction);
  /*let index;
  let compass;

  if (rover.direction==="W" || rover.direction==="S" ) {compass = compassACW;}
  else{ compass = compassACW;}

  index=compass.indexOf(rover.direction);
*/
  if (index == 0) {
    index = 3;
  } else {
    index--;
  }
  rover.direction = compassCW[index];
  console.log(`Rover now is facing ${rover.direction}`);

  console.log("turnLeft was called!");
}
function turnRight(rover) {
  console.log(`Rover is facing ${rover.direction} and turns Right`);
  let index;
  /*let compass;

  if (rover.direction==="W" || rover.direction==="S" ) {compass = compassCW;}
  else{ compass = compassACW;}*/

  index=compassCW.indexOf(rover.direction);

  if (index == 3) {
    index = 0;
  } else {
    index++;
  }
  rover.direction = compassCW[index];
  console.log(`Rover now is facing ${rover.direction}`);
  console.log("turnRight was called!");
}
function moveForward(rover) {
  console.log("moveForward was called");
}
function moveBackward(rover) {
  console.log("moveBackward was called");
}


function iCanMove(x, y) {  //Añadir al fichero principal
    switch (grid[y][x])
    {
      case 0:{return true}break;//I don't know if is needed this last "break"
      case 1:{console.log(`Sorry I can't move to this position (${x},${y})  because I have found an obstacle`); return false;}break;
      case 2:{console.log(`Sorry I can't move to this position (${x},${y})  because I have found the mars-rover`); return false;}break;
      default:{console.log(`Sorry I can't move to this position (${x},${y})  because I have found the rover number ${grid[y][x]-1}`); return false;}break;
    }
  }
  
function initGrid() {
  //Is ok
  for (var i = 0; i < grid.length; i++) {
    grid[i] = new Array(10);
  }
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[i].length; j++) {
      grid[i][j] = 0;
    }
  }

  obstacleGenerator(maxObstacleNumber); //Numbers of obstacles created ramdomly
}



function obstacleGenerator(number) {
  //Is ok
  let x = 0;
  let y = 0;
  for (let i = 0; i <= number; i++) {
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } while (grid[y][x] > 0);
    grid[y][x] = 1; //This number represent obstacles
  }
}

function roverGenerator(number) {
  //Is ok
  let rgeneratorX;
  let rgeneratorY;
  let rgeneratorDirection;
  for (let i = 0; i < number; i++) {
    do {
      rgeneratorX = Math.floor(Math.random() * 10);
      rgeneratorY = Math.floor(Math.random() * 10);
      rgeneratorDirection = compassCW[Math.floor(Math.random() * 4)];
    } while (grid[rgeneratorY][rgeneratorX] > 0);
    grid[rgeneratorY][rgeneratorX] = i + 3;
    rovers.push({
      x: rgeneratorX,
      y: rgeneratorY,
      direction: rgeneratorDirection,
      travelLog: []
    });
    rovers[i].travelLog.push(rovers[i].x, rovers[i].y, rovers[i].direction);
  }
}

function printTravelLog(roverMars) {
  //Print travel lof of rove mars

  let i = 0;
  while (i < roverMars.travelLog.length) {
    console.log(
      `Direction: ${roverMars.travelLog[i + 2]}, Position: ${
        roverMars.travelLog[i]
      },${roverMars.travelLog[i + 1]}`
    );
    i += 3;
  }
}

function oldNNewPosition(copyX, copyY, roverMars) {}
