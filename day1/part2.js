const attachment = require("../attachments");
const ElfAnalyser = require("./ElfAnalyser");

const pathToFile = attachment("day1_calories.txt");
const analyser = new ElfAnalyser(pathToFile);
analyser
  .analyse((current, max = [0, 0, 0]) =>
    [...max, current].sort((a, b) => a - b).slice(1)
  )
  .then((max) => console.log(max.reduce((a, n) => a + n)));
