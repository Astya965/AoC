import { parseInput } from "../util";
const input = parseInput({
  split: {
    delimiter: "\n",
    mapper: (value: string) => value.split(":"),
  },
});

const MONKEY_NAME = "root";

const getMonkeyNumber = (input: string[][]) => {
  const monkeyMap: Map<string, string> = new Map();

  for (let i = 0; i < input.length; i++) {
    const [name, value] = input[i];
    monkeyMap.set(name, value.trim());
  }
  
  return getNumber(monkeyMap.get(MONKEY_NAME) || '', monkeyMap);
};

const getNumber = (value: string, monkeyMap: Map<string, string>): number => {
  if (Number.isNaN(Number(value))) {
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

export default getMonkeyNumber(input);
