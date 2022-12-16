import { parseInput } from "../util";
const input = parseInput({
  split: {
    delimiter: "\n",
    mapper: (value: string) => value.split(";"),
  },
});

class Node {
  id: string;
  rate: number;
  open: boolean;
  neighbours: string[];
  pathes: Map<string, number>;
  constructor(id: string, rate: number, neighbours: string[], open: boolean) {
    this.id = id;
    this.rate = rate;
    this.open = open; // Let's assume that nodes with zero-rate are already open
    this.neighbours = neighbours;
    this.pathes = new Map();
  }
}

const START = "AA";
const MINUTES = 30;
const MOVE_COST = 1;
const OPEN_COST = 1;

const getNodeMap = (input: string[][]) => {
  const nodeMap: Map<string, Node> = new Map();

  for (let i = 0; i < input.length; i++) {
    const [info, neighboursInfo] = input[i];
    const { id, rate } = parseInfo(info);
    const neighbours = parseNeighbours(neighboursInfo);

    nodeMap.set(id, new Node(id, rate, neighbours, rate === 0));
  }

  nodeMap.forEach((node, id) => {
    nodeMap.forEach((anotherNode, anotherNodeId) => {
      if (id !== anotherNodeId) {
        node.pathes.set(
          anotherNode.id,
          getDistance(nodeMap, id, anotherNodeId)
        );
      }
    });
  });
  return nodeMap;
};

const parseNeighbours = (neighboursInfo: string) => {
  const match = neighboursInfo.matchAll(/([A-Z]{2})/g) || [];
  return Array.from(match).map((value) => value[0]);
};

const parseInfo = (info: string) => {
  const match = info.match(/([A-Z]{2})\D*(\d+)/) || [];
  const [, id, rate] = match;
  return { id: id || "", rate: Number(rate) };
};

const getDistance = (graph: Map<string, Node>, start: string, end: string) => {
  const costs: Map<string, number> = new Map();
  const visited: Set<string> = new Set();
  const queue: string[] = [];

  costs.set(start, 0);
  queue.push(start);

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current) {
      break;
    }

    const currentCost = costs.get(current) ?? Infinity;
    if (current === end) {
      return currentCost;
    }
    const neighbours = graph.get(current)?.neighbours || [];
    neighbours.forEach((neighbour) => {
      const oldCost = costs.get(neighbour) ?? Infinity;
      const newCost = currentCost + MOVE_COST;
      if (newCost < oldCost) {
        costs.set(neighbour, newCost);
      }
      if (!visited.has(neighbour)) {
        queue.push(neighbour);
      }
    });
    visited.add(current);
  }
  return Infinity;
};

const getPressure = (
  graph: Map<string, Node>,
  start: string,
  pressure: number,
  time: number
) => {
  const results: number[] = [];
  const current = graph.get(start);
  if (time === 0 || !current) {
    return pressure;
  }
  current.open = true;
  const pathes = current.pathes;

  pathes.forEach((distance, id) => {
    const next = graph.get(id);
    if (next && !next.open && time > distance) {
      const nextTime = time - distance - OPEN_COST;
      const nextPressure = pressure + next.rate * nextTime;
      results.push(getPressure(graph, id, nextPressure, nextTime));
    }
  });
  return Math.max(pressure, ...results);
};

const nodeMap = getNodeMap(input);

Array.from(nodeMap.values()).map((node) =>
  console.log(`Node:
    id = ${node.id},
    rate = ${node.rate},
    neighbours = ${node.neighbours},
    pathes = ${Array.from(node.pathes.entries())}
`)
);

export default getPressure(nodeMap, START, 0, MINUTES);
