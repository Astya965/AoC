import { sizes } from './part1';

const DISK = 70000000;
const UPDATE = 30000000;

const rootSize = sizes.get('/') || 0;
const values = Array.from(sizes.values());


const usedSpace = DISK - rootSize;
const needDelete = UPDATE - usedSpace;

const getMinWithCondition = (arr: number[], needDelete: number) => {
    let min = arr[0];

    for (let i = 0; i < arr.length; i++) {
        const curr = arr[i];
        if (curr >= needDelete && curr < min) {
            min = curr;
        }
    }

    return min;
}

export default getMinWithCondition(values, needDelete);