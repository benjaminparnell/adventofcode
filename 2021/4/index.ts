import fs from "fs";
import path from "path";

const sum = (input: number[]) => input.reduce((memo, item) => memo + item, 0);

const lines = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .split("\n");

const inputDrawNumbers = lines[0].split(",").map((i) => parseInt(i, 10));

lines.splice(0, 2);

let currentBoard = [];
const boards = lines.reduce<number[][][]>((memo, line, index) => {
  if (line === "") {
    memo.push(currentBoard);
    currentBoard = [];
    return memo;
  }
  currentBoard.push(
    line
      .split(" ")
      .map((c) => parseInt(c, 10))
      .filter(Number)
  );
  if (index === lines.length - 1) {
    memo.push(currentBoard);
  }
  return memo;
}, []);

const hasWon = (board: number[][], drawnNumbers: number[]) => {
  const hasRow = board.some((row) =>
    row.every((item) => drawnNumbers.includes(item))
  );
  const hasColumn = board[0].some((_, index) => {
    const column = board.map((line) => line[index]);
    return column.every((item) => drawnNumbers.includes(item));
  });

  return hasRow || hasColumn;
};

const getUnmarkedSum = (board: number[][], markedNumbers: number[]) => {
  return sum(
    board.map((row) => sum(row.filter((item) => !markedNumbers.includes(item))))
  );
};

const taskOne = () => {
  let foundWinner: number[][] | null = null;
  let number = 0;
  const drawnNumbers: number[] = [];

  while (!foundWinner) {
    drawnNumbers.push(inputDrawNumbers[number]);
    number++;
    const winner = boards.find((board) => hasWon(board, drawnNumbers));

    if (winner) {
      foundWinner = winner;
    }

    if (drawnNumbers.length > inputDrawNumbers.length) {
      foundWinner = null;
      console.log("Cannot find winner");
      break;
    }
  }

  console.log(getUnmarkedSum(foundWinner, drawnNumbers) * drawnNumbers[drawnNumbers.length - 1]);
};

taskOne();

const taskTwo = (boards: number[][][]) => {
  let foundWinner: number[][] | null = null;
  let number = 0;
  const drawnNumbers: number[] = [];

  while (boards.length) {
    drawnNumbers.push(inputDrawNumbers[number]);
    number++;
    const winner = boards.find((board) => hasWon(board, drawnNumbers));

    if (winner) {
      foundWinner = winner;
      boards = boards.filter((board) => !hasWon(board, drawnNumbers));
    }
  }

  console.log(getUnmarkedSum(foundWinner, drawnNumbers) * drawnNumbers[drawnNumbers.length - 1]);
};

taskTwo(boards);
