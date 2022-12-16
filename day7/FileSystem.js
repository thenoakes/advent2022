const readline = require("readline");
const fs = require("fs");
const attachment = require("../attachments");

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
    this.children = {};
  }
  addObject(file) {
    this.children[file.name] = file;
    // return this.children[file.name];
  }
  getChild(name) {
    return this.children[name];
  }
  get size() {
    return Object.values(this.children).filter(f => f.kind === 'File').reduce((next, acc) => acc + next.size);
  }
}

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
          console.log('IS LISTING: ', input);
          isListing = true;
          // return;
        }

        if (isListing && currentLocation) {
          const isDir = input.startsWith("dir");
          //   if (test()) {
          //     // console.log(input);
          if (isDir) {
            console.log('DIR: ', input);
            const dirName = input.slice("dir ".length);
            if (!currentLocation.children[dirName]) {
              currentLocation.addObject(new Directory(dirName));
            }
          } else {
            console.log('FILE: ', input);
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

const myFileSystem = new FileSystem(attachment("day7_terminal.txt"));
