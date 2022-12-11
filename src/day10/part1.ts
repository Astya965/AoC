import { parseInput } from "../util";
const input = parseInput({
  split: { delimiter: "\n", mapper: false },
});

const START_VALUE = 1;
const FIRST_CHECK = 20;
const LAST_CHECK = 220;
const CHECK_STEP = 40;
const EMPTY_CYCLE = "noop";

const getCycleValues = (input: string[]) => {
  let registerValue: number = START_VALUE;
  let cyclesCount: number = 0;
  let cycleValues: number[] = [];

  for (let i = 0; i < input.length; i++) {
    if (input[i] === EMPTY_CYCLE) {
        cyclesCount = updateCycle(registerValue, cyclesCount, cycleValues);
    } else {
        const [, value] = input[i].split(" ");
        cyclesCount = updateCycle(registerValue, cyclesCount, cycleValues);
        cyclesCount = updateCycle(registerValue, cyclesCount, cycleValues);
        registerValue += Number(value);
    }
  }

  console.log(cycleValues);
  return cycleValues;
};

const updateCycle = (registerValue: number, cyclesCount: number, cycleValues: number[]) => {
    cyclesCount++
    checkCycleCount(registerValue, cyclesCount, cycleValues);
    return cyclesCount;
}

const checkCycleCount = (registerValue: number, cyclesCount: number, cycleValues: number[]) => {
    //20th, 60th, 100th, 140th, 180th, and 220th
    if (cyclesCount >= FIRST_CHECK && cyclesCount <= LAST_CHECK && (cyclesCount % CHECK_STEP === FIRST_CHECK)) {
        cycleValues.push(registerValue * cyclesCount);
    }
};

export default getCycleValues(input).reduce((acc, cur) => acc + cur, 0);
