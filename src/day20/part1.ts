import { parseInput } from "../util";
export const input = parseInput({
  split: {
    delimiter: "\n",
    mapper: (value: string) => {
      return { number: Number(value) } as TNumber;
    },
  },
});

type TNumber = {
  number: number;
};

const ZERO = 0;
const FIRST = 1000;
const SECOND = 2000;
const THIRD = 3000;

const mixNumbers = (initArr: TNumber[], copy: TNumber[]) => {
  for (let i = 0; i < initArr.length; i++) {
    const value = initArr[i];
    const prev = copy.indexOf(value);
    copy.splice(prev, 1);

    const next = (prev + value.number) % copy.length;
    if (next === 0 && value.number !== ZERO) {
      copy.push(value);
    } else {
      copy.splice(next, 0, value);
    }
  }
};

export const getCoordinatesSum = (
  initArr: TNumber[],
  times: number = 1,
  multiplier: number = 1
) => {
  if (multiplier > 1) {
    initArr.forEach((value) => (value.number *= multiplier));
  }

  const copy = initArr.slice();
  for (let i = 1; i <= times; i++) {
    mixNumbers(initArr, copy);
  }

  const index: number = copy.findIndex((value) => value.number === ZERO);
  if (copy.length < FIRST) {
    return 0;
  }
  return (
    copy[index + FIRST].number +
    copy[index + SECOND].number +
    copy[index + THIRD].number
  );
};

export default getCoordinatesSum(input.slice());
