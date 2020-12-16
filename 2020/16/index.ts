import fs from "fs";
import path from "path";

const tickets = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .split("\n")
  .map((line) => line.split(",").map((item) => parseInt(item, 10)));

const fieldRegex = /(\w\s?)+: (?<rangeOne>\d+-\d+) or (?<rangeTwo>\d+-\d+)/;

const fieldValidators = fs
  .readFileSync(path.join(__dirname, "fields.txt"), "utf-8")
  .split("\n")
  .map((line) => {
    const matches = fieldRegex.exec(line);
    const rangeOne = matches.groups.rangeOne
      .split("-")
      .map((r) => parseInt(r, 10));
    const rangeTwo = matches.groups.rangeTwo
      .split("-")
      .map((r) => parseInt(r, 10));
    return [rangeOne, rangeTwo];
  });

const isValidForAnyField = (value: number) => {
  return fieldValidators.some((fieldValidator) => {
    const rangeOne = fieldValidator[0];
    const rangeTwo = fieldValidator[1];

    return (
      (value >= rangeOne[0] && value <= rangeOne[1]) ||
      (value >= rangeTwo[0] && value <= rangeTwo[1])
    );
  });
};

const partOne = tickets.reduce((memo, ticketRow) => {
  return (
    memo +
    ticketRow.reduce(
      (rowMemo, ticketValue) =>
        rowMemo + (isValidForAnyField(ticketValue) ? 0 : ticketValue),
      0
    )
  );
}, 0);

console.log("Part one:", partOne);
