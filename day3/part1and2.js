const attachment = require("../attachments");
const RucksackAnalyser = require("./RucksackAnalyser");

const pathToFile = attachment("day3_rucksacks.txt");
const analyser = new RucksackAnalyser(pathToFile);
analyser.analyse().then(console.log);
