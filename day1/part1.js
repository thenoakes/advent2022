const { processInput } = require("../parser/Parser");

(async function () {
  const state = { max: 0, current: 0 };

  await processInput("day1_calories.txt", (input) => {
    if (input.trim() === "") {
      state.max = Math.max(state.current, state.max);
      state.current = 0;
    } else {
      const val = parseInt(input);
      state.current += val;
    }
  });

  console.log(state.max);
})();
