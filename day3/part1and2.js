const { processInput } = require("../parser");

const fileName = "day3_rucksacks.txt";

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

(async function () {
  const state = { total: 0, badgeTotal: 0, groupItems: [] };
  const initialiseGroup = () => (state.groupItems = []);

  await processInput(fileName, (input) => {
    const { all, first, second } = getDistinctItems(input);
    const compartmentCommon = getIntersection(first, second)[0];
    state.total += getItemPriority(compartmentCommon);

    state.groupItems.push(all);

    if (state.groupItems.length === 3) {
      const groupCommon = getIntersection(...state.groupItems)[0];
      state.badgeTotal += getItemPriority(groupCommon);

      initialiseGroup();
    }
  });

  console.log("Part 1", state.total);
  console.log("Part 2", state.badgeTotal);
})();
