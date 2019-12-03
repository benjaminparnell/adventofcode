const fs = require("fs");

const Directions = {
  UP: "U",
  DOWN: "D",
  LEFT: "L",
  RIGHT: "R"
};

function mapInputLine(inputLine) {
  return inputLine.split(",").map(instruction => {
    const [direction, ...distance] = instruction;

    return {
      direction,
      distance: parseInt(distance.join(""), 10)
    };
  });
}

function getCoordinatesForWire(wire) {
  const currentPosition = { x: 0, y: 0 };
  const points = new Set();

  for (let point of wire) {
    for (let index = 0; index < point.distance; index++) {
      switch (point.direction) {
        case Directions.UP: {
          currentPosition.y++;
          break;
        }
        case Directions.DOWN: {
          currentPosition.y--;
          break;
        }
        case Directions.LEFT: {
          currentPosition.x++;
          break;
        }
        case Directions.RIGHT: {
          currentPosition.x--;
          break;
        }
      }
      points.add(`${currentPosition.x},${currentPosition.y}`);
    }
  }

  return points;
}

function findCrossingPoints(wireA, wireB) {
  const wireACoordinates = getCoordinatesForWire(wireA);
  const wireBCoordinates = getCoordinatesForWire(wireB);

  return Array.from(wireACoordinates)
    .filter(point => wireBCoordinates.has(point))
    .reduce((lowestDistance, point) => {
      const [x, y] = point
        .split(",")
        .map(coord => Math.abs(parseInt(coord, 10)));
      const distance = x + y;

      if (!lowestDistance || distance < lowestDistance) {
        return distance;
      }
      return lowestDistance;
    }, null);
}

const [wireA, wireB] = fs
  .readFileSync(__dirname + "/input.txt", "utf8")
  .split("\n")
  .map(mapInputLine);

console.log(findCrossingPoints(wireA, wireB));
