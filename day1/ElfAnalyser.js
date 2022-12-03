const readline = require("readline");
const fs = require("fs");

class ElfAnalyser {
  /**
   * Analyse snacks carried by elves as specified in a text file.
   * @param {string} pathToFile - Path to the text file containing data.
   */
  constructor(pathToFile) {
    this.current = 0;
    this.summary = undefined;
    this.reader = readline.createInterface({
      input: fs.createReadStream(pathToFile),
    });
  }

  /**
   * Sum each elf's snacks to get an elf total, and use this to update some summary object.
   * @param {(current: number, summary: any) => any} summariser - Function
   * which should update the summary object from each elf total.
   * @returns {Promise<any>} - The final summary object.
   */
  analyse(summariser) {
    return new Promise((resolve) => {
      this.reader
        .on("line", (input) => {
          if (input.trim() === "") {
            this.summary = summariser(this.current, this.summary);
            this.current = 0;
          } else {
            const val = parseInt(input);
            this.current += val;
          }
        })
        .on("close", () => resolve(this.summary));
    });
  }
}

module.exports = ElfAnalyser;
