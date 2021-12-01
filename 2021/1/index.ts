import fs from "fs";
import path from "path";

const numbers = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .split("\n")
  .map((l) => parseInt(l, 10));

const numberOfIncreases = (numbers) =>
  numbers.reduce((memo, number, index) => {
    const previousNumber = numbers[index - 1];
    return previousNumber && previousNumber < number ? memo + 1 : memo;
  }, 0);

console.log(numberOfIncreases(numbers));

const add = (numbers) => numbers.reduce((count, number) => count + number, 0);

const getGroups = (numbers) => {
  const result = [];
  for (let index = 0; index < numbers.length; index += 3) {
    for (let groupIndex = 0; groupIndex < 3; groupIndex++) {
      const group = numbers.slice(index + groupIndex, index + groupIndex + 3);
      if (group.length === 3) {
        result.push(add(group));
      }
    }
  }
  return result;
};

console.log(numberOfIncreases(getGroups(numbers)));
