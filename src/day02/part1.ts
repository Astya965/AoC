import { parseInput } from "../util";
const input = parseInput({
  split: { delimiter: "\n", mapper: false},
});

type ShapeT = {
    value: string[],
    score: number
} 

const RESULT = {
  WIN: 6,
  DRAW: 3,
  LOSE: 0,
};

const SHAPE = {
  ROCK: {
    value: ['A', 'X'],
    score: 1
  },
  PAPER: {
    value: ['B', 'Y'],
    score: 2
  },
  SCISSORS: {
    value: ['C', 'Z'],
    score: 3
  },
};

// Sum points for answer and for result
const getScore = (value: string) => {
    const [oponentValue, myValue] = value.split(' ');
    const myAnswerType = getAnswerType(myValue);
    const oppenentType = getAnswerType(oponentValue);

    if (myAnswerType === oppenentType) {
        return RESULT.DRAW + myAnswerType.score;
    } else if (isWin(myAnswerType, oppenentType)) {
        return RESULT.WIN + myAnswerType.score;
    } else {
        return RESULT.LOSE + myAnswerType.score;
    }

}

const isWin = (myValue: ShapeT, oponentValue: ShapeT) => (myValue === SHAPE.ROCK && oponentValue === SHAPE.SCISSORS) 
|| (myValue === SHAPE.PAPER && oponentValue === SHAPE.ROCK)|| (myValue == SHAPE.SCISSORS && oponentValue === SHAPE.PAPER);

const getAnswerType = (value: string) => {
    if (SHAPE.ROCK.value.includes(value)) {
        return SHAPE.ROCK;
    } else if (SHAPE.PAPER.value.includes(value)) {
        return SHAPE.PAPER;
    } else {
        return SHAPE.SCISSORS;
    }
}

// Sum all points
export default input.reduce((acc, curr) => acc + getScore(curr), 0);