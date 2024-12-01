const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8");

/**
 * @param {string} line
 */
function splitLine(line) {
  const numbers = line.match(/\d+/g); // match on groups of digits
  const leftNumber = numbers[0];
  const rightNumber = numbers[1];
  return {
    left: leftNumber,
    right: rightNumber,
  };
}

/**
 * @param {Array<number>} leftList
 * @param {Array<number>} rightList 
 */
function getLeftInRightFrequency(leftList, rightList) {
  return leftList.map(leftNumber => {
    const rightListMatches = rightList.filter((rightNumber) => rightNumber === leftNumber);
    return {
      number: leftNumber,
      frequency: rightListMatches.length,
    };
  });
}

const lines = input.split("\n");
const splitLines = lines.map(splitLine);
const leftList = splitLines.map((line) => parseInt(line.left));
const rightList = splitLines.map((line) => parseInt(line.right));
const leftInRightFrequency = getLeftInRightFrequency(leftList, rightList);

const similarityScore = leftInRightFrequency.reduce((acc, leftInRight) => acc + (leftInRight.number * leftInRight.frequency), 0);
console.log(similarityScore);

// answer is 21142653