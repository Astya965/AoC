import { parseInput } from "../util";
const input = parseInput({
  split: { delimiter: "\n", mapper: (val: string) => val.trim()},
});

const MAX = 100000;

const parseInstruction = (input: string[]) => {
    let directory:string[] = [];
    const sizes = new Map<string, number>();

    for (let i = 0; i < input.length; i++) {
        const instruction = input[i];

        if (instruction.match(/\$ cd .+/)) {
            changeDirectory(instruction, directory);
        }
        if (instruction.match(/\d+/)) {
            setSize(instruction, directory, sizes);
        }
    }

    return sizes;
};

const changeDirectory = (instruction: string, directory: string[]) => {
    if (instruction === "$ cd ..") {
        directory.pop();
    } else {
        const match = instruction.match(/([/\w]+)\s*$/) || [];
        if (match.length > 1) {
            directory.push(match[1]); //Directory name
        }
    }
};

const setSize = (instruction: string, directory: string[], sizes: Map<string, number>) => {
    const match = instruction.match(/\d+/) || [];
    const size = Number(match[0]);
    const pathes = getPathes(directory);

    for (let i = 0; i < pathes.length; i++) {
        sizes.set(pathes[i], (sizes.get(pathes[i]) ?? 0) + size) //If path exists, add current size to path's value, else set new pair
    }
};

// Get path for current directory and for all upper directories
const getPathes = (directory: string[]) => directory.map((_, i, initArr) => initArr.slice(0, i + 1).join('/'));

const getSumWithCondition = (values: number[], max: number) => {
    return values.reduce((acc, curr) => acc + (curr <= max ? curr : 0), 0);
};

export const sizes = parseInstruction(input);

export default getSumWithCondition(Array.from(sizes.values()), MAX);
