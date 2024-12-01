const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8");

/**
 * @param {string} line - The input string to process
 */
function getCalibrationValue(line) {
  const numbers = line.match(/\d/g); // Match single digits
  if (numbers.length === 0) {
    throw 'No numbers found!';
  }

  if (numbers.length === 1) {
    return parseInt(`${numbers[0]}${numbers[0]}`);
  }
  return parseInt(`${numbers[0]}${numbers[numbers.length - 1]}`);
}

const lines = input.split('\n');
const calibrationValues = lines.map(getCalibrationValue);
const sum = calibrationValues.reduce((acc, value) => acc + value, 0);
console.log(sum);

// answer is 55029