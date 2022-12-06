import { parseInput } from '../util';
const input = parseInput({split: false});

const MARKER_LENGTH = 4;

export const analyzeSignal = (signal: string, markerLength: number) => {
    const marker: string[] = [];
    let lastIndex = -1;

    for (let i = 0; i < signal.length; i++) {
        if (marker.length === markerLength) { //Marker founded
            lastIndex = i;
            break;
        }
        const index = marker.findIndex(char => char === signal[i]);
        if (index > -1) {
            marker.splice(0, index + 1); //If marker includes current char, delete double and all berfore it
        }
        marker.push(signal[i]);
    }
    
    return lastIndex;
}

export default analyzeSignal(input, MARKER_LENGTH);