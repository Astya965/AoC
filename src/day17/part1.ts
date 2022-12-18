import { parseInput } from "../util";
const input = parseInput({
  split: {
    delimiter: "",
    mapper: false,
  },
});

enum Shapes {
  Horizontal,
  Plus,
  Angle,
  Vertical,
  Square,
}

const WIDTH = 7;
const START_BOTTOM_SPACE = 4;
const ROCK_LINE = 1;
const SHAPE_TYPES_COUNT = 5;

const AIR = ".";
const ROCK = "#";
const LEFT = "<";
const RIGHT = ">";

const START_X = 2;
const START_Y = 0;

const SHAPES_COUNT = 2; //2022

const createGrid = () => {
  const grid = new Array(START_BOTTOM_SPACE + ROCK_LINE);
  for (let i = 0; i < grid.length; i++) {
    if (i === grid.length - 1) {
      grid[i] = new Array(WIDTH).fill(ROCK);
    } else {
      grid[i] = new Array(WIDTH).fill(AIR);
    }
  }
  return grid;
};

const addShapes = (grid: string[][], windTypes: string[]) => {
  let count = 0;
  let currentWind = 0;

  while (count < SHAPES_COUNT) {
    count++;
    moveShape(grid, count, windTypes, currentWind);
  }

  console.log(grid);
};

const moveShape = (
  grid: string[][],
  count: number,
  windTypes: string[],
  currentWind: number
) => {
  const type = getShapeType(count);
  switch (type) {
    case Shapes.Horizontal:
      moveHorizontal(grid, START_X, START_Y, 4, windTypes, currentWind); //Coordinates for left dote
      break;
    case Shapes.Plus:
      movePlus(grid, START_X, START_Y, 3, windTypes, currentWind); //Coordinates for bottom dote
      break;
    case Shapes.Angle:
      moveAngle(grid, START_X, START_Y, 3, windTypes, currentWind); //Coordinates for center
      break;
    case Shapes.Vertical:
      moveVertical(grid, START_X, START_Y, 4, windTypes, currentWind); //Coordinates for bottom dote
      break;
    case Shapes.Square:
      moveSquare(grid, START_X, START_Y, 2, windTypes, currentWind); //Coordinates for bottom-left dote
      break;
  }
};

const moveHorizontal = (
  grid: string[][],
  x: number,
  y: number,
  horizontalSize: number,
  windTypes: string[],
  currentWind: number
) => {
  if (grid[y + 1].slice(x, x + horizontalSize).every((dote) => dote === AIR)) {
    const type = windTypes[currentWind];
    let shift = 0;
    if (type === LEFT) {
      shift = grid[y + 1][x - 1] === AIR ? 1 : 0;
    } else if (type === RIGHT) {
      shift = grid[y + 1][x + horizontalSize] === AIR ? -1 : 0;
    }
    moveHorizontal(
      grid,
      x + shift,
      y + 1,
      horizontalSize,
      windTypes,
      currentWind + 1
    );
  } else {
    for (let i = 0; i < horizontalSize; i++) {
      grid[y][x + i] = ROCK;
    }
    addNewLines(grid, START_BOTTOM_SPACE);
  }
};

const movePlus = (
  grid: string[][],
  x: number,
  y: number,
  sideSize: number,
  windTypes: string[],
  currentWind: number
) => {
  if (
    grid[y + 2][x] === AIR &&
    grid[y + 1].slice(x - 1, x + sideSize - 1).every((dote) => dote === AIR)
  ) {
    const type = windTypes[currentWind];
    let shift = 0;
    if (type === LEFT) {
      shift = grid[y + 1][x - 1] === AIR ? 1 : 0;
    } else if (type === RIGHT) {
      shift = grid[y + 1][x + 1] === AIR ? -1 : 0;
    }
    movePlus(grid, x + shift, y + 2, sideSize, windTypes, currentWind);
  } else if (grid[y + 1][x] === AIR) {
    for (let i = 0; i < sideSize; i++) {
      grid[y + 1 - i][x] = ROCK;
      if (i === 1) {
        grid[y + 1 - i][x + 1] = ROCK;
        grid[y + 1 - i][x - 1] = ROCK;
      }
    }
    addNewLines(grid, START_BOTTOM_SPACE);
  } else {
    for (let i = 0; i < sideSize; i++) {
      grid[y - i][x] = ROCK;
      if (i === 1) {
        grid[y - i][x + 1] = ROCK;
        grid[y - i][x - 1] = ROCK;
      }
    }
    addNewLines(grid, START_BOTTOM_SPACE);
  }
};

