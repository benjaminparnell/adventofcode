import fs from "fs";
import path, { join } from "path";

const [earliestTimestampString, busIdString] = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .split("\n");

const earliestTimestamp = parseInt(earliestTimestampString, 10);
const budsIds = busIdString
  .split(",")
  .filter((id) => id !== "x")
  .map((id) => parseInt(id, 10));

const difference = (a: number, b: number) => {
  if (a > b) {
    return a - b;
  } else {
    return b - a;
  }
};

const closestBusWithTime = budsIds
  .map((id) => {
    let timestamp = 0;

    while (timestamp < earliestTimestamp) {
      timestamp += id;
    }

    return [id, timestamp];
  })
  .reduce<[busId: number, timestamp: number, minutes: number]>(
    (memo, [busId, timestamp]) => {
      if (
        difference(earliestTimestamp, timestamp) <
          difference(earliestTimestamp, memo[1]) &&
        timestamp > earliestTimestamp
      ) {
        return [busId, timestamp, difference(earliestTimestamp, timestamp)];
      }
      return memo;
    },
    [0, 0, 0]
  );

console.log("Part one:", closestBusWithTime[0] * closestBusWithTime[2]);

const allBusIds = busIdString.split(",").map((id) => {
  if (Number.isInteger(+id)) {
    return parseInt(id, 10);
  }
  return id;
});

let index = 0;
let found = false;

const idsAndIndexes = budsIds.map((id) => [id, allBusIds.indexOf(id)]);

console.log(idsAndIndexes.map(([id, index]) => budsIds[0] + index).join(" "));

while (!found) {
  let timestamp = index * 6_448_858_020;
  const gaps = idsAndIndexes.map(([id, idIndex]) => {
    return (timestamp + idIndex) % id;
  });
  if (gaps.every((gap) => gap === 0)) {
    found = true;
  } else {
    index++;
    if (index % 20_000_000 === 0) {
      console.log(index);
    }
  }
}

console.log(index * budsIds[0]);
