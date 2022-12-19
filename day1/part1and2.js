const { processInput } = require("../parser");

const fileName = "day1_calories.txt";

(async function () {
  const state = { max: 0, current: 0 };

  await processInput(fileName, (input) => {
    if (input.trim() === "") {
      state.max = Math.max(state.current, state.max);
      state.current = 0;
    } else {
      const val = parseInt(input);
      state.current += val;
    }
  });

  console.log("Part 1", state.max);
})();

(async function () {
  const state = { max: [0, 0, 0], current: 0 };

  await processInput("day1_calories.txt", (input) => {
    if (input.trim() === "") {
      state.max = [...state.max, state.current].sort((a, b) => a - b).slice(1);
      state.current = 0;
    } else {
      const val = parseInt(input);
      state.current += val;
    }
  });

  console.log("Part 2", state.max.reduce((a, n) => a + n));
})();