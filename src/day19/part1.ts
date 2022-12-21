import { parseInput } from "../util";
const input = parseInput({
  split: {
    delimiter: "\n",
    mapper: (value: string) => value.split(/[.:]/),
  },
});

type TState = {
  resources: number[],
  robots: number[],
  time: number
};

const MAX_TIME = 24;

export const parseBlueprint = (input: string[][]): number[][][] => {
  const blueprints: number[][][] = [];
  const indexs: Map<string, number> = new Map();
  indexs.set("ore", 0);
  indexs.set("clay", 1);
  indexs.set("obsidian", 2);

  for (let i = 0; i < input.length; i++) {
    // First sentance is not instruction
    const blueprint = input[i].slice(1, input[i].length - 1).map((instruction) => {
      const costs = [0, 0, 0, 0];
      Array.from(instruction.matchAll(/(\d+) (\w+)/g)).forEach(
        ([_, cost, type]) => {
          costs[indexs.get(type) || 0] = Number(cost);
        }
      );
      return costs;
    });
    blueprints.push(blueprint);
  }
  return blueprints;
};

// bfs
export const testBlueprint = (blueprint: number[][], timeAvailable: number): number => {
  const queue = [
    {
      resources: [0, 0, 0, 0],
      robots: [1, 0, 0, 0],
      time: timeAvailable,
    } as TState
  ];
  let max = 0;

  while (queue.length > 0) {
    const current = queue.pop();
    if (!current) {
      break;
    }
    let { resources, robots, time } = current;

    max = Math.max(max, resources[3] + robots[3] * time); // Can be produced by geode robot without building new one

    blueprint.forEach((requirements, robotType) => { // Build new robots
      let buildTime = 1;

      requirements.forEach((cost, type) => { // Skip time to moment when we get enough resources for one robot
        const timeForResource = Math.ceil((cost - resources[type]) / robots[type]);
        if (cost > 0) {
          buildTime = Math.max(buildTime, timeForResource + 1);
        };
      });

      if (buildTime < time) {
        const nextResources = [...resources];
        const nextRobots = [...robots];

        requirements.forEach((cost, r) => {
          nextResources[r] += robots[r] * buildTime - cost;
        });
        nextRobots[robotType]++;

        queue.push({ // Add new state
          resources: nextResources,
          robots: nextRobots,
          time: time - buildTime,
        });
      }
    });
  }

  return max;
};

const blueprints = parseBlueprint(input);

export default blueprints.reduce(
  (acc: number, blueprint: number[][], i: number) =>
    acc + (i + 1) * testBlueprint(blueprint, MAX_TIME),
  0
);
