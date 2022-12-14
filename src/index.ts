import { outputSolution, setupDay } from "./util";

const day = Number(process.env.npm_config_date ?? 0);
const part = Number(process.env.npm_config_part ?? 0);
const setup = Boolean(process.env.npm_config_setup);

const validate = (type: "day" | "part", num: number, max: number) => {
  if (num < 1 || num > max + 1)
    throw new Error(
      `The ${type} must be number between 1 and ${max}, you entered ${num}`
    );
};

if (setup) {
  validate("day", day, 25);
  setupDay(day);
} else {
  validate("day", day, 25);
  validate("part", part, 2);

  outputSolution(day, part);
}
