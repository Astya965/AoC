import { parseInput } from '../util';
import { analyzeSignal } from './part1';
const input = parseInput({split: false});

const MARKER_LENGTH = 14;

export default analyzeSignal(input, MARKER_LENGTH);
