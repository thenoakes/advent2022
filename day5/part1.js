const attachment = require("../attachments");
const readline = require("readline");
const fs = require("fs");
const StackParser = require("./StackParser");

const pathToFile = attachment("day5_crates.txt");

const reader = readline.createInterface({
  input: fs.createReadStream(pathToFile),
});

const parseMoveInput = (line) =>
  line.startsWith("move")
    ? Array.from(line.matchAll(/move\s(\d+)\sfrom\s(\d+)\sto\s(\d+)/g)).flatMap(
        (l) => l.slice(1).map(Number)
      )
    : [];

const moves = [];
reader
  .on("line", (input) => {
    const test = parseMoveInput(input);
    if (test.length) {
      moves.push(test);
    }
  })
  .on("close", () => {
    // console.log(moves.length);
    execute();
  });

function execute() {
  const parser = new StackParser(pathToFile);
  parser.parse().then(() => {
    const stacks = Array.from({ length: parser.stackCount }).map((_, idx) =>
      parser.getStack(idx)
    );

    function executeMove(move) {
      const [count, source, destination] = move;
      // console.log(`move ${count} from ${source} to ${destination}`);

      const sourceStack = stacks[source - 1];
      const destStack = stacks[destination - 1];

      for (let i = 0; i < count; i++) {
        destStack.push(sourceStack.pop());
      }
    }

    for (const move of moves) {
      executeMove(move);
    }

    console.log(stacks.flatMap((s) => s.slice(-1)).join(""));
  });
}
