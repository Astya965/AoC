import { parseInput } from "../util";
type Packet = Array<number | Packet>;

const input = parseInput({
  split: {
    delimiter: "\n\n",
    mapper: false,
  },
});

const checkSignal = (input: string[]) => {
  let sum = 0;
  for (let i = 0; i < input.length; i++) {
    const [left, right] = input[i]
      .split("\n")
      .map((value) => JSON.parse(value) as Packet); //Arrays of numbers or multi-dimensional arrays
    if (comparePair(left, right)) {

      sum = sum + i + 1;
    }
  }
  return sum;
};

export const comparePair = (
  v1: Packet | number,
  v2: Packet | number
): boolean | null => {
  if (Array.isArray(v1) && Array.isArray(v2)) {
    return compareArrays(v1, v2);
  } else if (Array.isArray(v1) && !Array.isArray(v2)) {
    return compareArrays(v1, [v2]);
  } else if (!Array.isArray(v1) && Array.isArray(v2)) {
    return compareArrays([v1], v2);
  } else if (typeof v1 === "number" && typeof v2 === "number") {
    return compareNumber(v1 as number, v2 as number);
  }
  return null;
};

const compareArrays = (arr1: Packet, arr2: Packet): boolean | null => {
  let result = null;
  for (let i = 0; i < arr1.length; i++) {
    if (arr2[i] === null || arr2[i] === undefined) {
      result = false;
      break;
    }
    result = comparePair(arr1[i], arr2[i]);
    if (result !== null) {
      break;
    }
  }
  if (result === null && arr1.length < arr2.length) {
    result = true;
  }
  return result;
};

const compareNumber = (n1: number, n2: number): boolean | null => {
  if (n1 === n2) {
    return null;
  }
  return n1 < n2;
};

export default checkSignal(input);
