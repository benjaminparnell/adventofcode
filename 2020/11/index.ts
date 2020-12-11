import fs from "fs";
import path from "path";

const lines = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .split("\n");

type SeatMap = string[][];

const seatMap = lines.reduce<SeatMap>((memo, line) => {
  memo.push(line.split(""));
  return memo;
}, []);

const mapsMatch = (mapA: SeatMap, mapB: SeatMap): boolean => {
  if (mapA.length !== mapB.length) return false;
  return mapA.every((mapARow, y) => {
    return mapARow.every((value, x) => value === mapB[y][x]);
  });
};

const getSeatsAround = (x: number, y: number, seats: SeatMap): string[] => {
  const seatsAround: [number, number][] = [
    [x, y + 1],
    [x, y - 1],
    [x + 1, y],
    [x - 1, y],
    [x + 1, y - 1],
    [x - 1, y - 1],
    [x + 1, y + 1],
    [x - 1, y + 1],
  ];

  return seatsAround
    .map(([x, y]) => (seats[y] && seats[y][x] ? seats[y][x] : null))
    .filter(Boolean);
};

const countEqual = (array: string[], value: string) =>
  array.filter((a) => a === value).length;

const emptyMap = () => seatMap.map((row) => row.map(() => ""));

let currentMap: SeatMap = seatMap;
let lastMap: SeatMap = emptyMap();
let count = 0;

while (!mapsMatch(currentMap, lastMap)) {
  lastMap = currentMap;
  currentMap = emptyMap();

  for (let y = 0; y < lastMap.length; y++) {
    for (let x = 0; x < lastMap[0].length; x++) {
      const position = lastMap[y][x];
      const seatsAround = getSeatsAround(x, y, lastMap);
      if (position === "L" && countEqual(seatsAround, "#") === 0) {
        // seat is empty, are there are free ones around it?
        currentMap[y][x] = "#";
      } else if (position === "#" && countEqual(seatsAround, "#") >= 4) {
        // seat is occupied, are there four or more seats adjacent and occupied?
        currentMap[y][x] = "L";
      } else {
        currentMap[y][x] = lastMap[y][x];
      }
    }
  }

  count++;
}

console.log(
  "Part one:",
  currentMap.reduce((count, row) => count + countEqual(row, "#"), 0)
);
