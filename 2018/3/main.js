const fs = require("fs");
const path = require("path");
const { count } = require('../utils');

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

function getFabricMap(identifiers) {
  return identifiers.reduce((memo, identifier) => {
    const { x, y, width, height } = getParts(identifier);
    return count(getSquareCoordinates(x, y, width, height), memo);
  }, {});
}

function findOverlaps(identifiers) {
  const fabricMap = getFabricMap(identifiers);
  return Object.keys(fabricMap).reduce(
    (memo, key) => (fabricMap[key] > 1 ? memo + 1 : memo),
    0
  );
}

function findNoOverlaps(identifiers) {
  const fabricMap = getFabricMap(identifiers);
  const result = identifiers.find(identifier => {
    const { id, x, y, width, height } = getParts(identifier);
    return getSquareCoordinates(x, y, width, height).every(
      coordinate => fabricMap[coordinate] === 1
    );
  });

  if (result) {
    return getParts(result).id;
  }

  return null;
}

const identifiers = input.split("\n").filter(Boolean);

console.log(
  `${findOverlaps(
    identifiers
  )} inches of the fabric have at least 2 overlapping claims`
);
console.log(
  `Claim with ID ${findNoOverlaps(
    identifiers
  )} has no overlaps with any other claim`
);
