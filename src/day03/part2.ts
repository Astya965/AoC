import { parseInput } from "../util";
import { getCharScore } from "./part1";
const input = parseInput({
  split: { delimiter: "\n", mapper: false },
});

const GROUP_SIZE = 3

const getScoreForGroup = (elf1: string, elf2: string, elf3: string) => {
    let commonItemScore = 0;

    for (let i = 0; i < elf1.length; i++) {
        if (elf2.includes(elf1[i]) && elf3.includes(elf1[i])) {
            commonItemScore = getCharScore(elf1[i]);
        }
    }

    return commonItemScore;
}

const sumScoreForGroup = (arr: string[]) => {
    let acc = 0;

    for (let i = 0; i < arr.length; i = i + GROUP_SIZE) {
        acc += getScoreForGroup(arr[i], arr[i + 1], arr[i + 2]);
    }

    return acc;
}

export default sumScoreForGroup(input);