const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");

function count(arr, memo = {}) {
  return arr.reduce((m, c) => ({ ...m, [c]: m[c] ? m[c] + 1 : 1 }), memo);
}

function calculateChecksum(boxIds) {
  return Object.values(
    boxIds.reduce((memo, boxId) => {
      const groups = count(boxId.split(""));
      const occurances = Object.values(groups).filter(
        (value, index, self) => value !== 1 && self.indexOf(value) === index
      );
      return count(occurances, memo);
    }, {})
  ).reduce((memo, value) => (memo ? memo * value : value), 0);
}

function findBox(boxIds) {
}

const boxIds = input.split("\n");

console.log(calculateChecksum(boxIds));
console.log(findBox(boxIds));
