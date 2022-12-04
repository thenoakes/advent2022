const readline = require("readline");
const fs = require("fs");

const VALUE_OFFSET = "a".charCodeAt(0) - 1;

const getItemPriority = (item) => {
  const lowered = item.toLowerCase();
  const value = lowered.charCodeAt(0) - VALUE_OFFSET;
  return lowered === item ? value : value + 26;
};

const getDistinctItems = (contents) => {
  const compartmentSize = contents.length / 2;
  const compartment1 = contents.slice(0, compartmentSize);
  const compartment2 = contents.slice(compartmentSize);

  const getDistinct = (items) => [...new Set(items.split(""))];
  return {
    all: getDistinct(contents),
    first: getDistinct(compartment1),
    second: getDistinct(compartment2),
  };
};

const getIntersection = (...arrays) =>
  arrays.reduce((a, b) => a.filter((c) => b.includes(c)));

class RucksackAnalyser {
  #initialiseGroup() {
    this.groupItems = [];
  }

  constructor(pathToFile) {
    this.total = 0;
    this.badgeTotal = 0;
    this.reader = readline.createInterface({
      input: fs.createReadStream(pathToFile),
    });

    this.#initialiseGroup();
  }

  analyse() {
    return new Promise((resolve) => {
      this.reader
        .on("line", (input) => {
          const { all, first, second } = getDistinctItems(input);
          const compartmentCommon = getIntersection(first, second)[0];
          this.total += getItemPriority(compartmentCommon);

          this.groupItems.push(all);

          if (this.groupItems.length === 3) {
            const groupCommon = getIntersection(...this.groupItems)[0];
            this.badgeTotal += getItemPriority(groupCommon);
            
            this.#initialiseGroup();
          }
        })
        .on("close", () => resolve([this.total, this.badgeTotal]));
    });
  }
}

module.exports = RucksackAnalyser;
