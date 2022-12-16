const fs = require("fs");
const attachment = require("../attachments");

const pathToFile = attachment("day6_signal.txt");
const signalData = fs.readFileSync(pathToFile, "utf8").toString();

const indexOfContiguousDistinctChars = (signal, numberOfCharacters) => {
  for (let i = numberOfCharacters; i < signal.length; i++) {
    const candidate = signal.slice(0, i).slice(numberOfCharacters * -1);
    if (new Set(candidate).size === numberOfCharacters) {
      return i;
    }
  }
};

console.log(indexOfContiguousDistinctChars(signalData, 4));
console.log(indexOfContiguousDistinctChars(signalData, 14));