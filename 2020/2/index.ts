import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");
const passwordLines = input
  .split("\n")
  .filter(Boolean)
  .map((line) => {
    const [minMax, letter, password] = line.split(" ");
    const [min, max] = minMax.split("-");
    return {
      min: parseInt(min, 10),
      max: parseInt(max, 10),
      letter: letter[0],
      password: password,
    };
  });

const countLetter = (password: string, letter: string) =>
  password.split("").reduce((m, l) => m + (l === letter ? 1 : 0), 0);

const validPasswordsPartOne = passwordLines.reduce((count, passwordLine) => {
  const letterCount = countLetter(passwordLine.password, passwordLine.letter);

  if (letterCount >= passwordLine.min && letterCount <= passwordLine.max) {
    return count + 1;
  }

  return count;
}, 0);

console.log("Part one:", validPasswordsPartOne);

const validPasswordsPartTwo = passwordLines.reduce(
  (count, { min, max, password, letter }) => {
    const isInFirstPosition = password[min - 1] === letter;
    const isInSecondPosition = password[max - 1] === letter;

    if (isInFirstPosition && isInSecondPosition) {
      return count;
    }

    if (isInFirstPosition || isInSecondPosition) {
      return count + 1;
    }

    return count;
  },
  0
);

console.log("Part two:", validPasswordsPartTwo);
