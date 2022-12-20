const { processInput } = require("../parser");
const readline = require("readline");
const fs = require("fs");

const fileName = "day7_terminal.txt";

class FileSystemObject {
  constructor(name) {
    this.name = name;
  }
}

class File extends FileSystemObject {
  constructor(name, size) {
    super(name);
    this.size = size;
    this.kind = "File";
  }
}

class Directory extends FileSystemObject {
  constructor(name) {
    super(name);
    this.kind = "Directory";
    this.files = new Map();
    this.directories = new Map();
  }

  addFile(name, size) {
    this.files.set(name, new File(name, size));
  }

  addDirectory(name) {
    if (!this.directories.has(name)) {
      this.directories.set(name, new Directory(name));
    }
  }

  getDirectory(name) {
    return this.directories.get(name);
  }

  get size() {
    return (
      sum(this.files.values(), (f) => f.size) +
      sum(this.directories.values(), (f) => f.size)
    );
  }
}

(async function () {
  const state = { pwd: ["root"], root: new Directory("root") };

  await processInput(fileName, (input) => {
    if (/^\$ cd /.test(input)) {
      const arg = input.slice("$ cd ".length);
      switch (arg) {
        case "/":
          state.pwd = ["root"];
          break;
        case "..":
          state.pwd.pop();
          break;
        default:
          state.pwd.push(arg);
          break;
      }
    }

    if (/^dir /.test(input)) {
      // A directory named dirName is at path pwd
      const dirName = input.slice("dir ".length);
      let target = state.root;
      for (const segment of [...state.pwd, dirName]) {
        // console.log({ segment, target });
        target.addDirectory(segment);
        // console.log({ target });
        target = target.getDirectory(segment);
      }
    } else if (/^\d+ /.test(input)) {
      const [size, name] = input.split(" ");
      const sizeInt = parseInt(size);

      let target = state.root;
      for (const segment of state.pwd) {
        // console.log({ segment, target });
        target.addDirectory(segment);
        // console.log({ target });
        target = target.getDirectory(segment);
      }
      target.addFile(name, sizeInt);
      // for (const segment of pwd) {
      //   target = target[segment];
      // }
      // sizeMap.set(pwd.join("/"), getSize(target));
    }
  });

  console.log("Part 1", state.root.size);
  console.log(
    "Part 1",
    state.root
      .getDirectory("cvt")
      .getDirectory("dch")
      .getDirectory("djfww")
      .getDirectory("lbrhbc").size
  );
})();

const sum = (vals, valueFn = (x) => x) =>
  Array.from(vals)
    .map(valueFn)
    .reduce((acc, next) => acc + next, 0);

class FileSystem {
  constructor(pathToFile) {
    this.reader = readline.createInterface({
      input: fs.createReadStream(pathToFile),
    });
    this.root = new Directory("/");
    this.#initialise();
  }

  #initialise() {
    let currentPath = [];
    const test = () =>
      currentPath.length === 2 &&
      currentPath[0] === "/" &&
      currentPath[1] === "cvt";
    let isListing = false;
    this.reader
      .on("line", (input) => {
        // let currentLocation = this.root;

        let currentLocation = null;

        if (/^\$ cd /.test(input)) {
          isListing = false;
          const arg = input.slice("$ cd ".length);
          switch (arg) {
            case "/":
              currentPath = [];
              break;
            case "..":
              currentPath.pop();
              break;
            default:
              currentPath.push(arg);
              break;
          }

          // console.log(currentPath);
          currentLocation = this.root;
          for (const segment of currentPath) {
            if (!currentLocation.children[segment]) {
              currentLocation.addObject(new Directory(segment));
            }
            currentLocation = currentLocation.children[segment];
          }

          // if (isListing) {
          //   const isDir = input.startsWith("dir");
          //   //   if (test()) {
          //   //     // console.log(input);
          //   if (isDir) {
          //     console.log('DIR: ', input);
          //     const dirName = input.slice("dir ".length);
          //     if (!currentLocation.children[dirName]) {
          //       currentLocation.addObject(new Directory(dirName));
          //     }
          //   } else {
          //     console.log('FILE: ', input);
          //     const [size, name] = input.split(" ");
          //     currentLocation.addObject(new File(name, size));
          //     // currentLocation.addObject(new Directory())
          //   }
          // }
          // const pathKey = currentPath.join("/").slice(1);

          // if (!this.fileSystem[pathKey]) {
          //   this.fileSystem[pathKey] = new Directory(currentPath.slice(-1));
          // }

          // if (test()) {
          //   console.log(currentPath);
          // }
        } else if (/^\$ ls/.test(input)) {
          console.log("IS LISTING: ", input);
          isListing = true;
          // return;
        }

        if (isListing && currentLocation) {
          const isDir = input.startsWith("dir");
          //   if (test()) {
          //     // console.log(input);
          if (isDir) {
            console.log("DIR: ", input);
            const dirName = input.slice("dir ".length);
            if (!currentLocation.children[dirName]) {
              currentLocation.addObject(new Directory(dirName));
            }
          } else {
            console.log("FILE: ", input);
            const [size, name] = input.split(" ");
            currentLocation.addObject(new File(name, size));
            // currentLocation.addObject(new Directory())
          }
        }

        // if (isListing) {
        //   const isDir = input.startsWith("dir");
        //   //   if (test()) {
        //   //     // console.log(input);
        //   if (isDir) {
        //     const dirName = input.slice("dir ".length);
        //     if (!currentLocation.children[dirName]) {
        //       currentLocation.addObject(new Directory(dirName));
        //     }
        //   } else {
        //     const [size, name] = input.split(" ");
        //     currentLocation.addObject(new File(name, size));
        //     // currentLocation.addObject(new Directory())
        //   }
        // }
      })
      .on("close", () => {
        console.log(this.root.getChild("cvt").getChild("bbgsthsd"));
      });
  }
}

// const myFileSystem = new FileSystem(attachment("day7_terminal.txt"));
