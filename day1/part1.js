const ElfAnalyser = require("./ElfAnalyser");
const readline = require("readline");
const fs = require("fs");

const pathToFile = "../attachments/day1_calories.txt";

let max = 0;

const analyser = new ElfAnalyser(pathToFile);
analyser.analyse((current) => {
  if (current > max) {
    max = current;
  }
}).then(() => console.log(max));

// const reader = readline.createInterface({
//   input: fs.createReadStream(pathToFile),
// });

// let max = 0;
// let current = 0;

// reader.on("line", function (input) {
//   if (input.trim() === "") {
//     if (current > max) {
//       max = current;
//     }
//     current = 0;
//   } else {
//     const val = parseInt(input);
//     current += val;
//   }
// }).on('close', function() {
//     console.log(max);
// });
