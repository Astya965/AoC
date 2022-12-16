import { getPressure, nodeMap, openned, START, TEAM_TIME } from "./part1";

console.log(nodeMap.values());
export default getPressure(nodeMap, START, 0, TEAM_TIME, openned, true);