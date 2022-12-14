import { dijkstra, getGraphInfo, input } from './part1';

const { graph, end, lowlands } = getGraphInfo(input);
const costs = dijkstra(graph, end);

const getClosestLowland = (costs: Map<string, number>, lowlands: string[]) => {
    let closestDistance = Infinity;
    for (let i = 0; i < lowlands.length; i++) {
        const cost = costs.get(lowlands[i]);
        if (cost && cost < closestDistance) {
            closestDistance = cost;
        }
    }
    return closestDistance;
}

export default getClosestLowland(costs, lowlands);

