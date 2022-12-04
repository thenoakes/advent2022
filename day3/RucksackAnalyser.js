const readline = require("readline");
const fs = require("fs");

const VALUE_OFFSET = "a".charCodeAt(0) - 1;

const getItemPriority = (item) => {
  const lowered = item.toLowerCase();
  const value = lowered.charCodeAt(0) - VALUE_OFFSET;
  return lowered === item ? value : value + 26;
};

class RucksackAnalyser {
  constructor(pathToFile) {
    this.total = 0;
    this.reader = readline.createInterface({
      input: fs.createReadStream(pathToFile),
    });
  }

  analyse() {
    return new Promise((resolve) => {
      this.reader
        .on("line", (input) => {
          const compartmentSize = input.length / 2;
          const compartment1 = input.slice(0, compartmentSize);
          const compartment2 = input.slice(compartmentSize);

          const items1 = new Set(compartment1.split(""));
          const items2 = new Set(compartment2.split(""));

          const commonItem = [...items1].find((i) => items2.has(i));
          const priority = getItemPriority(commonItem);
          this.total += priority;
          // console.log(`${commonItem}: ${priority}`);
        })
        .on("close", () => resolve(this.total));
    });
  }
}

module.exports = RucksackAnalyser;
