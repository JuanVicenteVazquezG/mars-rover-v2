// Rover Object Goes Here
// ======================
const rover = {
  direction: "N", //The direction property can contain one of four values: "N", "S", "E", or "W". The rover’s
  x: 0,
  y: 0,
  travelLog: []
};
// ======================

let ctx; //canvas context
window.addEventListener("load", () => {
  ctx= document.createElement("canvas");
  ctx.innerHTML = "This browser does not support canvas!";
  ctx.id = "myCanvas";
  document.getElementsByTagName("BODY")[0].appendChild(ctx);
  ctx=document.getElementById("myCanvas").getContext("2d");
  ctx.canvas.width = "500";
  ctx.canvas.height = "500";
  ctx.fillStyle="white";
  ctx.fillRect (0,0,500,500);
});

let grid = new Array(10);

let command = "";
const compass = "NESW"; //Clockwise

command = prompt(
  "Please introduce a valid command list to move the rover (Allowed commands F (Forward), B (Backward), R(Right) and L(Left)."
).toUpperCase();

console.log(command);

for (var l = 0; l < command.length; l++) {
  switch (command[l]) {
    case "R":
      turnRight(rover);
      break;
    case "L":
      turnLeft(rover);
      break;
    case "F":
      moveForward(rover);
      break;
    case "B":
      moveBackward(rover);
      break;
    default:
      console.log("Nothing to do here");
  }
  rover.travelLog.push(rover.x, rover.y, rover.direction);
  console.log(rover.travelLog);
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
        } else {
          rover.y--;
          console.log(`New position of rover is ${rover.x},${rover.y}`);
        }
      }
      break;
    case "E":
      {
        if (rover.x == 9) {
          console.log("I'm sorry but I can not get out of the grid");
        } else {
          rover.x++;
          console.log(`New position of rover is ${rover.x},${rover.y}`);
        }
      }
      break;

    case "S":
      {
        if (rover.y == 9) {
          console.log("I'm sorry but I can not get out of the grid");
        } else {
          rover.y++;
          console.log(`New position of rover is ${rover.x},${rover.y}`);
        }
      }
      break;

    case "W":
      {
        if (rover.x == 0) {
          console.log("I'm sorry but I can not get out of the grid");
        } else {
          rover.x--;
          console.log(`New position of rover is ${rover.x},${rover.y}`);
        }
      }
      break;
  }
  console.log("moveForward was called");
}

function moveBackward(rover) {
  console.log("moveBackward was called");
}
