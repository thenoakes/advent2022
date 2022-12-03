const readline = require("readline");
const fs = require("fs");

const pathToFile = "../attachments/day1_calories.txt";

const reader = readline.createInterface({
  input: fs.createReadStream(pathToFile),
});

let max = [0, 0, 0];
let current = 0;

reader
  .on("line", function (input) {
    if (input.trim() === "") {
      max = [...max, current].sort((a, b) => a - b).slice(1);
      current = 0;
    } else {
      const val = parseInt(input);
      current += val;
    }
  })
  .on("close", function () {
    console.log(max.reduce((a, n) => a + n, 0));
  });
