import fs from "fs";
import path from "path";

const lines = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .split("\n")
  .filter(Boolean);

const input = lines[0].split(",").map((item) => parseInt(item, 10));

const difference = (a: number, b: number) => {
  if (a > b) {
    return a - b;
  } else if (b > a) {
    return b - a;
  }
  return 0;
};

const partOne = () => {
  let lowestFuelCost: number | null = null;

  for (let movePosition of input) {
    let fuelCost = 0;
    for (let inputPosition of input) {
      fuelCost += difference(movePosition, inputPosition);
      if (lowestFuelCost && fuelCost > lowestFuelCost) {
        break;
      }
    }
    if (fuelCost < lowestFuelCost || lowestFuelCost === null) {
      lowestFuelCost = fuelCost;
    }
  }

  console.log(lowestFuelCost);
};

const partTwo = () => {
  let lowestFuelCost: number | null = null;

  for (let moveIndex = 1; moveIndex <= input.length; moveIndex++) {
    let fuelCost = 0;
    for (let inputPosition of input) {
      const diff = difference(moveIndex, inputPosition);
      for (let number = 1; number <= diff; number++) {
          fuelCost += number
      }
      if (lowestFuelCost && fuelCost > lowestFuelCost) {
        break;
      }
    }
    if (fuelCost < lowestFuelCost || lowestFuelCost === null) {
      lowestFuelCost = fuelCost;
    }
  }

  console.log(lowestFuelCost);
};

partOne()
partTwo()
