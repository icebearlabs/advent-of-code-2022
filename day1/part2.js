const fs = require("fs");

const filePath = process.argv[2];

const elves = [[]];

const allFileContents = fs.readFileSync(filePath, "utf-8");
allFileContents.split(/\r?\n/).forEach((line) => {
  if (line.length > 0) {
    elves[elves.length - 1].push(parseInt(line));
  } else {
    elves.push([]);
  }
});

const allSummedUpCalories = elves.reduce((result, elf) => {
  const sumOfElfCalories = elf.reduce((r, cal) => {
    r += cal;
    return r;
  }, 0);

  result.push(sumOfElfCalories);
  return result;
}, []);

const sum = allSummedUpCalories
  .sort((a, b) => (a > b ? -1 : 1))
  .slice(0, 3)
  .reduce((r, n) => {
    r += n;
    return r;
  }, 0);

console.log({ sum });
