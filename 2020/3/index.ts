import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");

const field = input
  .split("\n")
  .filter(Boolean)
  .map((line) => line.split(""));

const getTreesInSlope = (
  field: string[][],
  moveX: number,
  moveY: number
): number => {
  let outOfBonds = false;
  let x = 0;
  let y = 0;
  let treeCount = 0;
  const lineLength = field[0].length;

  while (!outOfBonds) {
    treeCount = field[y][x] === "#" ? treeCount + 1 : treeCount;
    x = x + moveX;
    y = y + moveY;
    if (x > lineLength - 1) {
      x = x - lineLength;
    }
    if (field[y] === undefined) {
      outOfBonds = true;
    }
  }

  return treeCount;
};

console.log("Part 1:", getTreesInSlope(field, 3, 1));

console.log(
  "Part 2:",
  [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ].reduce((product, [moveX, moveY]) => {
    const trees = getTreesInSlope(field, moveX, moveY);
    return product === 0 ? trees : product * trees;
  }, 0)
);
