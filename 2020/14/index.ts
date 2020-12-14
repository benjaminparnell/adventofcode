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

const getMemoryValuesSum = (memory: Map<number, number>): number => {
  return Array.from(memory.values()).reduce((c, v) => c + v, 0);
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

console.log("Part one:", getMemoryValuesSum(memory));

memory.clear();

// mostly taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
// because I couldn't quite get this right
const flatten = (input: any, level: number = 0): any => {
  return level > 0
    ? input.reduce(
        (memo, arr) =>
          memo.concat(Array.isArray(arr) ? flatten(arr, level - 1) : arr),
        []
      )
    : input.slice();
};

// get all possible perms of a given set of values for a list of a desired length
function getPermutations(
  values: number[],
  perm: number[],
  desiredLength: number
) {
  if (perm.length === desiredLength) {
    return perm;
  }

  return values.map((value) =>
    getPermutations(values, perm.concat([value]), desiredLength)
  );
}

const applyMask2 = (value: number, mask: string) => {
  const binary = decimalToBinary(value);

  return mask
    .split("")
    .map((c, index) => {
      if (c === "0") {
        return binary[index];
      }
      return c;
    })
    .join("");
};

lines.forEach((line) => {
  if (line.startsWith("mem")) {
    const match = memRegex.exec(line);
    const { loc, val } = match.groups;
    const binaryWithMaskApplied = applyMask2(parseInt(loc, 10), mask);
    // get all the indexes of the floating bits
    const floatingIndexes = binaryWithMaskApplied
      .split("")
      .map((c, index) => (c === "X" ? index : null))
      .filter((c) => Number.isInteger(c));
    // get all the possible permutations of 0 and 1 for that number of floating bits
    const perms = flatten(
      getPermutations([0, 1], [], floatingIndexes.length),
      floatingIndexes.length - 1
    );
    // now iterate the perms creating addresses for each one, using a combo of the indexes of the floating bits
    // and the perms
    perms.forEach((perm) => {
      // generate a Map to map floating bit indexes to the values in this permutation
      const permsIndexes = floatingIndexes.reduce<Map<number, number>>(
        (memo, floatingIndex, index) => memo.set(floatingIndex, perm[index]),
        new Map()
      );
      // take the value with mask applied, and then apply the values for this permutation to the right indexes
      const address = binaryWithMaskApplied
        .split("")
        .map((char, index) =>
          permsIndexes.has(index) ? permsIndexes.get(index) : char
        )
        .join("");
      // set the address in memory to the value in the instruction
      memory.set(parseInt(address, 2), parseInt(val, 10));
    });
  } else {
    mask = line.split(" ")[2];
  }
});

console.log("Part two:", getMemoryValuesSum(memory));
