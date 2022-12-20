const { processInput } = require("../parser");

const fileName = "day7_terminal.txt";

const getSize = (entry) =>
  Object.values(entry).reduce((acc, next) => {
    if (typeof next === "number") {
      return acc + next;
    }
    return acc + getSize(next);
  }, 0);

(async function () {
  const fileSystem = {};
  let pwd = [];
  const sizeMap = new Map();

  await processInput(fileName, (input) => {
    // cd
    if (/^\$ cd /.test(input)) {
      const arg = input.slice("$ cd ".length);
      switch (arg) {
        case "/":
          pwd = [];
          break;
        case "..":
          pwd.pop();
          break;
        default:
          pwd.push(arg);
          break;
      }
    }

    let target = fileSystem;
    for (const segment of pwd) {
      if (!target[segment]) {
        target[segment] = {};
      }
      target = target[segment];
    }

    if (/^\d+ /.test(input)) {
      const [size, name] = input.split(" ");

      let target = fileSystem;
      for (const segment of pwd) {
        target = target[segment];
      }
      target[name] = parseInt(size);
      sizeMap.set(pwd.join("/"), getSize(target));
    }
  });

  console.log("Part 1", JSON.stringify(fileSystem));
  console.log("Part 1", sizeMap);
  console.log(
    "Test",
    sizeMap.get("cvt/dch/djfww/lbrhbc"),
    sizeMap.get("cvt/dch/djfww/lbrhbc/djfww")
  );
  console.log(
    "Dirs",
    Array.from(sizeMap.entries())
      .filter(([_, v]) => v <= 100000)
      // .reduce((acc, [_, v]) => (acc + v), 0)
      .map(([k, _]) => k)
  );

  // const tlds = Object.keys(fileSystem).filter(
  //   (x) => typeof fileSystem[x] === "object"
  // );

  // const totalToClean = tlds.reduce((acc, next) => {
  //   const size = getSize(fileSystem[next]);
  //   console.log(next, size);
  //   return size <= 100000 ? acc + size : acc;
  // }, 0);

  // const dirsToClean = Object.entries(fileSystem)
  //   .filter(
  //     ([_, value]) => typeof value === "object" && getSize(value) <= 100000
  //   )
  //   .map(([name]) => name);

  // console.log("Part 1", totalToClean);
})();

// const sample = {
//   "hcqbmwc.gts": 4967,
//   "hsbhwb.clj": 5512,
//   "pwgswq.fld": 277125,
//   "qdzr.btl": 42131,
//   "vmbnlzgb.wbd": 144372,
//   cvt: {
//     "bcqrmp.czf": 146042,
//     "hvfvt.qtb": 243293,
//     lrpb: 245795,
//     "qlqqmndd.zcb": 181756,
//     "rtfzt.tjp": 18658,
//     bbgsthsd: { "djfww.fcb": 236957, "hcqbmwc.gts": 112286, qggjrzts: 106102 },
//   },
// };

// console.log(getSize(sample));
