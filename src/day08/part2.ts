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

const findViewPoint = (input: number[][]) => {
  const verticalSize = input.length;
  const horizontalSize = input[0]?.length;
  let max = 0;

  for (let i = 0; i < verticalSize; i++) {
    if (i === 0 || i === verticalSize - 1) {
      continue; // All of the trees around the edge of the grid have 0 points; after multiplying score = 0
    }

    for (let j = 0; j < horizontalSize; j++) {
      if (j === 0 || j === horizontalSize - 1) {
        continue; // All of the trees around the edge of the grid have 0 points; after multiplying score = 0
      }
      console.log("v: " + i + " h: " + j + " value: " + input[i][j])
      const currScore = findScoreForTree(input, i, j);
      if (max < currScore) {
        max = currScore;
      }
    }
  }

  return max;
};

const findScoreForTree = (
  input: number[][],
  vertical: number,
  horizontal: number
) =>
  findVerticalScore(input, vertical, horizontal, Directions.Top) *
  findVerticalScore(input, vertical, horizontal, Directions.Bottom) *
  findVerticalScore(input, vertical, horizontal, Directions.Left) *
  findVerticalScore(input, vertical, horizontal, Directions.Right);

const findVerticalScore = (
  input: number[][],
  vertical: number,
  horizontal: number,
  direction: Directions
) => {
  let score = 0;
  const curr = input[vertical][horizontal];

  switch (direction) {
    case Directions.Top:
      for (let i = vertical - 1; i >= 0 ;i--) {
        score++;
        if (curr <= input[i][horizontal]) {
          break;
        }
      }
      console.log(score);
      return score;
    case Directions.Bottom:
      for (let i = vertical + 1; i < input.length; i++) {
        score++;
        if (curr <= input[i][horizontal]) {
          break;
        }
      }
      console.log(score);
      return score;
    case Directions.Left:
      for (let i = horizontal - 1; i >= 0; i--) {
        score++;
        if (curr <= input[vertical][i]) {
          break;
        }
      }
      console.log(score);
      return score;
    case Directions.Right:
      for (let i = horizontal + 1; i < input[0].length; i++) {
        score++;
        if (curr <= input[vertical][i]) {
          break;
        }
      }
      console.log(score);
      return score;
    default:
      return score;
  }
};

export default findViewPoint(input);
