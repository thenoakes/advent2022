const attachment = require("../attachments");
const CleanupAnalyser = require("./CleanupAnalyser");

const pathToFile = attachment("day4_cleanup.txt");
const analyser = new CleanupAnalyser(pathToFile);
analyser.analyse().then(console.log);