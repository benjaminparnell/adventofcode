import fs from "fs";
import path from "path";

const adapters = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .split("\n")
  .map((line) => +line);

const differences: Record<string, number> = { "3": 1 };
const usedAdapters = [];

let rating = 0;

while (usedAdapters.length !== adapters.length) {
  for (let joltDifference = 1; joltDifference < 4; joltDifference++) {
    const newRating = rating + joltDifference;
    if (adapters.includes(newRating)) {
      if (differences[joltDifference]) {
        differences[joltDifference]++;
      } else {
        differences[joltDifference] = 1;
      }
      rating = newRating;
      usedAdapters.push(newRating);
      break;
    }
  }
}

console.log("Part one:", differences["1"] * differences["3"]);
