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
  neighbours: string[];
  pathes: Map<string, number>;
  constructor(id: string, rate: number, neighbours: string[]) {
    this.id = id;
    this.rate = rate;
    this.neighbours = neighbours;
    this.pathes = new Map();
  }
}

export const START = "AA";
export const TEAM_TIME = 26;
const TIME = 30;
const MOVE_COST = 1;
const OPEN_COST = 1;

const getNodeMap = (input: string[][]) => {
  const nodeMap: Map<string, Node> = new Map();
  const openned: Set<string> = new Set();

  for (let i = 0; i < input.length; i++) {
    const [info, neighboursInfo] = input[i];
    const { id, rate } = parseInfo(info);
    const neighbours = parseNeighbours(neighboursInfo);

    nodeMap.set(id, new Node(id, rate, neighbours));
    if (rate === 0) {
      openned.add(id); // Let's assume that nodes with zero-rate are already open
    }
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

  return { nodeMap, openned };
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

export const getPressure = (
  graph: Map<string, Node>,
  start: string,
  pressure: number,
  time: number,
  openned: Set<string>,
  isTeamWork: boolean = false
) => {
  const results: number[] = [];
  const current = graph.get(start);
  if (time === 0 || !current) {
    return pressure;
  }
  const pathes = current.pathes;

  pathes.forEach((distance, id) => {
    // Search all possible pathes
    const next = graph.get(id);
    if (next && !openned.has(id) && time > distance) {
      const nextOpenned = new Set(openned).add(id); // Otherwise, mutate
      const nextTime = time - distance - OPEN_COST;
      const nextPressure = pressure + next.rate * nextTime;
      results.push(
        getPressure(graph, id, nextPressure, nextTime, nextOpenned, isTeamWork)
      );
      if (isTeamWork) {
        // You and another player take a turn one by one.
        // He know witch node you visited (nextOpenned) and know about current pressure (nextPressure)
        // But he has as much time as you have before and start from same point (TEAM_TIME, START)
        results.push(
          getPressure(
            graph,
            START,
            nextPressure,
            TEAM_TIME,
            nextOpenned
          )
        ); // Can be oprimized by finding all openned points after your turn (then getPressure for team need be run only one time)
      }
    }
  });
  return Math.max(pressure, ...results); // Get most effective path
};

export const { nodeMap, openned } = getNodeMap(input);
export default getPressure(nodeMap, START, 0, TIME, openned);
