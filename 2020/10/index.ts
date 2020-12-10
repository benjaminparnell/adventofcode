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
rating += 3;

console.log("Part one:", differences["1"] * differences["3"]);

const sortedAdapters = [0, ...adapters.sort((a, b) => a - b), rating];
const map = sortedAdapters.reduce(
  (memo, a) => memo.set(a, a === 0 ? 1 : 0),
  new Map<number, number>()
);

sortedAdapters.forEach((adapter) => {
  for (let num = 1; num < 4; num++) {
    const newAdapter = adapter + num;
    if (map.has(newAdapter)) {
      map.set(newAdapter, map.get(newAdapter) + map.get(adapter));
    }
  }
});

console.log("Part two:", map.get(rating));
