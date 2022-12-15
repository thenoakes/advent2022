const attachment = require("../attachments");
const readline = require("readline");
const fs = require("fs");
const { parse } = require("dotenv");
const StackParser = require("./StackParser");

const pathToFile = attachment("day5_crates.txt");

const parser = new StackParser(pathToFile);
parser.parse().then(() => {
  console.log(parser.getStack(7));
});

// const reader = readline.createInterface({
//   input: fs.createReadStream(pathToFile),
// });

// const parseCrateInput = (line) =>
//   line.includes("[")
//     ? line.match(new RegExp(".{1,4}", "g")).map((c) => c.trim())
//     : [];

// // const stacks = Array.from({ length: 9 }).fill([]);
// const thing = [];

// reader
//   .on("line", (input) => {
//     const crates = parseCrateInput(input).map((i) =>
//       /[A-Z]/.test(i) ? i[1] : null
//     );
//     thing.push(crates);
//     // for (let i = 0; i < 9; i++) {
//     //   stacks[]
//     // }
//     // console.log(parseCrateInput(input));
//     if (input.startsWith("move")) {
//       reader.close();
//       reader.removeAllListeners();
//     }
//   })
//   .on("close", () => {
//     const final = thing.filter((row) => row.length).reverse();
//     const stack1 = final.map(r => r[0]);
//     console.log(stack1);
//     // console.log(final.length, final[1]);
//     // for (const layer of final) {
//     //   console.log(final);
//     //   // for (let i = 0; i < 9; i++) {
//     //     // console.log(layer[i]);
//     //     // if (layer[i] !== null) {
//     //     //   stacks[i].push(layer[i]);
//     //     // }
//     //   // }
//     // }
//     // console.log(stacks[0]);
//     // console.log(final);
//   });
