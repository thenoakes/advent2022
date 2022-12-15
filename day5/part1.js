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

function executeMoves(moveArray) {
  const parser = new StackParser(pathToFile);
  parser.parse().then((stacks) => {

    function executeMove(move) {
      const [count, source, destination] = move;
      // console.log(`move ${count} from ${source} to ${destination}`);

      const sourceStack = stacks[source - 1];
      const destStack = stacks[destination - 1];

      for (let i = 0; i < count; i++) {
        destStack.push(sourceStack.pop());
      }
    }

    for (const move of moveArray) {
      executeMove(move);
    }

    console.log(stacks.flatMap((s) => s.slice(-1)).join(""));
  });
}

readMoves().then((m) => executeMoves(m));

