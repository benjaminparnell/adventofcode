const fs = require("fs");

function getFuelRequiredForModules(modules) {
  return modules.reduce(
    (total, moduleMass) => total + getFuelRequiredForMass(moduleMass),
    0
  );
}

function getFuelRequiredForMass(mass) {
  const newMass = Math.floor(mass / 3) - 2;
  if (newMass < 0) {
    return 0;
  }
  return newMass + getFuelRequiredForMass(newMass);
}

const inputLines = fs
  .readFileSync(__dirname + "/input.txt", "utf8")
  .split("\n")
  .filter(Boolean);

const modules = inputLines.map(inputLine => parseInt(inputLine, 10));

console.log(getFuelRequiredForModules(modules));
