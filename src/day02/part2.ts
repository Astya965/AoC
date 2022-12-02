import { parseInput } from "../util";

const input = parseInput({
  split: { delimiter: "\n", mapper: false },
});

const RESULT = {
  WIN: 6,
  DRAW: 3,
  LOSE: 0,
};

const SHAPE = {
  ROCK: 1,
  PAPER: 2,
  SCISSORS: 3,
};

const OPPONTENT_VALUE = {
  ROCK: "A",
  PAPER: "B",
  SCISSORS: "C",
};

const RESULT_VALUE = {
  LOSE: "X",
  DRAW: "Y",
  WIN: "Z",
};

const answerError =new Error("Wrong answer type");

// Get points for result
const getResultType = (result: string) => {
  switch (result) {
    case RESULT_VALUE.LOSE:
      return RESULT.LOSE;
    case RESULT_VALUE.DRAW:
      return RESULT.DRAW;
    case RESULT_VALUE.WIN:
      return RESULT.WIN;
    default:
      throw answerError;
  }
};


// Get point for answer
const getYourResult = (opponentType: string, resultScore: number) => {
  if (resultScore === RESULT.DRAW) {
    switch (opponentType) {
      case OPPONTENT_VALUE.ROCK:
        return SHAPE.ROCK;
      case OPPONTENT_VALUE.PAPER:
        return SHAPE.PAPER;
      case OPPONTENT_VALUE.SCISSORS:
        return SHAPE.SCISSORS;
      default:
        throw answerError;
    }
  } else if (resultScore === RESULT.WIN) {
    switch (opponentType) {
      case OPPONTENT_VALUE.ROCK:
        return SHAPE.PAPER;
      case OPPONTENT_VALUE.PAPER:
        return SHAPE.SCISSORS;
      case OPPONTENT_VALUE.SCISSORS:
        return SHAPE.ROCK;
      default:
        throw answerError;
    }
  } else {
    switch (opponentType) {
      case OPPONTENT_VALUE.ROCK:
        return SHAPE.SCISSORS;
      case OPPONTENT_VALUE.PAPER:
        return SHAPE.ROCK;
      case OPPONTENT_VALUE.SCISSORS:
        return SHAPE.PAPER;
      default:
        throw answerError;
    }
  }
};


// Get score for answer and for result
const getScore = (value: string) => {
  const [opponentValue, result] = value.split(" ");

  const resultScore = getResultType(result);
  const myValueScore = getYourResult(opponentValue, resultScore);
  return myValueScore + resultScore;
};

//Get sum
export default input.reduce((acc, curr) => acc + getScore(curr), 0);

// Alter.solution make switch for nine results AX = 3, AY = 4, AZ = 8...
