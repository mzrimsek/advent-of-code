const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8");
const lines = input.split("\n");

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
function getPairs(leftList, rightList) {
  const sortedLeft = leftList.sort((a, b) => a - b);
  const sortedRight = rightList.sort((a, b) => a - b);
  return sortedLeft.map((list, index) => {
    const left = sortedLeft[index];
    const right = sortedRight[index];
    const distance = Math.abs(left - right);
    return {
      left: list,
      right,
      distance
    };
  });
}

const splitLines = lines.map(splitLine);
const leftList = splitLines.map((line) => parseInt(line.left));
const rightList = splitLines.map((line) => parseInt(line.right));
const pairs = getPairs(leftList, rightList);

const totalDistance = pairs.reduce((acc, pair) => acc + pair.distance, 0);
console.log(totalDistance);

// answer is 2285373
