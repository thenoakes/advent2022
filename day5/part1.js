const attachment = require("../attachments");
const StackParser = require("./StackParser");
const { readMoves } = require("./readMoves");

const pathToFile = attachment("day5_crates.txt");

const executeMoves = (moveArray) => {
  const parser = new StackParser(pathToFile);
  parser.parse().then(({ parsedStacks, getTopCrates }) => {
    function execute([count, from, to]) {
      const source = parsedStacks[from - 1];
      const destination = parsedStacks[to - 1];

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

readMoves(pathToFile).then((m) => executeMoves(m));
