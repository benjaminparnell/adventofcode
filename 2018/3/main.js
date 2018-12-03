const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");

function getParts(identifier) {
  const [id, x, y, width, height] = identifier
    .match(/#([0-9]+) @ ([0-9]+),([0-9]+): ([0-9]+)x([0-9]+)/)
    .slice(1, 6)
    .map(n => parseInt(n, 10));
  return { id, x, y, width, height };
}

function getSquareCoordinates(xCoord, yCoord, width, height) {
  const coordinates = [];

  for (let x = xCoord; x < xCoord + width; x++) {
    for (let y = yCoord; y < yCoord + height; y++) {
      coordinates.push(`${x},${y}`);
    }
  }

  return coordinates;
}

function findOverlaps(identifiers) {
  const fabricMap = identifiers.reduce((memo, identifier) => {
    const { x, y, width, height } = getParts(identifier);
    return getSquareCoordinates(x, y, width, height).reduce(
      (coordinateMemo, coordinate) => {
        if (coordinateMemo[coordinate]) {
          coordinateMemo[coordinate] = coordinateMemo[coordinate] + 1;
        } else {
          coordinateMemo[coordinate] = 1;
        }
        return coordinateMemo;
      },
      memo
    );
  }, {});

  return Object.keys(fabricMap).reduce(
    (memo, key) => (fabricMap[key] > 1 ? memo + 1 : memo),
    0
  );
}

const identifiers = input.split("\n").filter(Boolean);

console.log(findOverlaps(identifiers));
