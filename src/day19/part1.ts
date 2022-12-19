import { parseInput } from "../util";
const input = parseInput({
  split: {
    delimiter: "\n",
    mapper: (value: string) => value.split(/[.:]/),
  },
});

const MAX_TIME = 24;

const parseBlueprint = (input: string[][]) => {
  const restrictions: number[] = [0, 0, 0];
  const blueprints = [];

  for (let i = 0; i < input.length; i++) {
    const [
      blueprintInfo,
      oreRobotInfo,
      clayRobotInfo,
      obsidianRobotInfo,
      geodeRobotInfo,
    ] = input[i];

    const [obsidianRobotOreCost, obsidianRobotCleyCost] =
      parseInfo(obsidianRobotInfo);
    const [geodeRobotOreCost, geodeRobotObsidianCost] =
      parseInfo(geodeRobotInfo);
  }

  return restrictions;
};

const parseInfo = (info: string) => {
  const match = info.matchAll(/\d+/g) || [];
  return Array.from(match).map((match) => Number(match[0]));
};

const testBlueprint = (time: number, resources: number[], robots: [], restrictions: number[]) => {
    if (time === 0) {
      return resources[3]; //geode
    }


  
};

const blueprints = parseBlueprint(input);

export default "";

// В каждую минуту мы можем проверять количество роботов и руды
// Добавлять для следующей минуты все возможные комбинации роботов + руды
// Нам не нужно больше роботов и руды, чем по итогу руды
// Ищем из всего этого максимальное
// bfs с нюансами :) Граф из возможных вариантов
