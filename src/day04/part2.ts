import { parseInput } from "../util";
const input = parseInput({
  split: { delimiter: "\n", mapper: false },
});

const isIncluded = (value: string) => {
    const [firstElf, secondElf] = value.split(',');
    const [firstStart, firstEnd] = firstElf.split('-');
    const [secondStart, secondEnd] = secondElf.split('-');

    //First case, first Elf contains second Elf's sections, first Elf's section end bigger then second Elf's start Ex: 4-5, 2-8
    //Second case, second Elf contains first Elf's sections, first Elf's start bigger then second Elf's start, 
    //but still less then second Elf's end (in another case it would be out of range) Ex: 6-11,1-7
    //Third case, first Elf contains second Elf's sections, second Elf's end less then first Elf's end Ex; 3-87, 4-4
    return Number(firstEnd) >= Number(secondStart) &&  Number(firstEnd) <= Number(secondEnd) 
        || (Number(firstStart) >= Number(secondStart) && Number(firstStart) <= Number(secondEnd))
        || (Number(secondEnd) <= Number(firstEnd) && Number(firstStart) <= Number(secondStart));
}

export default input.reduce((acc, curr) => isIncluded(curr) ? acc + 1 : acc, 0);
