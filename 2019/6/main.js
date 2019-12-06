const fs = require("fs");

const inputLines = fs
  .readFileSync(__dirname + "/input.txt", "utf8")
  .split("\n")
  .filter(Boolean);

function parseInputLinesToGraph(inputLines) {
  return inputLines.reduce((graph, inputLine) => {
    const [parent, child] = inputLine.split(")");

    if (graph[child]) {
      graph[child].push(parent);
    } else {
      graph[child] = [parent];
    }

    return graph;
  }, {});
}

function sum(array) {
  return array.reduce((count, item) => count + item, 0);
}

function getOrbits(graph) {
  return sum(
    Object.keys(graph).map(currentOrbit => {
      let nextOrbit = graph[currentOrbit];
      let count = 0;

      while (nextOrbit) {
        nextOrbit = graph[nextOrbit];
        count += 1;
      }

      return count;
    })
  );
}

const graph = parseInputLinesToGraph(inputLines);
console.log(getOrbits(graph));
