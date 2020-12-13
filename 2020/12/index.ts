import fs from "fs";
import path from "path";

const lines = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .split("\n");

type Direction = "N" | "E" | "S" | "W";
type Orientation = "R" | "L";
type Command = Direction | Orientation | "F";

const COMPASS: Direction[] = ["N", "E", "S", "W"];

const instructions: [Command, number][] = lines.map((line) => {
  const [direction, ...degrees] = line.split("");
  return [direction as Command, parseInt(degrees.join(""), 10)];
});

const isDirection = (command: Command): command is Direction => {
  return ["N", "E", "S", "W"].includes(command);
};

const isOrientation = (command: Command): command is Orientation => {
  return ["L", "R"].includes(command);
};

const orientate = (
  direction: Direction,
  orientation: Orientation,
  howMany: number
): Direction => {
  const compass = COMPASS;
  const currentIndex = compass.indexOf(direction);
  const newIndex =
    orientation === "R"
      ? currentIndex + howMany
      : currentIndex - howMany >= 0
      ? currentIndex - howMany
      : compass.length + (currentIndex - howMany);
  return compass[newIndex % COMPASS.length];
};

const moveInDirection = (
  direction: Direction,
  x: number,
  y: number,
  value: number
): [number, number] => {
  switch (direction) {
    case "E":
      return [x + value, y];
    case "W":
      return [x - value, y];
    case "N":
      return [x, y + value];
    case "S":
      return [x, y - value];
  }
};

let pointing: Direction = "E";
let positionX = 0;
let positionY = 0;

instructions.forEach(([command, value]) => {
  if (command === "F") {
    const [newX, newY] = moveInDirection(pointing, positionX, positionY, value);
    positionX = newX;
    positionY = newY;
  }

  if (isDirection(command)) {
    const [newX, newY] = moveInDirection(command, positionX, positionY, value);
    positionX = newX;
    positionY = newY;
  }

  if (isOrientation(command)) {
    const number = value / 90;
    pointing = orientate(pointing, command, number);
  }
});

console.log("Part one:", Math.abs(positionX) + positionY);
