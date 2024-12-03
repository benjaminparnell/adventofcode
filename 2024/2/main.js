const { readFileSync } = require("fs");

const fileContents = readFileSync("./input.txt", "utf-8");
const fileLines = fileContents.split("\n");
const inputLines = fileLines.map((line) =>
  line.split(" ").map((item) => Number.parseInt(item, 10))
);

const isDecreasing = (item, index, array) => {
  if (!array[index - 1]) {
    return item > array[index + 1] && item - array[index + 1] <= 3;
  }
  return item < array[index - 1] && array[index - 1] - item <= 3;
};

const isIncreasing = (item, index, array) => {
  if (!array[index - 1]) {
    return item < array[index + 1] && array[index + 1] - item <= 3;
  }
  return item > array[index - 1] && item - array[index - 1] <= 3;
};

const safeLines = inputLines.filter((line) => {
  let unsafeDecreasing = 0;
  let unsafeIncreasing = 0;
  const increasing = line.every((item, index, array) => {
    const result = isIncreasing(item, index, array);

    if (!result) {
      const unsafe = line
        .filter((_, filterIndex) => filterIndex !== index)
        .every(isIncreasing);

      if (unsafe) {
        unsafeIncreasing++;
      }

      return unsafe;
    }
    return result;
  });
  const decreasing = line.every((item, index, array) => {
    const result = isDecreasing(item, index, array);

    if (!result) {
      const unsafe = line
        .filter((_, filterIndex) => filterIndex !== index)
        .every(isDecreasing);

      if (unsafe) {
        unsafeDecreasing++;
      }

      return unsafe;
    }

    return result;
  });
  return (
    increasing || unsafeIncreasing === 1 || decreasing || unsafeDecreasing === 1
  );
});

console.log("valid lines", safeLines.length);
