import { contrainers, followInstruction, getTopContainers, instruction, parseStingToMap } from './part1';

const map = parseStingToMap(contrainers);
followInstruction(instruction, map, true);

export default getTopContainers(map);