import fs from "fs";
import path from "path";

const lines = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .split("\n");

interface Instruction {
  instruction: string;
  operator: string;
  number: number;
  hasRun: boolean;
}

const makeInstructions = () =>
  lines.map((line) => {
    const [instruction, tail] = line.split(" ");
    return {
      instruction,
      operator: tail[0],
      number: parseInt(tail.substring(1, tail.length), 10),
      hasRun: false,
    };
  });

const doOp = (operator: string, a: number, b: number) =>
  operator === "+" ? a + b : a - b;

const runProgram = (
  instructions: Instruction[]
): [value: number, index: number] => {
  let value = 0;
  let index = 0;
  let current = instructions[index];

  while (current && !current.hasRun) {
    if (current.instruction === "acc") {
      value = doOp(current.operator, value, current.number);
      index = index + 1;
    } else if (current.instruction === "jmp") {
      index = doOp(current.operator, index, current.number);
    } else if (current.instruction === "nop") {
      index = index + 1;
    }
    current.hasRun = true;
    current = instructions[index];
  }

  return [value, index];
};

console.log("Part one:", runProgram(makeInstructions())[0]);

const partTwo = () => {
  const opsToTry = makeInstructions()
    .map((ins, index) => ({ instruction: ins.instruction, index }))
    .filter((ins) => ["nop", "jmp"].includes(ins.instruction));

  for (const op of opsToTry) {
    const newInstructions = makeInstructions();
    newInstructions[op.index].instruction =
      op.instruction === "jmp" ? "nop" : "jmp";
    const [value, index] = runProgram(newInstructions);
    if (index === newInstructions.length) {
      return value;
    }
  }
};

console.log("Part two:", partTwo());
