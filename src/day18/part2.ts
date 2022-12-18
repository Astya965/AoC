import { parseInput } from "../util";
const input = parseInput({
  split: {
    delimiter: "\n",
    mapper: false,
  },
});

type TInfo = {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  minZ: number;
  maxZ: number;
  count: number;
};

const setLavaCubes = (input: string[]) => {
  const info = {
    minX: Infinity,
    maxX: -1,
    minY: Infinity,
    maxY: -1,
    minZ: Infinity,
    maxZ: -1,
    count: 0,
  } as TInfo;
  const cubesSet: Set<string> = new Set();

  for (let i = 0; i < input.length; i++) {
    const [x, y, z] = input[i].split(",");
    setInfo(info, Number(x), Number(y), Number(z));
    cubesSet.add(input[i]);
  }
  return { cubesSet, info };
};

const setInfo = (info: TInfo, x: number, y: number, z: number) => {
  if (x < info.minX) {
    info.minX = x;
  }
  if (x > info.maxX) {
    info.maxX = x;
  }
  if (y < info.minY) {
    info.minY = y;
  }
  if (y > info.maxY) {
    info.maxY = y;
  }
  if (z < info.minZ) {
    info.minZ = z;
  }
  if (z > info.maxZ) {
    info.maxZ = z;
  }
};

const getCoordString = (x: number, y: number, z: number) => `${x},${y},${z}`;

const getNeighbours = (
  coordinates: string,
  info: TInfo,
  cubesSet: Set<string>
): string[] => {
  const [x, y, z] = coordinates.split(",").map(value => Number(value));
  const neighbours: string[] = []; //Air cubes
  //Also include air around lava droplet

  if (x >= info.minX) {
    const left = getCoordString(x - 1, y, z);
    if (cubesSet.has(left)) {
        info.count++; //Lava surface
    } else {
        neighbours.push(left); //Air surface
    }
  }

  if (x <= info.maxX) {
    const right = getCoordString(x + 1, y, z);
    if (cubesSet.has(right)) {
        info.count++;
    } else {
        neighbours.push(right);
    }
  }

  if (y >= info.minY) {
    const bottom = getCoordString(x, y - 1, z);
    if (cubesSet.has(bottom)) {
        info.count++;
    } else {
        neighbours.push(bottom);
    }
  }

  if (y <= info.maxY) {
    const top = getCoordString(x, y + 1, z);
    if (cubesSet.has(top)) {
        info.count++;
    } else {
        neighbours.push(top);
    }
  }

  if (z >= info.minZ) {
    const back = getCoordString(x, y, z - 1);
    if (cubesSet.has(back)) {
        info.count++;
    } else {
        neighbours.push(back);
    }
  }

  if (z <= info.maxZ) {
    const front = getCoordString(x, y, z + 1);
    if (cubesSet.has(front)) {
        info.count++;
    } else {
        neighbours.push(front);
    }
  }

  return neighbours;
};

const bfs = (info: TInfo, cubesSet: Set<string>) => {
    const queue: string[] = [];
    const visited = new Set<string>();
  
    queue.push(getCoordString(info.minX, info.minY, info.minZ)); // from lowest air cube in grid
  
    while (queue.length > 0) {
      const current = queue.shift();
      if (current && !visited.has(current)) {
        visited.add(current);
  
        getNeighbours(current, info, cubesSet).forEach((neighbour) => {
          queue.push(neighbour);
        });
      }
    }
  };

const { info, cubesSet } = setLavaCubes(input);
bfs(info, cubesSet);

export default info.count;
