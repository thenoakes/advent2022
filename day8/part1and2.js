const { processInput } = require("../parser");

const fileName = "day8_trees.txt";

(async function () {
  const state = { cols: [], rows: [], dimension: 0 };

  const initialise = (count) => {
    state.dimension = count;
  };

  const finalise = () => {
    state.cols = Array.from({ length: state.dimension }).map((_, i) =>
      state.rows.map((r) => r[i])
    );
  };

  const findVisibleDistance = (array, height) => {
    const index = array.findIndex((h) => h >= height);
    return index === -1 ? array.length : index + 1;
  };

  await processInput(fileName, (input) => {
    const line = input.trim();
    if (state.dimension === 0) {
      initialise(line.length);
    }
    state.rows.push(line.split("").map((x) => parseInt(x)));
  }).then(finalise);

  let scenicScore = 0;
  let visibleTreeCount = 4 * state.dimension - 4;
  for (let i = 1; i < state.dimension - 1; i++) {
    for (let j = 1; j < state.dimension - 1; j++) {
      const height = state.rows[i][j];
      const score = { l: 0, r: 0, t: 0, b: 0 };

      const toLeft = state.rows[i].slice(0, j);
      const toRight = state.rows[i].slice(j + 1);
      const visibleHorizontal =
        toLeft.every((h) => h < height) || toRight.every((h) => h < height);

      score.r = findVisibleDistance([...toRight], height);
      score.l = findVisibleDistance([...toLeft].reverse(), height);

      const above = state.cols[j].slice(0, i);
      const below = state.cols[j].slice(i + 1);
      const visibleVertical =
        above.every((h) => h < height) || below.every((h) => h < height);

      score.b = findVisibleDistance([...below], height);
      score.t = findVisibleDistance([...above].reverse(), height);

      if (visibleHorizontal || visibleVertical) {
        visibleTreeCount += 1;
      }

      scenicScore = Math.max(
        scenicScore,
        score.l * score.r * score.t * score.b
      );
    }
  }

  console.log("Part 1", visibleTreeCount);
  console.log("Part 2", scenicScore);
})();
