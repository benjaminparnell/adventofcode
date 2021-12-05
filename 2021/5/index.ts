import fs from "fs";
import path from "path";

const lines = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .split("\n")
  .filter(Boolean);

type Point = {
  x: number;
  y: number;
};

type Grid = Map<string, number>;

const isHorizontal = (pointA: Point, pointB: Point): boolean => {
  return pointA.y === pointB.y;
};

const isVertical = (pointA: Point, pointB: Point): boolean => {
  return pointA.x === pointB.x;
};

const parsePoint = (pointString: string): Point => {
  const [x, y] = pointString.split(",").map((i) => parseInt(i, 10));
  return { x, y };
};

const parsePoints = (line: string): [Point, Point] => {
  const [partA, partB] = line.split(" -> ");
  return [parsePoint(partA), parsePoint(partB)];
};

const incrementPoint = (grid: Grid, x: number, y: number) => {
  const pointString = `${x},${y}`;
  if (!grid.has(pointString)) {
    grid.set(pointString, 0);
  }
  return grid.set(pointString, grid.get(pointString) + 1);
};

const grid = lines.reduce<Grid>((memo, line) => {
  let [pointA, pointB] = parsePoints(line);

  if (isHorizontal(pointA, pointB)) {
    if (pointA.x > pointB.x) {
      let swap = pointA;
      pointA = pointB;
      pointB = swap;
    }
    for (let index = pointA.x; index < pointB.x + 1; index++) {
      memo = incrementPoint(memo, index, pointA.y);
    }
    return memo;
  }

  if (isVertical(pointA, pointB)) {
    if (pointA.y > pointB.y) {
      let swap = pointA;
      pointA = pointB;
      pointB = swap;
    }
    for (let index = pointA.y; index < pointB.y + 1; index++) {
      memo = incrementPoint(memo, pointA.x, index);
    }
    return memo;
  }

  return memo;
}, new Map<string, number>());

let overlaps = 0;
grid.forEach((value) => {
  if (value > 1) {
    overlaps++;
  }
});
console.log(overlaps);
