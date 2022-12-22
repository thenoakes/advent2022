const { processInput } = require("../parser");

const fileName = "day8_trees.txt";

(async function () {
  const state = {
    rowCount: 0,
    colCount: 0,
    currentIndex: 0,
    cols: [],
    rows: [],
  };
  const initialise = (count) => {
    state.rowCount = count;
    state.colCount = count;
  };
  const finalise = () => {
    state.cols = Array.from({ length: state.colCount }).map((_, i) =>
      state.rows.map((r) => r[i])
    );
  };

  await processInput(fileName, (input) => {
    const line = input.trim();

    if (state.currentIndex === 0) {
      initialise(line.length);
    }

    const trees = line.split("").map((x) => parseInt(x));
    state.rows.push(trees);
    // console.log({ trees });

    // for (let col = 0; col < state.colCount; col++) {
    //   state.cols[col].push(trees[col]);
    // }

    // if (state.currentIndex === 0) {
    //   state.cols[0].push(trees[0]);
    //   console.log(state.cols);
    // }

    state.currentIndex += 1;
  });

  finalise();


  // const column0 = state.rows.map((r) => r[0]);
  // const column1 = state.rows.map((r) => r[1]);
  // console.log(state.cols[98]);

  // for (let i = 0; i < state.colCount; i++) {
  //   console.log({ value: state.rows[0][i] });
  //   state.cols[i].push(state.rows[0][i]);
  // }
  // console.log(state.cols[0]);
})();
