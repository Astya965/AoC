import { parseInput } from "../util";
import { getCoordinatesFromText } from "./part1";
const input = parseInput({
  split: {
    delimiter: "\n",
    mapper: (value: string) => value.split(":"),
  },
});

const MIN = 0;
const MAX = 4000000;

const getFrequency = (input: string[][]) => {
  const sensorMap: Map<string, number> = new Map();
  let visible = true;

  for (let i = 0; i < input.length; i++) {
    const [sensorInfo, beaconInfo] = input[i];
    const sensor = getCoordinatesFromText(sensorInfo);
    const beacon = getCoordinatesFromText(beaconInfo);

    const manhattanDistance =
      Math.abs(sensor.x - beacon.x) + Math.abs(sensor.y - beacon.y);
    sensorMap.set(`${sensor.x},${sensor.y}`, manhattanDistance);
  }
  const sensorArray = Array.from(sensorMap.entries());

  for (let y = MIN; y <= MAX; y++) {
    for (let x = MIN; x <= MAX; x++) {
      visible = false;

      for (let j = 0; j < sensorArray.length; j++) {
        const [coordinates, distance] = sensorArray[j];
        const [sensorX, sensorY] = coordinates.split(",");
        const currentDistance =
          Math.abs(Number(sensorX) - x) + Math.abs(Number(sensorY) - y);

        if (currentDistance <= distance) {
          x = Number(sensorX) + (distance - Math.abs(Number(sensorY) - y));
          visible = true;
          break;
        }
      }
      if (!visible) {
        return x * MAX + y;
       }
    }
  }
};

export default getFrequency(input);
