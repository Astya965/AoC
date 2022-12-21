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

const getMonkeyEquation = (input: string[][]) => {
  const monkeyMap: Map<string, string> = new Map();

  for (let i = 0; i < input.length; i++) {
    const [name, value] = input[i];
    monkeyMap.set(name, value.trim());
  }

  const rootEquation = getEquation(
    monkeyMap.get(MONKEY_NAME) || "",
    monkeyMap,
    true
  );
  return rootEquation;
};

const getEquation = (
  value: string,
  monkeyMap: Map<string, string>,
  isRoot: boolean = false
): string => {
  if (Number.isNaN(Number(value))) {
    if (isRoot) {
      value = value.replace(/[+*\-\/]{1}/, "=");
    }
    value = value.replace(/[a-zA-Z]+/g, (value) =>
      value === YOU
        ? VARIBLE
        : getEquation(monkeyMap.get(value) || "", monkeyMap)
    );
    if (!isRoot) {
      return `(${value})`;
    }
  }
  return value;
};

const solveMonkeyEquation = (equation: string) => {
  let [left, right] = equation
    .split(" = ")
    .map((value) => value.substring(1, value.length - 1));
  const result = left.includes(VARIBLE)
    ? solveEquation(right)
    : solveEquation(left);
};

const solveEquation = (equation: string): number => {
  if (Number.isNaN(Number(equation))) {
    if (equation.includes("(")) {
      const newEquation = equation.replace(
        /.*\((.+?)\)/g,
        (init, value) => {
          if (String(doOperation(value)) === "NaN") {
            console.log(init);
          }
          return String(doOperation(value));
        }
      );
      return solveEquation(newEquation);
    }
    return doOperation(equation);
  }
  return Number(equation);
};

const doOperation = (operationString: string): number => {
  const [val1, operation, val2] = operationString.split(" ");
  let result: string | number = operationString;
  switch (operation) {
    case "+":
      result = Number(val1) + Number(val2);
      break;
    case "-":
      result = Number(val1) - Number(val2);
      break;
    case "*":
      result = Number(val1) * Number(val2);
      break;
    case "/":
      result = Number(val1) / Number(val2);
      break;
  }
  return Number(result);
};

const doInverseOperation = (
  operationString: string,
  result: number
): number => {
  operationString;
  const numberMatch = operationString.match(/\d+/g);
  const operationMatch = operationString.match(/[+*\-\/]/g);
  let varible: string | number = result;

  if (operationMatch && numberMatch) {
    switch (operationMatch[0]) {
      case "+":
        varible = result - Number(numberMatch[0]);
        break;
      case "-":
        varible = result + Number(numberMatch[0]);
        break;
      case "*":
        varible = result / Number(numberMatch[0]);
        break;
      case "/":
        varible =
          operationString.indexOf(VARIBLE) === 0
            ? result * Number(numberMatch[0])
            : Number(numberMatch[0]) / result;
        break;
    }
  }
  return Number(varible);
};

const equation = getMonkeyEquation(input);

export default solveMonkeyEquation(equation);
// export default doInverseOperation("(x + 2) / (5 - 1)", 2);
// x + (4 - 2), 2 .  x=0
