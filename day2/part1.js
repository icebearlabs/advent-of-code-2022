const fs = require("fs");

const filePath = process.argv[2];

const battleInstructions = [];

const RockPaperScissorsValues = {
  ROCK: 1,
  PAPER: 2,
  SCISSORS: 3,
};

const getMappedRPSValue = (input) => {
  switch (input) {
    case "A":
    case "X":
      return RockPaperScissorsValues.ROCK;
    case "B":
    case "Y":
      return RockPaperScissorsValues.PAPER;
    case "C":
    case "Z":
      return RockPaperScissorsValues.SCISSORS;
  }
};

const allFileContents = fs.readFileSync(filePath, "utf-8");
allFileContents.split(/\r?\n/).forEach((line) => {
  battleInstructions.push({
    enemy: getMappedRPSValue(line.substring(0, 1)),
    me: getMappedRPSValue(line.substring(2, 3)),
  });
});

const getScore = (enemy, me) => {
  switch (enemy) {
    case RockPaperScissorsValues.PAPER:
      switch (me) {
        case RockPaperScissorsValues.ROCK:
          return 0;
        case RockPaperScissorsValues.PAPER:
          return 3;
        case RockPaperScissorsValues.SCISSORS:
          return 6;
      }
    case RockPaperScissorsValues.ROCK:
      switch (me) {
        case RockPaperScissorsValues.ROCK:
          return 3;
        case RockPaperScissorsValues.PAPER:
          return 6;
        case RockPaperScissorsValues.SCISSORS:
          return 0;
      }
    case RockPaperScissorsValues.SCISSORS:
      switch (me) {
        case RockPaperScissorsValues.ROCK:
          return 6;
        case RockPaperScissorsValues.PAPER:
          return 0;
        case RockPaperScissorsValues.SCISSORS:
          return 3;
      }
  }
};

const getHandValue = (me) => {
  switch (me) {
    case RockPaperScissorsValues.ROCK:
      return 1;
    case RockPaperScissorsValues.PAPER:
      return 2;
    case RockPaperScissorsValues.SCISSORS:
      return 3;
  }
};

const totalScore = battleInstructions.reduce((result, battle) => {
  const score = getScore(battle.enemy, battle.me);
  const handValue = getHandValue(battle.me);

  result += score + handValue;

  return result;
}, 0);

console.log("My total score is: ", totalScore);
