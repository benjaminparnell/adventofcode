import fs from "fs";
import path from "path";

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
