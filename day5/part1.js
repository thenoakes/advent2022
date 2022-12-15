const attachment = require("../attachments");
const readline = require("readline");
const fs = require("fs");
const StackParser = require("./StackParser");

const pathToFile = attachment("day5_crates.txt");

const readMoves = () =>
  new Promise((resolve) => {
    const parseMoveInput = (input) =>
      input.startsWith("move")
        ? Array.from(
            input.matchAll(/move\s(\d+)\sfrom\s(\d+)\sto\s(\d+)/g)
          ).flatMap((l) => l.slice(1).map(Number))
        : [];

    const moves = [];

    readline
      .createInterface({ input: fs.createReadStream(pathToFile) })
      .on("line", (input) => {
        const rawMove = parseMoveInput(input);
        if (rawMove.length) {
          moves.push(rawMove);
        }
      })
      .on("close", () => {
        resolve(moves);
      });
  });

const executeMoves = (moveArray) => {
  const parser = new StackParser(pathToFile);
  parser.parse().then((stacks) => {
    function getTopCrates() {
      return stacks.flatMap((s) => s.slice(-1)).join("");
    }

    function execute([count, from, to]) {
      const source = stacks[from - 1];
      const destination = stacks[to - 1];

      for (let i = 0; i < count; i++) {
        destination.push(source.pop());
      }
    }

    for (const move of moveArray) {
      execute(move);
    }

    console.log(getTopCrates());
  });
};

readMoves().then((m) => executeMoves(m));
