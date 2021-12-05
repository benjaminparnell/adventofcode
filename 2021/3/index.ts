import fs from "fs";
import path from "path";

const lines = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .split("\n")
  .filter(Boolean);

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

const getMostCommonInPosition = (lines: string[], position: number) => {
  let zero = 0;
  let one = 0;
  for (let line of lines) {
    if (line[position] === "0") {
      zero++;
    } else {
      one++;
    }
  }

  if (zero > one) {
    return "0";
  }
  return "1";
};

const flipPos = (input: string) => input === '1' ? '0' : '1'

const getOxygenRating = (lines: string[]) => {
  let found = false;
  let currentPosition = 0;

  while (!found) {
    if (lines.length === 1) {
      found = true;
    } else {
      const mostCommonInPosition = getMostCommonInPosition(
        lines,
        currentPosition
      );

      lines = lines.filter(
        (line) => line[currentPosition] === mostCommonInPosition
      );

      currentPosition++;
    }
  }

  return lines[0];
};

const getCo2Rating = (lines: string[]) => {
  let found = false;
  let currentPosition = 0;

  while (!found) {
    if (lines.length === 1) {
      found = true;
    } else {
      const leastCommonInPosition = flipPos(getMostCommonInPosition(
        lines,
        currentPosition
      ));

      lines = lines.filter(
        (line) => line[currentPosition] === leastCommonInPosition
      );

      currentPosition++;
    }
  }

  return lines[0];
};

console.log(parseInt(getOxygenRating(lines), 2) * parseInt(getCo2Rating(lines), 2));
