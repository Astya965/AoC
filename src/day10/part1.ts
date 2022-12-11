import { parseInput } from "../util";
const input = parseInput({
  split: { delimiter: "\n", mapper: false },
});

const START_VALUE = 1;
const EMPTY_CYCLE = "noop";
const SIGNAL_CYCLE_VALUE = 20;
const SIGNAL_CYCLE_SHIFT = 40;

const getRegisterValues = (input: string[]) => {
  let registerValue: number = START_VALUE;
  let registerValues: Map<number, number> = new Map();
  let cyclesCount: number = 0;

  for (let i = 0; i < input.length; i++) {
    if (input[i] === EMPTY_CYCLE) {
      cyclesCount++;
      registerValues.set(cyclesCount, registerValue);
    } else {
      const [, value] = input[i].split(" ");
      cyclesCount++;
      registerValues.set(cyclesCount, registerValue);
      cyclesCount++;
      registerValues.set(cyclesCount, registerValue);
      registerValue += Number(value);
    }
  }
  return registerValues;
};

const getSignalCycleValues = (registerValues: Map<number, number>) => {
  return Array.from(registerValues.entries())
    .filter(
      ([cycle,]) =>
        cycle === SIGNAL_CYCLE_VALUE ||
        cycle % SIGNAL_CYCLE_SHIFT === SIGNAL_CYCLE_VALUE //20th, 60th, 100th, 140th, 180th, and 220th
    )
    .reduce((acc, [cycle, value]) => acc + cycle * value, 0);
};

const registerValues = getRegisterValues(input)

export default getSignalCycleValues(registerValues);