const moveAngle = (
  grid: string[][],
  x: number,
  y: number,
  sideSize: number,
  windTypes: string[],
  currentWind: number
) => {
  if (grid[y + 1].slice(x, x + sideSize).every((dote) => dote === AIR)) {
    const type = windTypes[currentWind];
    let shift = 0;
    if (type === LEFT) {
      shift = grid[y + 1][x - 1] === AIR ? -1 : 0;
    } else if (type === RIGHT) {
      const isRight = grid
        .slice(y + 1 - sideSize, y + 2)
        .every((value) => value[x + 1] === AIR);
      shift = isRight ? 1 : 0;
    }
    moveAngle(grid, x + shift, y + 1, sideSize, windTypes, currentWind + 1);
  } else {
    for (let i = 0; i < sideSize; i++) {
      grid[y][x + i] = ROCK;
    }
    for (let j = 0; j < sideSize; j++) {
      grid[y - j][x + sideSize - 1] = ROCK;
    }
    addNewLines(grid, START_BOTTOM_SPACE);
  }
};

const moveVertical = (
  grid: string[][],
  x: number,
  y: number,
  verticalSize: number,
  windTypes: string[],
  currentWind: number
) => {
  if (grid[y + 1][x] === AIR) {
    const type = windTypes[currentWind];
    let shift = 0;
    if (type === LEFT) {
      const isLeft = grid
        .slice(y + 1 - verticalSize, y + 2)
        .every((value) => value[x - 1] === AIR);
      shift = isLeft ? -1 : 0;
    } else if (type === RIGHT) {
      const isRight = grid
        .slice(y + 1 - verticalSize, y + 2)
        .every((value) => value[x + 1] === AIR);
      shift = isRight ? 1 : 0;
    }
    moveVertical(
      grid,
      x + shift,
      y + 1,
      verticalSize,
      windTypes,
      currentWind + 1
    );
  } else {
    for (let i = 0; i < verticalSize; i++) {
      grid[y - i][x] = ROCK;
    }
    addNewLines(grid, START_BOTTOM_SPACE);
  }
};

const moveSquare = (
  grid: string[][],
  x: number,
  y: number,
  sideSize: number,
  windTypes: string[],
  currentWind: number
) => {
  if (grid[y + 1][x] === AIR && grid[y + 1][x + 1]) {
    const type = windTypes[currentWind];
    let shift = 0;
    if (type === LEFT) {
      shift = grid[y + 1][x - 1] === AIR && grid[y][x - 1] === AIR ? -1 : 0;
    } else if (type === RIGHT) {
      shift = grid[y + 1][x + 1] === AIR && grid[y][x + 1] === AIR ? 1 : 0;
    }

    moveSquare(grid, x + shift, y + 1, sideSize, windTypes, currentWind + 1);
  } else {
    for (let i = 0; i < sideSize; i++) {
      grid[y - i][x] = ROCK;
      grid[y - i][x + 1] = ROCK;
    }
    addNewLines(grid, START_BOTTOM_SPACE);
  }
};

const addNewLines = (grid: string[][], linesCount: number) => {
  const increment: string[][] = new Array(linesCount);
  for (let i = 0; i < increment.length; i++) {
    increment[i] = new Array(grid[0].length).fill(AIR);
  }
  grid.splice(0, 0, ...increment);
};

const getShapeType = (count: number): Shapes | null => {
  const remainer = count % SHAPE_TYPES_COUNT;
  switch (remainer) {
    case 1:
      return Shapes.Horizontal;
    case 2:
      return Shapes.Plus;
    case 3:
      return Shapes.Angle;
    case 4:
      return Shapes.Vertical;
    case 0:
      return Shapes.Square;
  }
  return null;
};

const grid = createGrid();
export default addShapes(grid, input);

// Урегулировать добавление пространства - только под фигуру нужное + 4 ??

// Добавить зацикленное влияние воздуха (для каждой фигуры
// надо понять может ли она двигаться влево/вправо и как именно двигаться)
// В движение добавить проверку и поправку (0/1) на сколько двигаться

// Сбрасывать счетчик, когда подходит к концу массива

// Находить самую высокую непустую точку
