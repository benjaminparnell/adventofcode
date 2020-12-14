import fs from "fs";
import path from "path";

const lines = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .split("\n");

const memory = new Map<number, number>();

// https://stackoverflow.com/questions/9939760/how-do-i-convert-an-integer-to-binary-in-javascript
const decimalToBinary = (dec: number): string => {
  return (dec >>> 0).toString(2).padStart(36, "0");
};

const applyMask = (value: number, mask: string) => {
  const binary = decimalToBinary(value);

  return mask
    .split("")
    .map((c, index) => {
      if (c === "X") {
        return binary[index];
      }
      return c;
    })
    .join("");
};

let mask: string;
let memRegex = /mem\[(?<loc>\d+)\] = (?<val>\d+)/;

lines.forEach((line) => {
  if (line.startsWith("mem")) {
    const match = memRegex.exec(line);
    if (match) {
      const { loc, val } = match.groups;
      const binaryWithMaskApplied = applyMask(parseInt(val, 10), mask);
      memory.set(parseInt(loc, 10), parseInt(binaryWithMaskApplied, 2));
    }
  } else {
    mask = line.split(" ")[2];
  }
});

console.log(
  "Part one:",
  Array.from(memory.values()).reduce((c, v) => c + v, 0)
);
