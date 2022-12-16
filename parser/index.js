const fs = require("fs");
const events = require("events");
const readline = require("readline");
const attachment = require("../attachments");

async function processInput(fileName, processor) {
  const reader = readline.createInterface({
    input: fs.createReadStream(attachment(fileName)),
  });
  reader.on("line", processor);
  await events.once(reader, "close");
}

module.exports = {
  processInput,
};
