const attachment = require("../attachments");
const GameAnalyser = require("./GameAnalyser");

const pathToFile = attachment("day2_rockpaperscissors.txt");

const codeToShape = new Map([
  ["A", GameAnalyser.ROCK],
  ["B", GameAnalyser.PAPER],
  ["C", GameAnalyser.SCISSORS],
]);

const calculateCounterMove = (move, strategy) => {
  const losingMove = GameAnalyser.winMap[move];
  switch (strategy) {
    case "Y": // draw
      return move;
    case "X": // lose
      return losingMove;
    default: // win
      return GameAnalyser.winMap[losingMove];
  }
};

const analyser = new GameAnalyser(pathToFile);
analyser
  .analyse((line) => {
    const [theirs, myStrategy] = line.trim().split(" ");
    const theirMove = codeToShape.get(theirs);
    return [theirMove, calculateCounterMove(theirMove, myStrategy)];
  })
  .then(console.log);
