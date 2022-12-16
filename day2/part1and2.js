const { processInput } = require("../parser/Parser");

const fileName = "day2_rockpaperscissors.txt";

const ROCK = "ROCK";
const PAPER = "PAPER";
const SCISSORS = "SCISSORS";

const winMap = {
  [PAPER]: ROCK,
  [SCISSORS]: PAPER,
  [ROCK]: SCISSORS,
};

const scoreMap = {
  [ROCK]: 1,
  [PAPER]: 2,
  [SCISSORS]: 3,
};

const codeToShape = new Map([
  ["A", ROCK],
  ["B", PAPER],
  ["C", SCISSORS],
  ["X", ROCK],
  ["Y", PAPER],
  ["Z", SCISSORS],
]);

const scoreForRound = (theirs, mine) => {
  const my = scoreMap[mine];
  if (theirs === mine) {
    return my + 3;
  }
  if (winMap[mine] === theirs) {
    return my + 6;
  }
  return my;
};

(async function part1() {
  const state = { score: 0 };

  await processInput(fileName, (input) => {
    const [theirs, mine] = input
      .trim()
      .split(" ")
      .map((x) => codeToShape.get(x));

    state.score += scoreForRound(theirs, mine);
  });

  console.log('Part 1', state.score);
})();

const calculateCounterMove = (move, strategy) => {
  const losingMove = winMap[move];
  switch (strategy) {
    case "Y": // draw
      return move;
    case "X": // lose
      return losingMove;
    default: // win
      return winMap[losingMove];
  }
};

(async function part2() {
  const state = { score: 0 };

  await processInput(fileName, (input) => {
    const [theirCode, myStrategy] = input.trim().split(" ");
    const theirs = codeToShape.get(theirCode);
    const mine = calculateCounterMove(theirs, myStrategy);

    state.score += scoreForRound(theirs, mine);
  });

  console.log('Part 2', state.score);
})();
