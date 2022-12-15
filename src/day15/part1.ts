import { parseInput } from "../util";

export type Coordinates = {
  x: number;
  y: number;
};

const input = parseInput({
  split: {
    delimiter: "\n",
    mapper: (value: string) => value.split(":"),
  },
}); //Total 60 (30 + 30)

const SEARCH_LINE_Y = 2000000;

const getCoordinatesCount = (input: string[][]) => {
  const dotesOnLine: Set<number> = new Set();
  const beaconsOnLine: Set<number> = new Set();

  for (let i = 0; i < input.length; i++) {
    const [sensorInfo, beaconInfo] = input[i];
    const sensor = getCoordinatesFromText(sensorInfo);
    const beacon = getCoordinatesFromText(beaconInfo);

    if (beacon.y === SEARCH_LINE_Y) {
      beaconsOnLine.add(beacon.x);
    }

    const dotes = getDotesForPair(sensor, beacon, SEARCH_LINE_Y);
    dotes.forEach(dote => dotesOnLine.add(dote));
  }
  return dotesOnLine.size - beaconsOnLine.size;
};

const getDotesForPair = ({x: sensorX, y: sensorY}: Coordinates, {x: beaconX, y: beaconY}: Coordinates, line: number): number[] => {
    const coordinates: number[] = [];
    const distanceToAxisX = Math.abs(sensorX - beaconX);
    const {firstTop, secondTop, distanceToTop} = getTopCoordinates(sensorY, beaconY, distanceToAxisX);
    let isIncludedSearchLine = false;
    if (firstTop > secondTop) {
      isIncludedSearchLine = line <= firstTop && line >= secondTop;
    } else {
      isIncludedSearchLine = line >= firstTop && line <= secondTop;
    }

    if (isIncludedSearchLine) {
      const distanceSensorToSearchLine = Math.abs(sensorY - line);
      const distanceSearchToEdge = distanceToTop - distanceSensorToSearchLine;
      for (let i = 0 - distanceSearchToEdge; i <= distanceSearchToEdge; i++) {
        coordinates.push(sensorX + i);
      }
    }
    return coordinates;
};

const getTopCoordinates = (sensorY: number, beaconY: number, distanceToAxisX: number) => {
  let firstTop = 0;
  let secondTop = 0;
  if (sensorY < beaconY) {
    firstTop = beaconY + distanceToAxisX;
  } else {
    firstTop = beaconY - distanceToAxisX;
  }
  const distanceToTop = Math.abs(sensorY - firstTop);
  secondTop = sensorY < beaconY ? sensorY - distanceToTop : sensorY + distanceToTop;
  return {firstTop, secondTop, distanceToTop};
}

export const getCoordinatesFromText = (string: string): Coordinates => {
  const match = string.match(/-{0,}\d+/g) || [];
  const [x, y] = match.map((value) => Number(value));
  return { x, y };
};

export default getCoordinatesCount(input);
