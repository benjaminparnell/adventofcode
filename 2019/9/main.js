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
  RELATIVE_ADJUST: 9,
  HALT: 99
};

const ParameterModes = {
  POSITION: 0,
  IMMEDIATE: 1,
  RELATIVE: 2
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

function getIndex(intcode, position, mode, relativeBase) {
  let index = position;

  if (mode === ParameterModes.POSITION) {
    index = intcode[position];
  } else if (mode === ParameterModes.RELATIVE) {
    index = intcode[position] + relativeBase;
  }

  return index;
}

function getValue(intcode, position, mode, relativeBase) {
  let value = intcode[getIndex(intcode, position, mode, relativeBase)];
  return value === undefined ? 0 : value;
}

function getInstructionLengthForOpcode(opcode) {
  if (
    opcode === Opcode.INPUT ||
    opcode === Opcode.OUTPUT ||
    opcode === Opcode.RELATIVE_ADJUST
  ) {
    return 2;
  }

  if (opcode === Opcode.JUMP_IF_TRUE || opcode === Opcode.JUMP_IF_FALSE) {
    return 3;
  }

  return 4;
}

function processIntcode(intcode, inputs = []) {
  let newIntcode = intcode.slice();
  let currentPosition = 0;
  let relativeBase = 0;
  let lastOutput;
  let halting;

  while (!halting) {
    let shouldAutomaticallyAdvance = true;
    const opcode = getOpcode(newIntcode[currentPosition]);
    const modes = getParamterModesForOpcode(newIntcode[currentPosition]);
    const valueA = getValue(
      newIntcode,
      currentPosition + 1,
      modes[0],
      relativeBase
    );
    const valueB = getValue(
      newIntcode,
      currentPosition + 2,
      modes[1],
      relativeBase
    );

    switch (opcode) {
      case Opcode.ADD: {
        newIntcode[
          getIndex(newIntcode, currentPosition + 3, modes[2], relativeBase)
        ] = valueA + valueB;
        break;
      }
      case Opcode.MULTIPLY: {
        newIntcode[
          getIndex(newIntcode, currentPosition + 3, modes[2], relativeBase)
        ] = valueA * valueB;
        break;
      }
      case Opcode.INPUT: {
        newIntcode[
          getIndex(newIntcode, currentPosition + 1, modes[0], relativeBase)
        ] = inputs.shift();
        break;
      }
      case Opcode.OUTPUT: {
        console.log("OUTPUT:", valueA);
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
        const index = getIndex(
          newIntcode,
          currentPosition + 3,
          modes[2],
          relativeBase
        );
        if (valueA < valueB) {
          newIntcode[index] = 1;
        } else {
          newIntcode[index] = 0;
        }

        break;
      }
      case Opcode.EQUALS: {
        const index = getIndex(
          newIntcode,
          currentPosition + 3,
          modes[2],
          relativeBase
        );
        if (valueA === valueB) {
          newIntcode[index] = 1;
        } else {
          newIntcode[index] = 0;
        }

        break;
      }
      case Opcode.RELATIVE_ADJUST: {
        relativeBase += valueA;
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

const intcode = parseIntcodeFromString(inputFile);
// Task one
console.log(processIntcode(intcode, [1]));
// Task two
console.log(processIntcode(intcode, [2]));
