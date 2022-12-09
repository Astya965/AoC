import { parseInput } from "../util";
const input = parseInput({
  split: { delimiter: "\n", mapper: false },
});

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
  const startPosition = { x: 0, y: 0 };
  const headRoute: TCoordinates[] = [startPosition];
  const tailRoute: TCoordinates[] = [startPosition];

  for (let i = 0; i < instruction.length; i++) {
    const [direction, count] = instruction[i].split(" ");
    moveHead(direction, Number(count), headRoute, tailRoute);
  }

  const setOfTailRoute = new Set(
    tailRoute.map((item) => `x: ${item.x}, y: ${item.y}`)
  );
  return setOfTailRoute.size;
};

const moveHead = (
  direction: string,
  count: number,
  headRoute: TCoordinates[],
  tailRoute: TCoordinates[]
) => {
  for (let i = 0; i < count; i++) {
    let newHeadCoordinates = { ...headRoute[headRoute.length - 1] };
    let newTailCoordinates = { ...tailRoute[tailRoute.length - 1] };

    switch (direction) {
      case Directions.Up:
        newHeadCoordinates.y++;
        break;
      case Directions.Down:
        newHeadCoordinates.y--;
        break;
      case Directions.Right:
        newHeadCoordinates.x++;
        break;
      case Directions.Left:
        newHeadCoordinates.x--;
        break;
    }
    moveTail(newTailCoordinates, newHeadCoordinates);
    headRoute.push(newHeadCoordinates);
    tailRoute.push(newTailCoordinates);
  }
};

const moveTail = (
  tailCoordinates: TCoordinates,
  { x: headX, y: headY }: TCoordinates
) => {
  const distance = Math.sqrt(
    Math.pow(tailCoordinates.x - headX, 2) +
      Math.pow(tailCoordinates.y - headY, 2)
  ); // Distance between tail and head

  // Go closer to head:
  if (distance >= 2) {
    if (tailCoordinates.y < headY) {
      tailCoordinates.y++;
    } else if (tailCoordinates.y > headY) {
      tailCoordinates.y--;
    }

    if (tailCoordinates.x < headX) {
      tailCoordinates.x++;
    } else if (tailCoordinates.x > headX) {
      tailCoordinates.x--;
    }
  }
  // If distance is 0 or 1, do nothing
};

export default setRoutes(input);
