const fs = require("fs");

const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf8");

const Opcode = {
  ADD: 1,
  MULTIPLY: 2,
  INPUT: 3,
  OUTPUT: 4,
  JUMP_IF_TRUE: 5,
  JUMP_IF_FALSE: 6,
  LESS_THAN: 7,
  EQUALS: 8,
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
  if (opcode === Opcode.INPUT || opcode === Opcode.OUTPUT) {
    return 2;
  }

  if (opcode === Opcode.JUMP_IF_TRUE || opcode === Opcode.JUMP_IF_FALSE) {
    return 3;
  }

  return 4;
}

function processIntcode(intcode, inputs) {
  let newIntcode = intcode.slice();
  let currentPosition = 0;
  let lastOutput;
  let halting;

  while (!halting) {
    let shouldAutomaticallyAdvance = true;
    const opcode = getOpcode(newIntcode[currentPosition]);
    const modes = getParamterModesForOpcode(newIntcode[currentPosition]);
    const valueA = getValue(newIntcode, currentPosition + 1, modes[0]);
    const valueB = getValue(newIntcode, currentPosition + 2, modes[1]);

    switch (opcode) {
      case Opcode.ADD: {
        newIntcode[newIntcode[currentPosition + 3]] = valueA + valueB;
        break;
      }
      case Opcode.MULTIPLY: {
        newIntcode[newIntcode[currentPosition + 3]] = valueA * valueB;
        break;
      }
      case Opcode.INPUT: {
        newIntcode[newIntcode[currentPosition + 1]] = inputs.shift();
        break;
      }
      case Opcode.OUTPUT: {
        lastOutput = valueA;
        break;
      }
      case Opcode.JUMP_IF_TRUE: {
        if (valueA !== 0) {
          currentPosition = valueB;
          shouldAutomaticallyAdvance = false;
        }

        break;
      }
      case Opcode.JUMP_IF_FALSE: {
        if (valueA === 0) {
          currentPosition = valueB;
          shouldAutomaticallyAdvance = false;
        }

        break;
      }
      case Opcode.LESS_THAN: {
        if (valueA < valueB) {
          newIntcode[newIntcode[currentPosition + 3]] = 1;
        } else {
          newIntcode[newIntcode[currentPosition + 3]] = 0;
        }

        break;
      }
      case Opcode.EQUALS: {
        if (valueA === valueB) {
          newIntcode[newIntcode[currentPosition + 3]] = 1;
        } else {
          newIntcode[newIntcode[currentPosition + 3]] = 0;
        }

        break;
      }
      case Opcode.HALT: {
        halting = true;
        break;
      }
      default:
        break;
    }

    if (shouldAutomaticallyAdvance) {
      currentPosition += getInstructionLengthForOpcode(
        getOpcode(newIntcode[currentPosition])
      );
    }
  }

  return lastOutput;
}

// const intcode = parseIntcodeFromString(inputFile);
// processIntcode(intcode, [5]);

module.exports = {
  processIntcode,
  parseIntcodeFromString
};
