const attachment = require("../attachments");
const ElfAnalyser = require("./ElfAnalyser");

const pathToFile = attachment("day1_calories.txt");
const analyser = new ElfAnalyser(pathToFile);
analyser
  .analyse((current, max = 0) => Math.max(current, max))
  .then(console.log);
