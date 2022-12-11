import { parseInput } from "../util";
const input = parseInput({
  split: { delimiter: "\n", mapper: false },
});

const START_VALUE = 1;
const EMPTY_CYCLE = "noop";
const LINE_LENGTH = 40;
const LIT_PIXEL = '#';
const DARK_PIXEL = ".";

const getFrame = (input: string[]) => {
  let registerValue: number = START_VALUE;
  let cyclesCount: number = 0;
  let frame = `\n`;

  for (let i = 0; i < input.length; i++) {
    if (input[i] === EMPTY_CYCLE) {
      cyclesCount++;
      frame = unpdateFrame(registerValue, cyclesCount, frame);
    } else {
      const [, value] = input[i].split(" ");
      cyclesCount++;
      frame = unpdateFrame(registerValue, cyclesCount, frame);
      cyclesCount++;
      frame = unpdateFrame(registerValue, cyclesCount, frame);
      registerValue += Number(value);
    }
  }
  return frame;
};



const unpdateFrame = (registerValue: number, cyclesCount: number, frame: string) => {
    const positionInLine = (cyclesCount - 1) % LINE_LENGTH;
    if (positionInLine >= registerValue - 1 && positionInLine <= registerValue + 1) { // Because sprite width is 3 pixel
        frame += LIT_PIXEL;
    } else {
        frame += DARK_PIXEL;
    }

    if (cyclesCount % LINE_LENGTH === 0) {
        frame += `\n`;
    }
    return frame;
};

export default getFrame(input);