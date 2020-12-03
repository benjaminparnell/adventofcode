import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");

const field = input
  .split("\n")
  .filter(Boolean)
  .map((line) => line.split(""));

let outOfBonds = false;
let x = 0;
let y = 0;
let treeCount = 0;
const lineLength = field[0].length;

while (!outOfBonds) {
  treeCount = field[y][x] === "#" ? treeCount + 1 : treeCount;
  x = x + 3;
  y++;
  if (x > lineLength - 1) {
    x = x - lineLength;
  }
  if (field[y] === undefined) {
    outOfBonds = true;
  }
}

console.log("Part 1:", treeCount);
