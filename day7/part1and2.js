const { processInput } = require("../parser");

const fileName = "day7_terminal.txt";

/** Transform (optionally) and sum the values of an array of key-value pairs */
const sum = (contents, transform = (x) => x) =>
  Object.values(contents).reduce((acc, next) => acc + transform(next), 0);

(async function () {
  const fileSystem = {};
  let pwd = ["root"];

  const registerCurrentDir = () => {
    const key = pwd.join("/");
    if (!fileSystem[key]) {
      fileSystem[key] = {};
    }
  };

  const registerFile = (fileName, size) => {
    const key = pwd.join("/");
    fileSystem[key][fileName] = size;
  };

  await processInput(fileName, (input) => {
    // cd
    if (/^\$ cd /.test(input)) {
      const arg = input.slice("$ cd ".length);
      switch (arg) {
        case "/":
          pwd = ["root"];
          break;
        case "..":
          pwd.pop();
          break;
        default:
          pwd.push(arg);
          break;
      }
      registerCurrentDir();
    }

    if (/^\d+ /.test(input)) {
      const [size, name] = input.split(" ");
      registerFile(name, parseInt(size));
    }
  });

  const sizeMap = new Map();

  for (const path in fileSystem) {
    const subDirectories = Object.entries(fileSystem).filter(([key]) =>
      key.startsWith(path)
    );
    const totalSize = sum(subDirectories, ([, files]) => sum(files));
    sizeMap.set(path, totalSize);
  }

  const largeDirs = [...sizeMap.values()].filter((v) => v <= 100000);

  console.log("Part 1", sum(largeDirs));

  const spaceFree = 70000000 - sizeMap.get("root");
  const spaceReqd = 30000000 - spaceFree;

  const sortedDirs = [...sizeMap.entries()].sort(([, a], [, b]) => a - b);

  for (const [dir, size] of sortedDirs) {
    if (size >= spaceReqd) {
      console.log("Part 2", `Delete ${dir} to free up ${size}`);
      break;
    }
  }
})();

