const fs = require("fs");

const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf8");

const Opcode = {
  ADD: 1,
  MULTIPLY: 2,
  INPUT: 3,
  OUTPUT: 4,
  HALT: 99
};

const ParameterModes = {
  POSITION: 0,
  IMMEDIATE: 1
};

function parseIntcodeFromString(intcodeString) {
  return intcodeString.split(",").map(number => parseInt(number, 10));
}

function getOpcode(value) {
  return parseInt(
    value
      .toString()
      .split("")
      .slice(-2)
      .join(""),
    10
  );
}

function getParamterModesForOpcode(value) {
  return value
    .toString()
    .padStart(5, "0")
    .split("")
    .map(v => parseInt(v, 10))
    .slice(0, -2)
    .reverse();
}

function getValue(intcode, position, mode) {
  const value = intcode[position];

  if (mode === ParameterModes.POSITION) {
    return intcode[value];
  }

  return value;
}

function getInstructionLengthForOpcode(opcode) {
  return opcode === Opcode.INPUT || opcode === Opcode.OUTPUT ? 2 : 4;
}

function processIntcode(intcode) {
  let newIntcode = intcode.slice();

  for (
    let currentPosition = 0;
    getOpcode(newIntcode[currentPosition]) !== Opcode.HALT;
    currentPosition += getInstructionLengthForOpcode(
      getOpcode(newIntcode[currentPosition])
    )
  ) {
    const opcode = getOpcode(newIntcode[currentPosition]);
    const modes = getParamterModesForOpcode(newIntcode[currentPosition]);

    switch (opcode) {
      case Opcode.ADD: {
        const valueA = getValue(newIntcode, currentPosition + 1, modes[0]);
        const valueB = getValue(newIntcode, currentPosition + 2, modes[1]);
        newIntcode[newIntcode[currentPosition + 3]] = valueA + valueB;
        break;
      }
      case Opcode.MULTIPLY: {
        const valueA = getValue(newIntcode, currentPosition + 1, modes[0]);
        const valueB = getValue(newIntcode, currentPosition + 2, modes[1]);
        newIntcode[newIntcode[currentPosition + 3]] = valueA * valueB;
        break;
      }
      case Opcode.INPUT: {
        newIntcode[newIntcode[currentPosition + 1]] = 1;
        break;
      }
      case Opcode.OUTPUT: {
        const value = getValue(newIntcode, currentPosition + 1, modes[0]);
        console.log("OUTPUT:", value);
        break;
      }
      default:
        break;
    }
  }

  console.log("HALTING");

  return newIntcode[0];
}
const intcode = parseIntcodeFromString(inputFile);
processIntcode(intcode);
