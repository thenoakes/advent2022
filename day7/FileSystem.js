const readline = require("readline");
const fs = require("fs");
const attachment = require("../attachments");

class FileSystem {
  constructor(pathToFile) {
    this.reader = readline.createInterface({
      input: fs.createReadStream(pathToFile),
    });
    this.#initialise();
  }

  // static parseLine(line) {

  // }

  #initialise() {
    let currentPath = ["/"];
    let isListing = false;
    this.reader
      .on("line", (input) => {
        if (/^\$ cd /.test(input)) {
          isListing = false;
          const arg = input.slice("$ cd ".length);
          switch (arg) {
            case "/":
              currentPath = ["/"];
              break;
            case "..":
              currentPath.pop();
              break;
            default:
              currentPath.push(arg);
              break;
          }
          if (
            currentPath.length === 2 &&
            currentPath[0] === "/" &&
            currentPath[1] === "cvt"
          ) {
            console.log(currentPath);
          }
        } else if (/^\$ ls/.test(input)) {
          isListing = true;
          return;
        }

        if (isListing) {
          if (
            currentPath.length === 2 &&
            currentPath[0] === "/" &&
            currentPath[1] === "cvt"
          ) {
            console.log(input);
          }
        }
      })
      .on("close", () => {});
  }
}

const myFileSystem = new FileSystem(attachment("day7_terminal.txt"));
