const fs = require("fs");

const filePath = process.argv[2];

let rucksackContents = [];

const allFileContents = fs.readFileSync(filePath, "utf-8");
allFileContents.split(/\r?\n/).forEach((line) => {
  rucksackContents.push({
    firstCompartment: line.substring(0, line.length / 2),
    secondCompartment: line.substring(line.length / 2),
  });
});

const getPriority = (letter) => {
  // Check if the letter is in the range of 'a' to 'z'
  if (letter >= "a" && letter <= "z") {
    // Return the corresponding priority number in the range 1 to 26
    return letter.charCodeAt(0) - "a".charCodeAt(0) + 1;
  } else if (letter >= "A" && letter <= "Z") {
    // Return the corresponding priority number in the range 27 to 52
    return letter.charCodeAt(0) - "A".charCodeAt(0) + 27;
  } else {
    // Return 0 if the input is not a letter
    return 0;
  }
};

const prioritySum = rucksackContents.reduce((result, rucksack) => {
  for (let i = 0; i < rucksack.firstCompartment.length; i++) {
    const commonLetter = rucksack.firstCompartment[i];
    if (rucksack.secondCompartment.indexOf(commonLetter) > -1) {
      const priority = getPriority(commonLetter);
      result += priority;

      break;
    }
  }
  return result;
}, 0);

console.log({ prioritySum });
