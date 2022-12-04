import { parseInput } from "../util";
const input = parseInput({
  split: { delimiter: "\n", mapper: false },
});

const isIncluded = (value: string) => {
    const [firstElf, secondElf] = value.split(',');
    const [firstStart, firstEnd] = firstElf.split('-');
    const [secondStart, secondEnd] = secondElf.split('-');

    return Number(firstStart) <= Number(secondStart) && Number(firstEnd) >= Number(secondEnd) 
        || Number(firstStart) >= Number(secondStart) && Number(firstEnd) <= Number(secondEnd);

}

export default input.reduce((acc, curr) => isIncluded(curr) ? acc + 1 : acc, 0);
