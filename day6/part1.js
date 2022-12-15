const fs = require("fs");
const attachment = require("../attachments");

const pathToFile = attachment("day6_signal.txt");
const signalData = fs.readFileSync(pathToFile, "utf8").toString();

const MARKER_SIZE = 4;

for (let i = MARKER_SIZE; i < signalData.length; i++) {
  const found = markerFound(signalData, i, MARKER_SIZE);
  if (found) {
    console.log(`Marker found at index ${i}`);
    break;
  }
}

function markerFound(signal, sliceSize, markerSize) {
  const candidate = signal.slice(0, sliceSize).slice(markerSize * -1);
  const isMarker = new Set(candidate).size === 4;
  if (isMarker) {
    console.log(candidate);
  }
  return isMarker;
}
