import { parseInput } from "../util";
export const input = parseInput({
  split: { delimiter: "\n\n", mapper: false },
});

const ROUNDS_COUNT = 20;
const BORE_LEVEL = 3;

const Operations = {
  Addition: "+",
  Subtraction: "-",
  Multiplication: "*",
  Division: "/",
};

class Monkey {
  number: number;
  items: number[];
  inspectCount: number;
  divider: number;
  doOperation: (old: number) => number;
  throwItem: (item: number) => number;
  constructor(
    number: number,
    items: number[],
    divider: number,
    doOperation: (old: number) => number,
    throwItem: (item: number) => number
  ) {
    (this.number = number),
      (this.items = items),
      (this.inspectCount = 0),
      (this.divider = divider),
      (this.doOperation = doOperation),
      (this.throwItem = throwItem);
  }
}

export const setMonkeys = (input: string[]) => {
  const monkeyList: Monkey[] = [];

  for (let i = 0; i < input.length; i++) {
    const [
      numberText,
      itemsText,
      operationText,
      testText,
      trueText,
      falseText,
    ] = input[i].split(`\n`);
    monkeyList.push(
      new Monkey(
        getNumberOnly(numberText)[0],
        getNumberOnly(itemsText),
        getNumberOnly(testText)[0],
        parseOperation(operationText),
        parseTest(testText, trueText, falseText)
      )
    );
  }

  return monkeyList;
};

const getNumberOnly = (text: string) => {
  const match = text.match(/\d+/g) || [];
  return match.map((item) => Number(item));
};

const parseOperation = (text: string) => {
  const match = text.matchAll(/([*+-//])\D*(\d+|old)/g) || [];
  const [, operation, value] = Array.from(match)[0];

  switch (operation) {
    case Operations.Multiplication:
      return (old: number) => old * (value === "old" ? old : Number(value));
    case Operations.Addition:
      return (old: number) => old + (value === "old" ? old : Number(value));
    case Operations.Division:
      return (old: number) => old / (value === "old" ? old : Number(value));
    case Operations.Subtraction:
      return (old: number) => old - (value === "old" ? old : Number(value));
    default:
      return (old: number) => old;
  }
};

const parseTest = (testText: string, trueText: string, falseText: string) => {
  const denominator = getNumberOnly(testText)[0];
  const trueMonkeyNumber = getNumberOnly(trueText)[0];
  const falseMonkeyNumber = getNumberOnly(falseText)[0];

  return (value: number) =>
    value % denominator === 0 ? trueMonkeyNumber : falseMonkeyNumber;
};

export const playMonkeyGame = (
  monkeyList: Monkey[],
  roundsCount: number,
  baseDivider?: number
) => {
  const updatedList = monkeyList.slice();

  for (let i = 1; i <= roundsCount; i++) { // Round
    for (let j = 0; j < updatedList.length; j++) { // Monkey
      const currentMonkey = updatedList[j];
      currentMonkey.items // Item
        .map((item) => {
          if (baseDivider) {
            return currentMonkey.doOperation(item) % baseDivider;
          }
          return Math.floor(currentMonkey.doOperation(item) / BORE_LEVEL);
        })
        .forEach((item) => {
          updatedList[currentMonkey.throwItem(item)].items.push(item);
          currentMonkey.inspectCount++;
        });
      currentMonkey.items = [];
    }
  }

  return updatedList;
};

export const getMonkeyBusiness = (monkeyList: Monkey[]) => {
  const sortedList = monkeyList.sort(
    (m1, m2) => m2.inspectCount - m1.inspectCount
  );
  return sortedList[0].inspectCount * sortedList[1].inspectCount;
};

export const monkeyList = setMonkeys(input);

export default getMonkeyBusiness(playMonkeyGame(monkeyList, ROUNDS_COUNT));
