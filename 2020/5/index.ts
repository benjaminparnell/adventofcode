import fs from "fs";
import path from "path";

const lines = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .split("\n");

const getNumberInSpace = (
  input: string,
  up: string,
  down: string,
  startingRange: [number, number]
): number =>
  input.split("").reduce(([low, high], character) => {
    let distance = Math.round((high - low) / 2);
    if (character === up) {
      low = low + distance;
    } else if (character === down) {
      high = high - distance;
    }
    return [low, high];
  }, startingRange)[0];

const getSeatRow = (input: string) =>
  getNumberInSpace(input, "B", "F", [0, 127]);

const getSeatColumn = (input: string) =>
  getNumberInSpace(input, "R", "L", [0, 7]);

const getSeatId = (seatInput: string) =>
  getSeatRow(seatInput) * 8 + getSeatColumn(seatInput);

const seatIds = lines.map((line) => getSeatId(line));

console.log("Part one:", Math.max(...seatIds));

const missingIds: number[] = seatIds
  .sort((a, b) => a - b)
  .reduce((ids, id, index, sortedSeatIds) => {
    if (sortedSeatIds[index - 1] && id - sortedSeatIds[index - 1] !== 1) {
      ids.push(sortedSeatIds[index - 1] + 1);
    }
    return ids;
  }, []);

console.log("Part two:", missingIds);
