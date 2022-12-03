const readline = require("readline");
const fs = require("fs");

class GameAnalyser {
  static ROCK = "ROCK";
  static PAPER = "PAPER";
  static SCISSORS = "SCISSORS";

  static winMap = {
    [GameAnalyser.PAPER]: GameAnalyser.ROCK,
    [GameAnalyser.SCISSORS]: GameAnalyser.PAPER,
    [GameAnalyser.ROCK]: GameAnalyser.SCISSORS,
  };

  static scoreMap = {
    [GameAnalyser.ROCK]: 1,
    [GameAnalyser.PAPER]: 2,
    [GameAnalyser.SCISSORS]: 3,
  };

  /**
   * Analyse games of rock, paper, scissors according to certain rules.
   * @param {string} pathToFile - Path to the text file containing data.
   */
  constructor(pathToFile) {
    this.score = 0;
    this.reader = readline.createInterface({
      input: fs.createReadStream(pathToFile),
    });
  }

  /**
   * Score each game, by converting the input into a pair of shapes in the order [opponent, player].
   * @param parser - Function, which should read a line of the file and return a pair of
   * moves from "ROCK", "PAPER", "SCISSORS"
   * @returns {Promise<number>} - The final score.
   */
  analyse(parser) {
    return new Promise((resolve) => {
      this.reader
        .on("line", (input) => {
          const [theirs, mine] = parser(input);
          const scoreForShape = GameAnalyser.scoreMap[mine];
          const scoreForRound = (() => {
            if (theirs === mine) {
              return 3;
            }
            if (GameAnalyser.winMap[mine] === theirs) {
              return 6;
            }
            return 0;
          })();
          this.score += scoreForRound + scoreForShape;
        })
        .on("close", () => resolve(this.score));
    });
  }
}

module.exports = GameAnalyser;
