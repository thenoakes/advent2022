const readline = require("readline");
const fs = require("fs");

/** Represents a contiguous range of cleaning assignments */
class CleaningAssignment {
  constructor(input) {
    const [min, max] = input.trim().split("-").map(Number);
    this.min = min;
    this.max = max;
    this.count = max - min + 1;
  }

  /** Determines if a given assignment fully contains a second assignment */
  fullyContains({ min, max, count }) {
    return this.count >= count && this.min <= min && this.max >= max;
  }

  /** Determines if a given assignment overlaps at all with a second assignment */
  overlapsWith({ min, max }) {
    return Math.min(this.max, max) >= Math.max(this.min, min);
  }
}

class CleanupAnalyser {
  constructor(pathToFile) {
    this.fullyContainedCount = 0;
    this.overlappingCount = 0;
    this.reader = readline.createInterface({
      input: fs.createReadStream(pathToFile),
    });
  }

  analyse() {
    return new Promise((resolve) => {
      this.reader
        .on("line", (input) => {
          const [elf1Raw, elf2Raw] = input.trim().split(",");

          const elf1 = new CleaningAssignment(elf1Raw);
          const elf2 = new CleaningAssignment(elf2Raw);

          if (elf1.fullyContains(elf2) || elf2.fullyContains(elf1)) {
            this.fullyContainedCount += 1;
          }
          if (elf1.overlapsWith(elf2)) {
            this.overlappingCount += 1;
          }
        })
        .on("close", () =>
          resolve([this.fullyContainedCount, this.overlappingCount])
        );
    });
  }
}

module.exports = CleanupAnalyser;
