const fs = require("fs");

const filePath = process.argv[2];

let rucksackContents = [];

const allFileContents = fs.readFileSync(filePath, "utf-8");
allFileContents.split(/\r?\n/).forEach((line, idx) => {
  if (idx % 3 === 0) {
    rucksackContents.push([]);
  }
  rucksackContents[rucksackContents.length - 1].push(line);
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
  for (let i = 0; i < rucksack[0].length; i++) {
    const letter = rucksack[0][i];

    if (rucksack[1].indexOf(letter) > -1 && rucksack[2].indexOf(letter) > -1) {
      result += getPriority(letter);
      break;
    }
  }
  return result;
}, 0);

console.log({ prioritySum });
