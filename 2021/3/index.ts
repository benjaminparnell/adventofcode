import fs from "fs";
import path from "path";

const lines = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .split("\n");

const getMostCommon = (lines: string[]) => {
  let counts = [];

  for (let line of lines) {
    for (let index = 0; index < line.length; index++) {
      if (!counts[index]) counts[index] = { one: 0, zero: 0 };
      counts[index][line[index] === "1" ? "one" : "zero"]++;
    }
  }

  return counts
    .map((count) => {
      if (count.one > count.zero) {
        return "1";
      }
      return "0";
    })
    .join("");
};

const flip = (input: string) => {
  return input
    .split("")
    .map((char) => (char === "1" ? "0" : "1"))
    .join("");
};

const mostCommon = getMostCommon(lines);
const leastCommon = flip(mostCommon);
console.log(parseInt(mostCommon, 2) * parseInt(leastCommon, 2));
