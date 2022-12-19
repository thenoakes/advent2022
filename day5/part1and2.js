const { processInput } = require("../parser");

class StackParser {
  constructor(crates) {
    this.raw = crates;
  }

  get #output() {
    return [...this.raw.filter((row) => row.length)].reverse();
  }

  get maxHeight() {
    return this.#output.length;
  }

  get stackCount() {
    return this.#output[0]?.length ?? 0;
  }

  getStack(index) {
    return index <= this.stackCount
      ? this.#output.map((r) => r[index]).filter(Boolean)
      : [];
  }

  get stacks() {
    return Array.from({ length: this.stackCount }).map((_, idx) =>
      this.getStack(idx)
    );
  }
}

const fileName = "day5_crates.txt";

const movePattern = /move\s(\d+)\sfrom\s(\d+)\sto\s(\d+)/g;
const parseMoveInput = (input) =>
  input.startsWith("move")
    ? Array.from(input.matchAll(movePattern)).flatMap((l) =>
        l.slice(1).map(Number)
      )
    : [];

async function getMovesArray() {
  const moves = [];
  await processInput(fileName, (input) => moves.push(parseMoveInput(input)));
  return moves.filter((m) => m.length);
}

const parseCrateInput = (input) => {
  return input.includes("[")
    ? input.match(new RegExp(".{1,4}", "g")).map((c) => c.trim())
    : [];
};

async function getCrates() {
  const rawCrates = [];
  await processInput(fileName, (input) => {
    const crates = parseCrateInput(input).map((i) =>
      /[A-Z]/.test(i) ? i[1] : null
    );
    rawCrates.push(crates);
  });
  return new StackParser(rawCrates);
}

(async function () {
  const moveArray = await getMovesArray();
  
  const { stacks: stacks1 } = await getCrates();
  for (const [count, from, to] of moveArray) {
    const source = stacks1[from - 1];
    const destination = stacks1[to - 1];

    for (let i = 0; i < count; i++) {
      destination.push(source.pop());
    }
  }

  const { stacks: stacks2 } = await getCrates();
  for (const [count, from, to] of moveArray) {
    const source = stacks2[from - 1];
    const destination = stacks2[to - 1];

    const toMove = source.slice(count * -1);
    source.splice(count * -1);
    destination.push(...toMove);
  }

  const topCrates = (s) => s.flatMap((s) => s.slice(-1)).join("");

  console.log("Part 1", topCrates(stacks1));
  console.log("Part 2", topCrates(stacks2));
})();
