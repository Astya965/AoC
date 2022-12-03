import { parseInput } from "../util";
const input = parseInput({
  split: { delimiter: "\n", mapper: false },
});

// Find score for common item in rucksack
const getCommonItemScore = (line: string) => {
    const firstCompartment = line.substring(0, Math.floor(line.length / 2)) ?? '';
    const secondCompartment = line.substring(Math.floor(line.length / 2)) ?? '';
    let commonItemScore = 0;

    for (let i = 0; i < firstCompartment.length; i++) {
        if (secondCompartment.includes(firstCompartment[i])) {
            commonItemScore = getCharScore(firstCompartment[i]);
        }
    }
    return commonItemScore;
};

// Find score for any char
export const getCharScore = (char: string) => {
    const MIN_CODE = 97; //a charCode
    const MAX_CODE = 122; //z
    const MIN_UPPER_CODE = 65; //A
    const MAX_UPPER_CODE = 90; //Z
    const range = MAX_CODE - MIN_CODE + 1;

    const charNumber = char.charCodeAt(0);
    if (charNumber >= MIN_CODE) {
        return charNumber - MIN_CODE + 1;
    } else if (charNumber <= MAX_UPPER_CODE) {
        return charNumber - MIN_UPPER_CODE + 1 + range;
    } else {
        return 0;
    }
};

// Find sum for all items
export default input.reduce((acc, cur) => acc + getCommonItemScore(cur), 0);