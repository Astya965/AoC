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
  let start: string | null = null;
  let end: string | null = null;

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
      const neighbours = new Map();
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
};

const isReachable = (current: string, neighbour: string) => {
  if (neighbour === "S" || neighbour === "E" || current === "S" || current === "E" ) {
    return true;
  }
  return Math.abs(current.charCodeAt(0) - neighbour.charCodeAt(0)) <= 1; // If reachable distance = 1, else = -1
};

const findPath = (
  start: string | null,
  end: string | null,
  graph: Map<string, Map<string, number>>
) => {
  if (!start || !end) {
    return new Map();
  }

  const processed: string[] = [];
  const costs: Map<string, number> = new Map();
  costs.set(start, 0);
  const route: Map<string, string> = new Map();
  const startNeighbours: Map<string, number> = graph.get(start) || new Map();
  startNeighbours.forEach((_, key) => {
    route.set(key, start);
  });

  let node = getLowestCostNode(costs, processed);

  let cost = 0;
  let newCost = 0;
  let neighbours: Map<string, number> = new Map();

  while (node) {
    neighbours = graph.get(node) || new Map();
    cost = costs.get(node) ?? Infinity;
    neighbours.forEach((neighbourCost, neighbourCoords) => {
      if (!costs.has(neighbourCoords)) {
        costs.set(neighbourCoords, Infinity);
      }
      newCost = cost + neighbourCost;
      if ((costs.get(neighbourCoords) ?? Infinity) > newCost) {
        costs.set(neighbourCoords, newCost);
        route.set(neighbourCoords, node || "");
      }
    });

    if (node === end) {
      break;
    }
    processed.push(node);
    node = getLowestCostNode(costs, processed);
  }

  return route;
};

const getLowestCostNode = (
  costs: Map<string, number>,
  proccessed: string[]
) => {
  let lowestCost = Infinity;
  let lowestCostNode = null;

  costs.forEach((cost: number, coords: string) => {
    if (cost < lowestCost && !proccessed.includes(coords)) {
      lowestCost = cost;
      lowestCostNode = coords;
    }
  });
  return lowestCostNode;
};

const { graph, start, end } = getGraphInfo(input);
export default findPath(start, end, graph);

// const start = "0,0";
// const end = "3,4";

// const getPathFromEnd = (
//   route: Map<string, string>,
//   start: string | null,
//   end: string | null
// ) => {
//   if (!start || !end) {
//     return;
//   }
//   let currentNode: string = end;
//   const points = [end];
//   while (currentNode !== start) {
//     currentNode = route.get(currentNode) || "";
//     points.push(currentNode);
//   }
//   console.log(points.join(" ---> "));
//   return points.length - 1;
// };

// export default getPathFromEnd(findPath(start, end, graph), start, end);
