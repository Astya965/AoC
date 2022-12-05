import { parseInput } from "../util";

const input = parseInput({
  split: { delimiter: "\n", mapper: (e: string) => Number(e) },
});

// Sum calories for each elf
const getCaloriesSum = (caloriesArr: number[]) =>
  caloriesArr.reduce((acc, curr) => acc + curr, 0);

// Separate initial array into arrays with calories for each elf
const findElfsCalories = (initialArray: number[]) => {
  let i = 0;
  const subarrays = [];

  while (i != -1) {
    i = initialArray.findIndex((v) => v === 0);
    if (i != -1) {
      //If array contains delimiter
      const removedItems = initialArray.splice(0, i + 1);
      subarrays.push(getCaloriesSum(removedItems));
    } else if (initialArray.length > 0) {
      //Add last part
      subarrays.push(getCaloriesSum(initialArray));
    }
  }

  return subarrays;
};
export const caloriesArr = findElfsCalories(input);

// Find max
const max = Math.max(...caloriesArr);
export default max;

// 67658
