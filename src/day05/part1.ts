import { parseInput } from '../util';
const input = parseInput({
    split: { delimiter: "\n\n", mapper: false },
  });

export const [contrainers, instruction] = input;

// Get map for input
// key - number of column
// value - array of crates IDs  
export const parseStingToMap = (string: string) => {
    const map: Map<number, string[]> = new Map();

    const arrOfString = string.split(`\n`);
    const last = arrOfString.pop()?.trim() ?? '';
    const columnCount = Number(last[last.length - 1]);

    arrOfString.forEach(row => putContainersToMap(row, map, columnCount));

    return map;
};

// Parse string and create map
const putContainersToMap = (row: string, map: Map<number, string[]>, columnCount: number) => {
    const PATTERN = /[\w]/;
    const PATTERN_LENGTH = 4;

    for (let i = 0; i < columnCount * PATTERN_LENGTH; i = i + PATTERN_LENGTH) {
        const part = row.slice(0, PATTERN_LENGTH);
        row = row.slice(PATTERN_LENGTH);

        if (part.match(PATTERN)) {
            const columnNumber = (i + PATTERN_LENGTH) / PATTERN_LENGTH;

            if (!map.has(columnNumber)) {
                map.set(columnNumber, [part[1]]);
            } else {
                map.set(columnNumber, [part[1], ...map.get(columnNumber) ?? []])
            }
        }
    }
};

// Change crates order following instructions
// New model = true for part2
export const followInstruction = (instruction: string, map: Map<number, string[]>, isNewModel: boolean = false) => {
    const stepList = instruction.split(`\n`);

    stepList.forEach(step => {
        const [count, initColumn, targetColumn] = step.match(/\d+/g) ?? [];

        if (count && initColumn && targetColumn) {
            const initColumnItems =  map.get(Number(initColumn)) ?? [];
            const removedItems = initColumnItems.splice(initColumnItems.length - Number(count), initColumnItems.length);

            map.set(Number(initColumn), initColumnItems);
            if (isNewModel) {
                map.set(Number(targetColumn), [...map.get(Number(targetColumn)) ?? [], ...removedItems]);
            } else {
                map.set(Number(targetColumn), [...map.get(Number(targetColumn)) ?? [], ...removedItems.reverse()]);
            } 
        }
    });
};

// Get crate from top of each column
export const getTopContainers = (map: Map<number, string[]>) => {
    const entries = Array.from(map.entries()).sort(([columnNumber1], [columnNumber2]) => columnNumber1 - columnNumber2);
    return entries.reduce((acc, [,curr]) => acc += curr[curr.length - 1], '');
}

const map = parseStingToMap(contrainers);
followInstruction(instruction, map);

export default getTopContainers(map);