import fs from "fs";
import path from "path";

const numbers = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .split("\n")
  .map((line) => +line);

const partOne = numbers.find(
  (number, index) =>
    index > 24 &&
    !numbers.some((a) => numbers.some((b) => a !== b && a + b === number))
);

console.log("Part one:", partOne);

let list: number[] = [];
let numberIndex = 0;
let total;

while (total !== partOne) {
  list = [];
  for (let index = numberIndex; index < numbers.length; index++) {
    list.push(numbers[index]);
    total = list.reduce((c, a) => c + a, 0);
    if (total === partOne) {
      break;
    } else if (total > partOne) {
      index = numbers.length;
    }
  }
  numberIndex++;
}

console.log("Part two:", Math.min(...list) + Math.max(...list));
