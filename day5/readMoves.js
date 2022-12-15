const readline = require("readline");
const fs = require("fs");

const movePattern = /move\s(\d+)\sfrom\s(\d+)\sto\s(\d+)/g;

const parseMoveInput = (input) =>
  input.startsWith("move")
    ? Array.from(input.matchAll(movePattern)).flatMap((l) =>
        l.slice(1).map(Number)
      )
    : [];

module.exports = {
  readMoves: (path) =>
    new Promise((resolve) => {
      const moves = [];
      readline
        .createInterface({ input: fs.createReadStream(path) })
        .on("line", (input) => moves.push(parseMoveInput(input)))
        .on("close", () => resolve(moves.filter((m) => m.length)));
    }),
};
