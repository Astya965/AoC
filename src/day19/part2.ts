import { parseBlueprint, testBlueprint } from "./part1";
import { parseInput } from "../util";
const input = parseInput({
  split: {
    delimiter: "\n",
    mapper: (value: string) => value.split(/[.:]/),
  },
});

const MAX_TIME = 32;

const blueprints = parseBlueprint(input);

export default blueprints
  .slice(0, 3)
  .reduce(
    (acc: number, blueprint: number[][]) => {
        console.log(testBlueprint(blueprint, MAX_TIME));
        return acc * testBlueprint(blueprint, MAX_TIME);
    },
    1
  );
