const fs = require("fs");

const filePath = process.argv[2];

const battleInstructions = [];

const RockPaperScissorsValues = {
  ROCK: 1,
  PAPER: 2,
  SCISSORS: 3,
};

const DesiredOutcomes = {
  WIN: "WIN",
  DRAW: "DRAW",
  LOSE: "LOSE",
};

const getMappedRPSValue = (input) => {
  switch (input) {
    case "A":
      return RockPaperScissorsValues.ROCK;
    case "B":
      return RockPaperScissorsValues.PAPER;
    case "C":
      return RockPaperScissorsValues.SCISSORS;
  }
};

const getDesiredOutcome = (input) => {
  switch (input) {
    case "X":
      return DesiredOutcomes.LOSE;
    case "Y":
      return DesiredOutcomes.DRAW;
    case "Z":
      return DesiredOutcomes.WIN;
  }
};

const allFileContents = fs.readFileSync(filePath, "utf-8");
allFileContents.split(/\r?\n/).forEach((line) => {
  battleInstructions.push({
    enemy: getMappedRPSValue(line.substring(0, 1)),
    me: getDesiredOutcome(line.substring(2, 3)),
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

const getHandToPlay = (enemy, desiredOutcome) => {
  switch (enemy) {
    case RockPaperScissorsValues.ROCK:
      switch (desiredOutcome) {
        case DesiredOutcomes.LOSE:
          return RockPaperScissorsValues.SCISSORS;
        case DesiredOutcomes.DRAW:
          return RockPaperScissorsValues.ROCK;
        case DesiredOutcomes.WIN:
          return RockPaperScissorsValues.PAPER;
      }
    case RockPaperScissorsValues.PAPER:
      switch (desiredOutcome) {
        case DesiredOutcomes.LOSE:
          return RockPaperScissorsValues.ROCK;
        case DesiredOutcomes.DRAW:
          return RockPaperScissorsValues.PAPER;
        case DesiredOutcomes.WIN:
          return RockPaperScissorsValues.SCISSORS;
      }
    case RockPaperScissorsValues.SCISSORS:
      switch (desiredOutcome) {
        case DesiredOutcomes.LOSE:
          return RockPaperScissorsValues.PAPER;
        case DesiredOutcomes.DRAW:
          return RockPaperScissorsValues.SCISSORS;
        case DesiredOutcomes.WIN:
          return RockPaperScissorsValues.ROCK;
      }
  }
};

const totalScore = battleInstructions.reduce((result, battle) => {
  const handToPlay = getHandToPlay(battle.enemy, battle.me);
  const score = getScore(battle.enemy, handToPlay);
  const handValue = getHandValue(handToPlay);

  result += score + handValue;

  return result;
}, 0);

console.log("My total score is: ", totalScore);
