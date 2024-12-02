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

/**
 * @param {number[]} numbers
 * @returns {boolean}
 */
function allAdjacentNumbersValid(numbers) {
  for (var i = 0; i < numbers.length - 1; i++) {
    const current = numbers[i];
    const next = numbers[i + 1];
    const diff = Math.abs(next - current);
    const diffIsValid = (diff >= 1 && diff <= 3) && diff !== 0;
    if (!diffIsValid) {
      return false;
    }
  }
  return true;
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

const linesAsNumbers = lines.map(parseLineToNumbers);
const validLines = linesAsNumbers.filter(numbers => isSorted(numbers) && allAdjacentNumbersValid(numbers));
console.log(validLines.length);

// answer is 407