import { parseInput } from "../util";
const input = parseInput({
  split: {
    delimiter: "\n",
    mapper: false,
  },
});

class Cube {
  id: string;
  x: number;
  y: number;
  z: number;
  neighbors: Cube[];
  constructor(id: string, x: number, y: number, z: number) {
    this.id = id;
    (this.x = x), (this.y = y), (this.z = z), (this.neighbors = []);
  }
}

const FACES = 6;

const setCubes = (input: string[]) => {
  const cubesMap: Map<string, Cube> = new Map();
  for (let i = 0; i < input.length; i++) {
    const [x, y, z] = input[i].split(",");
    cubesMap.set(input[i], new Cube(input[i], Number(x), Number(y), Number(z)));
  }
  cubesMap.forEach((cube) => {
    cubesMap.forEach((anotherCube) => {
      if (isNeighbors(cube, anotherCube)) {
        cube.neighbors.push(anotherCube);
      }
    });
  });
  return cubesMap;
};

const isNeighbors = (cube1: Cube, cube2: Cube) =>
  testDimensions([cube1.x, cube2.x], [cube1.y, cube2.y], [cube1.z, cube2.z]) ||
  testDimensions([cube1.x, cube2.x], [cube1.z, cube2.z], [cube1.y, cube2.y]) ||
  testDimensions([cube1.y, cube2.y], [cube1.z, cube2.z], [cube1.x, cube2.x]);

const testDimensions = (
  dimension1: number[],
  dimension2: number[],
  dimension3: number[]
) =>
  dimension1[0] === dimension1[1] &&
  dimension2[0] === dimension2[1] &&
  Math.abs(dimension3[0] - dimension3[1]) === 1;

const getFreeFaces = (cubesMap: Map<string, Cube>) => {
  let count = 0;
  cubesMap.forEach((cube) => {
    count += FACES - cube.neighbors.length;
  });
  return count;
};

const cubesMap = setCubes(input);

export default getFreeFaces(cubesMap);
