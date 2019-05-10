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
const compassCW = "NESW"; //Clockwise   
let maxObstacleNumber = 4;
let maxRoverGenerator = 4;

initGrid();
grid[rover.y][rover.x] = 2; //This number represents our rover. Put our rover on the grid

console.log (`Our Rover starts at the position ${rover.x},${rover.y} and facing to ${rover.direction}`);
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
      
      console.log("\nOur Rover say: ");
      movementDecisionOrTurn(lc[i], rover, 2);
      rover.travelLog.push(rover.x, rover.y, rover.direction);
    }
    for (let j = 0; j < maxRoverGenerator; j++) {
      //Movement Rover Generator
     
      console.log(`\nRover number ${j + 2} say:`);
      movementDecisionOrTurn(movementRovers(), rovers[j], j + 3);
      rovers[j].travelLog.push(rovers[j].x, rovers[j].y, rovers[j].direction);
    }
  
  }
}
function movementDecisionOrTurn(lc, roverMars, id) {
let canMove=false;
let copyX = roverMars.x; //make a copy of last position.
let copyY = roverMars.y;
console.log (`My position now is ${roverMars.x},${roverMars.y}.`)
  switch (lc) {
    case "R":
      turnRover(lc, roverMars);
      break;
    case "L":
      turnRover(lc, roverMars);
      break;
    case "F":canMove=moveForward(roverMars);
      break;
    case "B":canMove=moveBackward(roverMars);
      break;
  }
  if (canMove){
    console.log(`Rover is facing ${roverMars.direction}`);
    console.log(`New position of rover is ${roverMars.x},${roverMars.y}`);
    grid[copyY][copyX] = 0; //Left this position; 0 means there aren't nothing in this position

    //Marks the new position with none free mark
    grid[roverMars.y][roverMars.x] = id; //number 2 is de intern name of our rover  because others rovers have other number 0 no obstacle 1 a obstacle 2 first rover 3 other rover ....
  }
}
function moveForward(rover) {

 if (moveRover(rover,"F")) {
   switch (rover.direction){
     case "N":{rover.y--}break;
     case "S":{rover.y++}break;
     case "E":{rover.x++}break;
     case "W":{rover.x--}break;
   }

   console.log("moveForward was called");
   return true;
 }

else return false;
}
function moveBackward(rover) {
  let copyX = rover.x; //make a copy of last position.
  let copyY = rover.y;
  if (moveRover(rover,"B")){
    switch (rover.direction){
      case "N":{rover.y++}break;
      case "S":{rover.y--}break;
      case "E":{rover.x--}break;
      case "W":{rover.x++}break;
    }
    console.log("moveBackward was called");
    return true;
  }

else return false;
}
function moveRover (roverMars,toWhere){
  
  switch (roverMars.direction){
    case "N":{if (toWhere==="F") {return iCanMove(roverMars.x,roverMars.y-1);}
              else {return iCanMove(roverMars.x,roverMars.y+1);}
              }break;
    case "S":{if (toWhere==="F") {return iCanMove(roverMars.x,roverMars.y+1);}
              else {return iCanMove(roverMars.x,roverMars.y-1);}
              }break;
    case "E":{if (toWhere==="F") {return iCanMove(roverMars.x+1,roverMars.y);}
              else {return iCanMove(roverMars.x-1,roverMars.y);}
              }break;
    case "W":{if (toWhere==="F") {return iCanMove(roverMars.x-1,roverMars.y);}
              else {return iCanMove(roverMars.x+1,roverMars.y);}
              }break;
  }
}
function iCanMove(x, y) { 
if (x<0 || y<0 || x>9 || y > 9 ) {
  console.log("I'm sorry but I can not get out of the grid");
  return false;
}
switch (grid[y][x])
    {
      case 0:{return true}break;//I don't know if is needed this last "break"
      case 1:{console.log(`Sorry I can't move to this position (${x},${y})  because I have found an obstacle`); return false;}break;
      case 2:{console.log(`Sorry I can't move to this position (${x},${y})  because I have found the mars-rover`); return false;}break;
      default:{console.log(`Sorry I can't move to this position (${x},${y})  because I have found the rover number ${grid[y][x]-1}`); return false;}break;
    }
  }
function movementRovers() { //The movemments or turns are random
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
  rovers.forEach((item,index)=>{console.log (`Rover number ${index+2} starts at the position ${item.x},${item.y} and facing to ${item.direction}`);
});
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
  console.log('\n');
}
