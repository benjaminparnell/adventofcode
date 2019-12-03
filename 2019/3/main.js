const fs = require("fs");

const Directions = {
  UP: "U",
  DOWN: "D",
  LEFT: "L",
  RIGHT: "R"
};

function mapInputLine(inputLine) {
  return inputLine.split(",").map(([direction, ...distance]) => ({
    direction,
    distance: parseInt(distance.join(""), 10)
  }));
}

function getCoordinatesForWire(wire) {
  const currentPosition = { x: 0, y: 0 };
  return wire.reduce((coordinates, point) => {
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
      coordinates.push(`${currentPosition.x},${currentPosition.y}`);
    }
    return coordinates;
  }, []);
}

function findCrossingPoints(wireA, wireB) {
  return wireA.filter(point => wireB.includes(point));
}

function getTaskOneDistance(crossingPoints) {
  return crossingPoints.reduce((lowestDistance, point) => {
    const [x, y] = point.split(",").map(coord => Math.abs(parseInt(coord, 10)));
    const distance = x + y;

    if (!lowestDistance || distance < lowestDistance) {
      return distance;
    }
    return lowestDistance;
  }, null);
}

function getTaskTwoDistance(crossingPoints, wireA, wireB) {
  return Math.min(
    ...crossingPoints.map(
      crossingPoint =>
        wireA.indexOf(crossingPoint) + wireB.indexOf(crossingPoint) + 2
    )
  );
}

const [wireA, wireB] = fs
  .readFileSync(__dirname + "/input.txt", "utf8")
  .split("\n")
  .map(mapInputLine)
  .map(getCoordinatesForWire);

const crossingPoints = findCrossingPoints(wireA, wireB);

console.log(getTaskOneDistance(crossingPoints));
console.log(getTaskTwoDistance(crossingPoints, wireA, wireB));
