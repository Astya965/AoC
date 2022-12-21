import { parseInput } from "../util";
const input = parseInput({
  split: {
    delimiter: "\n",
    mapper: (value: string) => value.split(":"),
  },
});

const MONKEY_NAME = "root";
const YOU = "humn";
const VARIBLE = "x";

const getMonkeMap = (input: string[][]) => {
  const monkeyMap: Map<string, string> = new Map();

  for (let i = 0; i < input.length; i++) {
    const [name, value] = input[i];
    monkeyMap.set(name, value.trim());
  }
  monkeyMap.set(YOU, VARIBLE);
  return monkeyMap;
};

const getNumber = (value: string, monkeyMap: Map<string, string>): number => {
  if (value !== "NaN" && Number.isNaN(Number(value))) {
    const [val1, operation, val2] = value.split(" ");
    const num1 = getNumber(monkeyMap.get(val1) || "", monkeyMap);
    const num2 = getNumber(monkeyMap.get(val2) || "", monkeyMap);

    switch (operation) {
      case "+":
        return num1 + num2;
      case "-":
        return num1 - num2;
      case "*":
        return num1 * num2;
      case "/":
        return num1 / num2;
    }
  }
  return Number(value);
};

const calculateValue = (
  name: string,
  monkeyMap: Map<string, string>,
  result: number = NaN
): any => {
  if (name === YOU) {
    return result;
  }
  const value = monkeyMap.get(name) || "";
  const [val1, operation, val2] = value.split(" ");
  const num1 = getNumber(monkeyMap.get(val1) || "", monkeyMap);
  const num2 = getNumber(monkeyMap.get(val2) || "", monkeyMap);

  if (Number.isNaN(num1)) { // Varible in left part
    if (name === MONKEY_NAME) {
      return calculateValue(val1, monkeyMap, num2);
    }
    switch (operation) {
      case "+":
        return calculateValue(val1, monkeyMap, result - num2);
      case "-":
        return calculateValue(val1, monkeyMap, result + num2); // x - 4 = 2
      case "*":
        return calculateValue(val1, monkeyMap, result / num2);
      case "/":
        return calculateValue(val1, monkeyMap, result * num2); // x / 3 = 2
    }
  }
  if (Number.isNaN(num2)) { // Varible in right part
    if (name === MONKEY_NAME) {
        return calculateValue(val2, monkeyMap, num1);
      }
      switch (operation) {
        case "+":
          return calculateValue(val2, monkeyMap, result - num1);
        case "-":
          return calculateValue(val2, monkeyMap, num1 - result); // 8 - x = 6
        case "*":
          return calculateValue(val2, monkeyMap, result / num1);
        case "/":
          return calculateValue(val2, monkeyMap, num1 / result); // 6 / x = 2
      }
  }
};

const monkeyMap = getMonkeMap(input);

export default calculateValue(MONKEY_NAME, monkeyMap);
