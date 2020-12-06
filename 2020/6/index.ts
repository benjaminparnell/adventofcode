import fs from "fs";
import path from "path";

const lines = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .split("\n");

const unique = <T>(array: T[]): T[] =>
  array.reduce(
    (uniqueArray, item) =>
      uniqueArray.includes(item) ? uniqueArray : uniqueArray.concat([item]),
    []
  );

const flatten = <T>(array: T[][]): T[] =>
  array.reduce((flatArray, subArray) => flatArray.concat(subArray), []);

const answersFromAllGroups: string[][][] = [];

for (let index = 0; index < lines.length; index++) {
  let groupAnswers: string[][] = [];

  if (lines[index]) {
    while (lines[index]) {
      groupAnswers.push(lines[index].split(""));
      index++;
    }
    answersFromAllGroups.push(groupAnswers);
  }
}

console.log(
  "Part one:",
  answersFromAllGroups.reduce(
    (count, answers) => count + unique(flatten(answers)).length,
    0
  )
);

console.log(
  "Part two:",
  answersFromAllGroups.reduce(
    (count, answerGroup) =>
      count +
      unique(flatten(answerGroup)).reduce(
        (answerCount, answer) =>
          answerGroup.every((answerRow) => answerRow.includes(answer))
            ? answerCount + 1
            : answerCount,
        0
      ),
    0
  )
);
