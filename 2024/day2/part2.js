const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8");
const lines = input.split("\n");

/**
 * @param {string} line 
 */
function parseLineToNumbers(line) {
  const numbers = line.split(" ").map(Number);
  return numbers;
}

function isSortedAsc(numbers) {
  for (var i = 0; i < numbers.length - 1; i++) {
    const current = numbers[i];
    const next = numbers[i + 1];
    if (current > next) {
      return false;
    }
  }
  return true;
}

function isSortedDesc(numbers) {
  for (var i = 0; i < numbers.length - 1; i++) {
    const current = numbers[i];
    const next = numbers[i + 1];
    if (current < next) {
      return false;
    }
  }
  return true;
}

function isSorted(numbers) {
  return isSortedAsc(numbers) || isSortedDesc(numbers);
}

/**
 * @typedef {Object} AdjacentNumbersValidResult
 * @property {number} index
 * @property {boolean} result
 */

/**
 * @param {number[]} numbers
 * @returns {AdjacentNumbersValidResult}
 */
function allAdjacentNumbersValid(numbers) {
  for (var i = 0; i < numbers.length - 1; i++) {
    const current = numbers[i];
    const next = numbers[i + 1];
    const diff = Math.abs(next - current);
    const diffIsValid = (diff >= 1 && diff <= 3) && diff !== 0;
    if (!diffIsValid) {
      return {
        index: i,
        result: false
      };
    }
  }
  return {
    result: true
  };
}

const linesAsNumbers = lines.map(parseLineToNumbers);
let validLines = linesAsNumbers.filter(numbers => isSorted(numbers) && allAdjacentNumbersValid(numbers).result);
const invalidLines = linesAsNumbers.filter(numbers => isSorted(numbers) || !allAdjacentNumbersValid(numbers).result);

for (const invalidLine of invalidLines) {
  const validation = allAdjacentNumbersValid(invalidLine);
  if (validation.result) {
    const validLine = invalidLine.slice();
    validLine.splice(validation.index, 1);

    const isValid = isSorted(validLine) && allAdjacentNumbersValid(validLine).result;
    if (isValid) {
      validLines = [...validLines, validLine];
    }
  }
}

console.log(validLines.length);

// answer is 