const readline = require("readline");
const fs = require("fs");

class StackParser {
  static parseCrateInput(line) {
    return line.includes("[")
      ? line.match(new RegExp(".{1,4}", "g")).map((c) => c.trim())
      : [];
  }

  constructor(pathToFile) {
    this.raw = [];
    this.reader = readline.createInterface({
      input: fs.createReadStream(pathToFile),
    });
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

  parse() {
    return new Promise((resolve) => {
      this.reader
        .on("line", (input) => {
          const crates = StackParser.parseCrateInput(input).map((i) =>
            /[A-Z]/.test(i) ? i[1] : null
          );
          this.raw.push(crates);

          if (input.startsWith("move")) {
            this.reader.close();
            this.reader.removeAllListeners();
          }
        })
        .on("close", () => {
          console.log(
            `Parsed ${this.stackCount} stacks with a max height of ${this.maxHeight}`
          );

          const parsedStacks = this.stacks;
          resolve({
            parsedStacks,
            getTopCrates() {
              return parsedStacks.flatMap((s) => s.slice(-1)).join("");
            },
          });
        });
    });
  }
}

module.exports = StackParser;
