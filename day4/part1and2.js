const { processInput } = require("../parser");

/** Represents a contiguous range of cleaning assignments */
class CleaningAssignment {
  constructor(input) {
    [this.min, this.max] = input.trim().split("-").map(Number);
  }

  get count() {
    return this.max - this.min + 1;
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

const fileName = "day4_cleanup.txt";

(async function () {
  const state = { contained: 0, overlapping: 0 };

  await processInput(fileName, (input) => {
    const [elf1Raw, elf2Raw] = input.trim().split(",");

    const elf1 = new CleaningAssignment(elf1Raw);
    const elf2 = new CleaningAssignment(elf2Raw);

    if (elf1.fullyContains(elf2) || elf2.fullyContains(elf1)) {
      state.contained += 1;
    }
    if (elf1.overlapsWith(elf2)) {
      state.overlapping += 1;
    }
  });

  console.log("Part 1", state.contained);
  console.log("Part 2", state.overlapping);
})();
