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

const highestCalorie = elves.reduce(
  (result, elf, index) => {
    const sumOfElfCalories = elf.reduce((r, cal) => {
      r += cal;
      return r;
    }, 0);

    if (result.calorie < sumOfElfCalories) {
      result.calorie = sumOfElfCalories;
      result.elf = index;
    }
    return result;
  },
  { calorie: 0, elf: undefined }
);

console.log("Highest calorie: ", highestCalorie);
