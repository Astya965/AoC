import { parseInput } from "../util";
const input = parseInput({
  split: {
    delimiter: "\n",
    mapper: (value: string) => value.split(";"),
  },
});

const START = "AA";
const MINUTES = 30;
const MOVE_COST = 1;
const OPEN_COST = 1;

const getNodeMap = (input: string[][]) => {
  const nodeCosts: Map<string, number> = new Map();
  const nodeRate: Map<string, number> = new Map();
  const nodeMap: Map<string, string[]> = new Map();

  for (let i = 0; i < input.length; i++) {
    const [info, neighboursInfo] = input[i];
    const { name, rate } = parseInfo(info);
    const neighbours = parseNeighbours(neighboursInfo);

    nodeRate.set(name, rate);
    nodeCosts.set(name, MINUTES - rate + MOVE_COST);
    nodeMap.set(name, neighbours);
  }
  return { nodeMap, nodeCosts, nodeRate };
};

const parseNeighbours = (neighboursInfo: string) => {
  const match = neighboursInfo.matchAll(/([A-Z]{2})/g) || [];
  return Array.from(match).map((value) => value[0]);
};

const parseInfo = (info: string) => {
  const match = info.match(/([A-Z]{2})\D*(\d+)/) || [];
  const [, name, rate] = match;
  return { name: name || "", rate: Number(rate) };
};

const getPressure = (
  start: string,
  nodeMap: Map<string, string[]>,
  nodeCosts: Map<string, number>,
  nodeRate: Map<string, number>
) => {
  const costs: Map<string, number> = new Map();
  const processed: Set<string> = new Set();
  const route: Map<number, string> = new Map();
  let counter = 0;
  let pressure = 0;

  costs.set(start, 0);

  let node = getLowestCostNode(costs, nodeRate, processed);
  while (node && counter <= MINUTES) {
    const currentCost = costs.get(node) ?? Infinity;
    const neighbours = nodeMap.get(node) || [];
    neighbours.forEach((neighbour) => {
      const oldCost = costs.get(neighbour) ?? Infinity;
      let newCost = currentCost + (nodeCosts.get(neighbour) ?? Infinity);
      if (newCost < oldCost) {
        costs.set(neighbour, newCost);
      }
    });

    counter += MOVE_COST;
    if (node) {
      if ((nodeRate.get(node) || 0) > 0) {
        counter += OPEN_COST;
        if (counter <= MINUTES) {
          route.set(counter, node);
        }
      }
    }

    processed.add(node);
    node = getLowestCostNode(costs, nodeRate, processed);
  }

  console.log(route);
  route.forEach((node, openMinute) => {
    const rate = nodeRate.get(node) || 0;
    pressure += rate * (MINUTES - openMinute);
  });

  return pressure;
};

const getLowestCostNode = (
  costs: Map<string, number>,
  rates: Map<string, number>,
  processed: Set<string>
) => {
  let lowestCost = Infinity;
  let lowestNode = null;
  const biggestRate = 0;

  costs.forEach((cost, coordinates) => {
    if (
      (cost ?? Infinity) <= lowestCost &&
      (rates.get(coordinates) || 0) >= biggestRate &&
      !processed.has(coordinates)
    ) {
      lowestCost = cost;
      lowestNode = coordinates;
    }
  });
  return lowestNode;
};

const { nodeMap, nodeCosts, nodeRate } = getNodeMap(input);

export default getPressure(START, nodeMap, nodeCosts, nodeRate);
