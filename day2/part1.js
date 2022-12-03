const attachment = require("../attachments");
const GameAnalyser = require("./GameAnalyser");

const pathToFile = attachment("day2_rockpaperscissors.txt");

const codeToShape = new Map([
  ["A", GameAnalyser.ROCK],
  ["B", GameAnalyser.PAPER],
  ["C", GameAnalyser.SCISSORS],
  ["X", GameAnalyser.ROCK],
  ["Y", GameAnalyser.PAPER],
  ["Z", GameAnalyser.SCISSORS],
]);

const analyser = new GameAnalyser(pathToFile);
analyser
  .analyse((line) =>
    line
      .trim()
      .split(" ")
      .map((x) => codeToShape.get(x))
  )
  .then(console.log);
