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

const mapsMatch = (mapA: SeatMap, mapB: SeatMap): boolean =>
  mapA.every((mapARow, y) => mapARow.every((value, x) => value === mapB[y][x]));

const getSeatsAround = (
  x: number,
  y: number,
  seats: SeatMap,
  run: number
): string[] => {
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

const isSeat = (v: string) => ["L", "#"].includes(v);

const getSeatsInSight = (
  x: number,
  y: number,
  seats: SeatMap,
  run: number
): string[] => {
  // this is very lazy, apologies
  const seatsAround = [];
  return seatsAround;
};

const countEqual = (array: string[], value: string) =>
  array.filter((a) => a === value).length;

const emptyMap = () => seatMap.map((row) => row.map(() => ""));

const getOccupiedSeats = (
  minAdjacentSeats: number = 4,
  seatFinder: (x: number, y: number, s: SeatMap, run: number) => string[]
) => {
  let currentMap: SeatMap = seatMap;
  let lastMap: SeatMap = emptyMap();
  let run = 1;

  while (!mapsMatch(currentMap, lastMap)) {
    lastMap = currentMap;
    currentMap = emptyMap();

    for (let y = 0; y < lastMap.length; y++) {
      for (let x = 0; x < lastMap[0].length; x++) {
        const position = lastMap[y][x];
        const seatsAround = seatFinder(x, y, lastMap, run);
        if (position === "L" && countEqual(seatsAround, "#") === 0) {
          // seat is empty, are there are free ones around it?
          currentMap[y][x] = "#";
        } else if (
          position === "#" &&
          countEqual(seatsAround, "#") >= minAdjacentSeats
        ) {
          // seat is occupied, are there four or more seats adjacent and occupied?
          if (run === 2 && x === 9 && y === 7) {
            console.log("here!");
          }
          currentMap[y][x] = "L";
        } else {
          currentMap[y][x] = lastMap[y][x];
        }
      }
    }

    run++;
  }

  return currentMap.reduce((count, row) => count + countEqual(row, "#"), 0);
};

const print = (seatMap: SeatMap) => {
  seatMap.forEach((row) => {
    console.log(row.join(" "));
  });
};

console.log("Part one:", getOccupiedSeats(4, getSeatsAround));
console.log("Part two:", getOccupiedSeats(5, getSeatsInSight));
