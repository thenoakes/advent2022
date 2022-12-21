const { processInput } = require("../parser");

const fileName = "day7_terminal.txt";

const getSize = (contents) =>
  Object.values(contents).reduce((acc, next) => acc + next, 0);

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
    const totalSize = subDirectories.reduce(
      (acc, [, next]) => acc + getSize(next),
      0
    );
    sizeMap.set(path, totalSize);
  }

  const largeDirs = [...sizeMap.entries()].filter(([, v]) => v <= 100000);

  console.log("Part 1", largeDirs);
  console.log(
    "Total size",
    largeDirs.reduce((acc, [, next]) => acc + next, 0)
  );

  const spaceAvail = 70000000 - sizeMap.get("root");
  const spaceRequd = 30000000 - spaceAvail;
  console.log({ spaceRequd });

  for (const [dir, size] of [...sizeMap.entries()].sort(
    ([, a], [, b]) => a - b
  )) {
    if (size >= spaceRequd) {
      console.log(`Delete ${dir} to free up ${size}`);
      break;
    }
  }
})();

