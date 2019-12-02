const fs = require("fs");

const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf8");

const Opcode = {
  ADD: 1,
  MULTIPLY: 2,
  HALT: 99
};

function parseIntcodeFromString(intcodeString) {
  return intcodeString.split(",").map(number => parseInt(number, 10));
}

function getOperandsAndPosition(intcode, position) {
  return [
    intcode[intcode[position + 1]],
    intcode[intcode[position + 2]],
    intcode[position + 3]
  ];
}

function processIntcode(intcode) {
  let newIntcode = intcode.slice();

  for (
    let currentPosition = 0;
    intcode[currentPosition] != Opcode.HALT;
    currentPosition += 4
  ) {
    let opcode = intcode[currentPosition];
    const [valueA, valueB, storagePosition] = getOperandsAndPosition(
      newIntcode,
      currentPosition
    );

    switch (opcode) {
      case Opcode.ADD: {
        newIntcode[storagePosition] = valueA + valueB;
        break;
      }
      case Opcode.MULTIPLY: {
        newIntcode[storagePosition] = valueA * valueB;
        break;
      }
      default:
        break;
    }
  }

  return newIntcode[0];
}

function getRandomValue(max) {
  return Math.floor(Math.random() * max);
}

function findNounAndVerb(intcode, desiredResult) {
  let result = null;

  while (result === null) {
    let newIntcode = intcode.slice();
    let [noun, verb] = [getRandomValue(100), getRandomValue(100)];
    newIntcode[1] = noun;
    newIntcode[2] = verb;

    if (processIntcode(newIntcode) === desiredResult) {
      result = 100 * noun + verb;
    }
  }

  return result;
}

const intcode = parseIntcodeFromString(inputFile);
console.log(findNounAndVerb(intcode, 19690720));
