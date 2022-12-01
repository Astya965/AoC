import { caloriesArr } from './part1';

//Get three most wealthy elfs
export default caloriesArr.sort((a, b) => b - a).slice(0, 3).reduce((acc, cur) => acc + cur, 0);

//200158
