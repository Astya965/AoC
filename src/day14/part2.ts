import { parseInput } from "../util";
const input = parseInput({
  split: {
    delimiter: "\n",
    mapper: (value: string) => value.split("->"),
  },
});

const ADDITIONAL_SPACE = 200;
const FLOOR_SPACE = 2;
const ROCK = "#";
const AIR = ".";
const SAND = "o";
const SAND_GENERATOR_X = 500;
const SAND_GENERATOR_Y = 0;

export const getGrid = (input: string[][], isFloor: boolean = true) => {
  const coordinates: string[][] = [];
  const topPoint = 0; // Lowest number
  const leftPoint = 0;

  let bottomPoint = 0; // Biggest number
  let rightPoint = 0;

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      const [xString, yString] = input[i][j].trim().split(",");
      const x = Number(xString);
      const y = Number(yString);

      if (y > bottomPoint) {
        bottomPoint = y;
      }
      if (x > rightPoint) {
        rightPoint = x;
      }

      if (j < input[i].length - 1) {
        coordinates.push([input[i][j].trim(), input[i][j + 1].trim()]);
      }
    }
  }

  // Add space to floor
  bottomPoint += FLOOR_SPACE;
  rightPoint += ADDITIONAL_SPACE; //Need enought space left and right

  const initGrid: string[][] = Array(bottomPoint - topPoint + 1);
  for (let k = 0; k < initGrid.length; k++) {
    initGrid[k] = Array(rightPoint - leftPoint + 1).fill(AIR);
  }

  coordinates.forEach((value) => {
    addRock(initGrid, value);
  });
  for (let m = 0; m < initGrid[0].length; m++) {
    // Add floor
    initGrid[initGrid.length - 1][m] = ROCK;
  }

  return initGrid;
};

export const addRock = (grid: string[][], value: string[]) => {
  const [firstX, firstY] = value[0].split(",");
  const [secondX, secondY] = value[1].split(",");

  const distanceX = Number(firstX) - Number(secondX);
  const distanceY = Number(firstY) - Number(secondY);
  const leftX = distanceX > 0 ? Number(secondX) : Number(firstX);
  const upY = distanceY > 0 ? Number(secondY) : Number(firstY);

  if (distanceX === 0) {
    for (let i = upY; i <= upY + Math.abs(distanceY); i++) {
      grid[i][Number(firstX)] = ROCK;
    }
  } else if (distanceY === 0) {
    for (let j = leftX; j <= leftX + Math.abs(distanceX); j++) {
      grid[Number(firstY)][j] = ROCK;
    }
  }
};

const addSand = (grid: string[][]) => {
  let counter = 0;
  let isInRest = true;

  while (isInRest) {
    isInRest = moveSand(grid, SAND_GENERATOR_X, SAND_GENERATOR_Y);
    counter++;
  }

  return counter;
};

const moveSand = (grid: string[][], x: number, y: number): boolean => {
  if (grid[y + 1][x] === AIR) {
    return moveSand(grid, x, y + 1);
  } else if (grid[y + 1][x - 1] === AIR) {
    return moveSand(grid, x - 1, y + 1);
  } else if (grid[y + 1][x + 1] === AIR) {
    return moveSand(grid, x + 1, y + 1);
  } else {
    if (x === SAND_GENERATOR_X && y === SAND_GENERATOR_Y) {
      return false;
    }
    grid[y][x] = SAND;
    return true;
  }
};

const initGrid = getGrid(input);
export default addSand(initGrid);
