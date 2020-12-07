import fs from "fs";
import path from "path";

const lines = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .split("\n");

const graph: Record<string, string[]> = lines.reduce((memo, line) => {
  const [head, tail] = line.split(" bags contain ");
  const parts = tail.match(/[0-9]+ [\w\s]+ bags?/g);
  memo[head] = parts?.map((part) => {
    const matches = part.match(/([0-9]+) ([\w\s]+) bags?/);
    return matches[2];
  });
  return memo;
}, {});

const find = (
  graph: Record<string, string[]>,
  key: string,
  needle: string
): boolean => {
  if (!graph[key]) {
    return false;
  }

  if (graph[key]?.includes(needle)) {
    return true;
  }

  return graph[key].some((child) => find(graph, child, needle));
};

const bagsThatHoldGoldBags = Object.keys(graph).reduce(
  (count, graphKey) =>
    find(graph, graphKey, "shiny gold") ? count + 1 : count,
  0
);

console.log("Part one:", bagsThatHoldGoldBags);
