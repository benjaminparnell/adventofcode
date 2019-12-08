const fs = require("fs");
const { processIntcode, parseIntcodeFromString } = require("../5/main");

const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf8");
const intcode = parseIntcodeFromString(inputFile);

function getPermutations(input, usedItems = [], permutations = []) {
  for (let index = 0; index < input.length; index++) {
    usedItems.push(input.splice(index, 1)[0]);
    if (input.length === 0) {
      permutations.push(usedItems.slice());
    }
    getPermutations(input, usedItems, permutations);
    input.splice(index, 0, usedItems[usedItems.length - 1]);
    usedItems.pop();
  }

  return permutations;
}

function getThrusterSignal(phaseSettings, intcode) {
  return phaseSettings.reduce(
    (output, phaseSetting) => processIntcode(intcode, [phaseSetting, output]),
    0
  );
}

console.log(
  getPermutations([0, 1, 2, 3, 4])
    .map(permutation => getThrusterSignal(permutation, intcode))
    .sort()
    .reverse()[0]
);
