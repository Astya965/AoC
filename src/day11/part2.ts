import { parseInput } from "../util";
import { getMonkeyBusiness, playMonkeyGame, setMonkeys } from "./part1";
export const input = parseInput({
  split: { delimiter: "\n\n", mapper: false },
});

const ROUNDS_COUNT = 10000;

const monkeyList = setMonkeys(input);
// Each monkey participate in game, so probably in some moment each divider will be used
const commonDivider = monkeyList.reduce((acc, cur) => acc * cur.divider, 1);

export default getMonkeyBusiness(
  playMonkeyGame(monkeyList, ROUNDS_COUNT, commonDivider)
);
