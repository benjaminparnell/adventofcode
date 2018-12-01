const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");

function applyInstruction(frequency, instruction) {
  let [operator, ...number] = instruction;
  number = parseInt(number.join(""), 10);
  switch (operator) {
    case "+":
      return frequency + number;
    case "-":
      return frequency - number;
    default:
      return frequency;
  }
}

function taskOne(input) {
  return input.split("\n").reduce(applyInstruction, 0);
}

function taskTwo(input) {
  const history = { 0: 1 };
  const instructions = input.split("\n").filter(Boolean);
  let found = false;
  let frequency = 0;
  let index = 0;

  while (!found) {
    frequency = applyInstruction(frequency, instructions[index]);

    if (history[frequency]) {
      history[frequency] = history[frequency]++;
      found = true;
    } else {
      history[frequency] = 1;
      if (index === instructions.length - 1) {
        index = 0;
      } else {
        index++;
      }
    }
  }

  return frequency;
}

console.log(taskOne(input));
console.log(taskTwo(input));
