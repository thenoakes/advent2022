const { processInput } = require("../parser/Parser");

(async function () {
  let max = 0;
  let current = 0;

  await processInput("day1_calories.txt", (input) => {
    if (input.trim() === "") {
      max = Math.max(current, max);
      current = 0;
    } else {
      const val = parseInt(input);
      current += val;
    }
  });

  console.log(max);
})();
