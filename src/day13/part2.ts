import { parseInput } from "../util";
import { comparePair } from "./part1";

const dividerPacket1 = "[[2]]";
const dividerPacket2 = "[[6]]";

const input = parseInput({
  split: {
    delimiter: "\n",
    mapper: false,
  },
}).filter((value) => Boolean(value));
input.push(dividerPacket1);
input.push(dividerPacket2);

const sortSignal = (input: string[]) => {
  const sorted: string[] = input.sort((v1: string, v2: string): number => {
    const left = JSON.parse(v1);
    const right = JSON.parse(v2);
    const test = comparePair(left, right);
    if (test === false) {
      return 1;
    } else if (test === true) {
      return -1;
    } else {
      return 0;
    }
  });
  const firstNumber = sorted.findIndex((value) => value === dividerPacket1) + 1;
  const secondNumber =
    sorted.findIndex((value) => value === dividerPacket2) + 1;
  return firstNumber * secondNumber;
};

export default sortSignal(input);
