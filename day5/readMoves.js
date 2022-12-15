const readline = require("readline");
const fs = require("fs");

module.exports = {
  readMoves: (path) =>
    new Promise((resolve) => {
      const parseMoveInput = (input) =>
        input.startsWith("move")
          ? Array.from(
              input.matchAll(/move\s(\d+)\sfrom\s(\d+)\sto\s(\d+)/g)
            ).flatMap((l) => l.slice(1).map(Number))
          : [];

      const moves = [];

      readline
        .createInterface({ input: fs.createReadStream(path) })
        .on("line", (input) => {
          const rawMove = parseMoveInput(input);
          if (rawMove.length) {
            moves.push(rawMove);
          }
        })
        .on("close", () => {
          resolve(moves);
        });
    }),
};
