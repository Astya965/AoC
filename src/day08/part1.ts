import { parseInput } from "../util";
const input = parseInput({
  split: {
    delimiter: "\n",
    mapper: (val: string) => val.split("").map((val) => Number(val)),
  },
});

enum Directions {
  Top,
  Bottom,
  Left,
  Right,
}

const getVisibleTreesCount = (input: number[][]) => {
  const verticalSize = input.length;
  const horizontalSize = input[0]?.length;
  let count = 0;

  for (let i = 0; i < verticalSize; i++) {
    if (i === 0 || i === verticalSize - 1) {
      count += horizontalSize; // All of the trees around the edge of the grid are visible
      continue;
    }

    for (let j = 0; j < horizontalSize; j++) {
      if (j === 0 || j === horizontalSize - 1) {
        count++; // All of the trees around the edge of the grid are visible
        continue;
      }
      if (checkVisibilityForTree(input, i, j)) {
        count++;
      }
    }
  }

  return count;
};

const checkVisibilityForTree = (
  input: number[][],
  vertical: number,
  horizontal: number
) =>
  checkVisibility(input, vertical, horizontal, Directions.Top) ||
  checkVisibility(input, vertical, horizontal, Directions.Bottom) ||
  checkVisibility(input, vertical, horizontal, Directions.Left) ||
  checkVisibility(input, vertical, horizontal, Directions.Right);

const checkVisibility = (
  input: number[][],
  vertical: number,
  horizontal: number,
  direction: Directions
) => {
  const curr = input[vertical][horizontal];
  let isVisible = true;

  switch (direction) {
    case Directions.Top:
      for (let i = 0; i < vertical; i++) {
        isVisible = curr > input[i][horizontal];
        if (!isVisible) {
          break;
        }
      }
      return isVisible;
    case Directions.Bottom:
      for (let i = vertical + 1; i < input.length; i++) {
        isVisible = curr > input[i][horizontal];
        if (!isVisible) {
          break;
        }
      }
      return isVisible;
    case Directions.Left:
      for (let i = 0; i < horizontal; i++) {
        isVisible = curr > input[vertical][i];
        if (!isVisible) {
          break;
        }
      }
      return isVisible;
    case Directions.Right:
      for (let i = horizontal + 1; i < input[0].length; i++) {
        isVisible = curr > input[vertical][i];
        if (!isVisible) {
          break;
        }
      }
      return isVisible;
    default:
      return !isVisible;
  }
};

export default getVisibleTreesCount(input);
