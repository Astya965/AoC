import { parseInput } from "../util";

// Grid 144x40
const input = parseInput({
  split: {
    delimiter: "\n",
    mapper: (value: string) => value.split(""),
  },
});

const getGraphInfo = (input: string[][]) => {
  const graph: Map<string, Map<string, number>> = new Map();
  let start: string = "0,0";
  let end: string = "0,0";

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
      const neighbours: Map<string, number> = new Map();
      setNeighbours(x, y, input, neighbours);
      graph.set(`${x},${y}`, neighbours);

      if (input[y][x] === "S") {
        start = `${x},${y}`;
      }
      if (input[y][x] === "E") {
        end = `${x},${y}`;
      }
    }
  }
  return {
    graph,
    start,
    end,
  };
};

const setNeighbours = (
  x: number,
  y: number,
  input: string[][],
  neighbours: Map<string, number>
) => {
  const currentValue = input[y][x];

  if (y > 0 && isReachable(currentValue, input[y - 1][x])) {
    neighbours.set(`${x},${y - 1}`, 1); //upper value
  }
  if (y < input.length - 1 && isReachable(currentValue, input[y + 1][x])) {
    neighbours.set(`${x},${y + 1}`, 1); // down value
  }
  if (x > 0 && isReachable(currentValue, input[y][x - 1])) {
    neighbours.set(`${x - 1},${y}`, 1); //left value
  }
  if (x < input[0].length - 1 && isReachable(currentValue, input[y][x + 1])) {
    neighbours.set(`${x + 1},${y}`, 1); //right value
  }
  return neighbours;
};

const isReachable = (current: string, neighbour: string) => {
  let currentCode = current.charCodeAt(0);
  let neighbourCode = neighbour.charCodeAt(0);
  if (current === "S") {
    currentCode = "a".charCodeAt(0);
  } else if (current === "E") {
    currentCode = "z".charCodeAt(0);
  }
  if (neighbour === "S") {
    neighbourCode = "a".charCodeAt(0);
  } else if (neighbour === "E") {
    neighbourCode = "z".charCodeAt(0);
  }
  return Math.abs(currentCode - neighbourCode) <= 1; // If reachable distance = 1, else = -1
};

// Dijkstra’s algorithm
const shortPath = (
  graph: Map<string, Map<string, number>>,
  start: string,
  end: string
) => {
  const costs: Map<string, number> = new Map();
  const processed: Set<string> = new Set();
  costs.set(start, 0);

  let node = getLowestCostNode(costs, processed);
  while (node) {
    const currentCost = costs.get(node) ?? Infinity;
    const neighbours = graph.get(node) || new Map();
    neighbours.forEach((neighboursCost, neighboursCoordinates) => {
      const oldCost = costs.get(neighboursCoordinates) ?? Infinity;
      let newCost = currentCost + neighboursCost;
      if (newCost < oldCost) {
        costs.set(neighboursCoordinates, newCost); // Update lowest cost for node
      }
    });
    processed.add(node);
    if (getLowestCostNode(costs, processed) == null) {
        console.log(node);
        console.log(Array.from(neighbours.keys()).every(node => processed.has(node)));
    }
    node = getLowestCostNode(costs, processed);
  }
  return costs.get(end) || Infinity;
};

const getLowestCostNode = (
  costs: Map<string, number>,
  processed: Set<string>
) => {
  let lowestCost = Infinity;
  let lowestNode = null;

  costs.forEach((cost, coordinates) => {
    if (cost < lowestCost && !processed.has(coordinates)) {
      lowestCost = cost;
      lowestNode = coordinates;
    }
  });
  return lowestNode;
};

const { graph, start, end } = getGraphInfo(input);
console.log("Start: " + start);
console.log("End: " + end);
export default shortPath(graph, start, end);
