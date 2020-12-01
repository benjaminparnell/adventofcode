import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const numbers = input
  .split("\n")
  .filter(Boolean)
  .map((n) => parseInt(n, 10));

const pickRandomNumber = (numbers) =>
  numbers[Math.floor(Math.random() * numbers.length)];

let foundAnswer: boolean;

while (!foundAnswer) {
  const a = pickRandomNumber(numbers);
  const b = pickRandomNumber(numbers);

  if (a + b === 2020) {
    console.log("Part one:", a * b);
    foundAnswer = true;
  }
}

foundAnswer = false;

while (!foundAnswer) {
  const a = pickRandomNumber(numbers);
  const b = pickRandomNumber(numbers);
  const c = pickRandomNumber(numbers);

  if (a + b + c === 2020) {
    console.log("Part two:", a * b * c);
    foundAnswer = true;
  }
}
