import fs from "fs";
import path from "path";

const lines = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .split("\n");

interface BagNode {
  name: string;
  quantity: number;
}
type BagGraph = Record<string, BagNode[]>;

const graph = lines.reduce<BagGraph>((memo, line) => {
  const [head, tail] = line.split(" bags contain ");
  const parts = tail.match(/[0-9]+ [\w\s]+ bags?/g);
  memo[head] = parts?.map((part) => {
    const matches = part.match(/([0-9]+) ([\w\s]+) bags?/);
    return {
      quantity: parseInt(matches[1], 10),
      name: matches[2],
    };
  });
  return memo;
}, {});

const find = (graph: BagGraph, start: string, target: string): boolean => {
  if (!graph[start]) {
    return false;
  }

  if (graph[start]?.some((bagNode) => bagNode.name === target)) {
    return true;
  }

  return graph[start].some((child) => find(graph, child.name, target));
};

const bagsThatHoldGoldBags = Object.keys(graph).reduce(
  (count, graphKey) =>
    find(graph, graphKey, "shiny gold") ? count + 1 : count,
  0
);

console.log("Part one:", bagsThatHoldGoldBags);

const getBagCounts = (graph: BagGraph, key: string): number => {
  if (!graph[key]) {
    return 0;
  }

  return graph[key].reduce(
    (count, child) =>
      count + child.quantity * (getBagCounts(graph, child.name) + 1),
    0
  );
};

const bagsInGoldBag = getBagCounts(graph, "shiny gold");

console.log("Part two:", bagsInGoldBag);
