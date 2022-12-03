const readline = require("readline");
const fs = require("fs");

module.exports = class ElfAnalyser {
  constructor(pathToFile) {
    this.current = 0;
    this.reader = readline.createInterface({
      input: fs.createReadStream(pathToFile),
    });
  }
  analyse(summariser) {
    return new Promise((resolve) => {
      this.reader.on("line", function (input) {
        if (input.trim() === "") {
          summariser(this.current);
          this.current = 0;
        } else {
          const val = parseInt(input);
          this.current += val;
        }
      }).on('close', function() {
          resolve();
      });
    });
  }
}