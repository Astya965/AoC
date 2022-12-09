import { parseInput } from "../util";
const input = parseInput({
  split: { delimiter: "\n", mapper: false },
});

const KNOTS_COUNT = 10;

type TCoordinates = {
  x: number;
  y: number;
};

const Directions = {
  Up: "U",
  Down: "D",
  Left: "L",
  Right: "R",
};

const setRoutes = (instruction: string[]) => {
  const knotStartPosinion = { x: 0, y: 0 };
  const roupeStartPosition = Array(KNOTS_COUNT).fill(knotStartPosinion);
  const route: TCoordinates[][] = [roupeStartPosition];
  console.log(instruction);

  for (let i = 0; i < instruction.length; i++) {
    const [direction, count] = instruction[i].split(" ");
    console.log(instruction[i]);
    addNewRoute(direction, Number(count), route);
  }

  const tailRoute = route.map(coordinates => `x: ${coordinates[coordinates.length - 1].x}, y: ${coordinates[coordinates.length - 1].y}`);
  const setOfTailRoute = new Set(tailRoute);
  return setOfTailRoute.size;
};

const addNewRoute = (
  direction: string,
  count: number,
  route: TCoordinates[][]
) => {
  for (let i = 0; i < count; i++) {
    const newRoupeCoordinates = moveRoupe(direction, route);
    route.push(newRoupeCoordinates);
  }
};

const moveRoupe = (direction: string, route: TCoordinates[][]) => {
  const routeCoordinates = [...route[route.length - 1]];

  switch (direction) {
    case Directions.Up:
      routeCoordinates[0] = {
        x: routeCoordinates[0].x,
        y: routeCoordinates[0].y + 1,
      };
      break;
    case Directions.Down:
      routeCoordinates[0] = {
        x: routeCoordinates[0].x,
        y: routeCoordinates[0].y - 1,
      };
      break;
    case Directions.Right:
      routeCoordinates[0] = {
        x: routeCoordinates[0].x + 1,
        y: routeCoordinates[0].y,
      };
      break;
    case Directions.Left:
      routeCoordinates[0] = {
        x: routeCoordinates[0].x - 1,
        y: routeCoordinates[0].y,
      };
      break;
  }

  for (let i = 1; i < routeCoordinates.length; i++) {
    routeCoordinates[i] = moveTail(
      routeCoordinates[i],
      routeCoordinates[i - 1]
    );
  }
  return routeCoordinates;
};

const moveTail = (
  tailCoordinates: TCoordinates,
  { x: headX, y: headY }: TCoordinates
): TCoordinates => {
  const newTailCoordinate = { ...tailCoordinates };
  const distance = Math.sqrt(
    Math.pow(newTailCoordinate.x - headX, 2) +
      Math.pow(newTailCoordinate.y - headY, 2)
  ); // Distance between tail and head
  
  // Go closer to head:
  if (distance >= 2) {
    if (newTailCoordinate.y < headY) {
      newTailCoordinate.y++;
    } else if (newTailCoordinate.y > headY) {
      newTailCoordinate.y--;
    }

    if (newTailCoordinate.x < headX) {
      newTailCoordinate.x++;
    } else if (newTailCoordinate.x > headX) {
      newTailCoordinate.x--;
    }
  }
  return newTailCoordinate; // If distance is 0 or 1, do nothing
};

export default setRoutes(input);
