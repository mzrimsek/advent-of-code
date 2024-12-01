const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8");

/**
 * @param {string} line - The input string to process
 */
function convertNumberWordsToDigits(line) {
  const numbers = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9
  };
  const convertedLine = line.replace(/one|two|three|four|five|six|seven|eight|nine/g, match => numbers[match]);
  return convertedLine;
}

/**
 * @param {string} line - The input string to process
 */
function removeNonDigits(line) {
  return line.replace(/\D/g, '');
}

/**
 * @param {string} line - The input string to process
 */
function getCalibrationValue(line) {
  const convertedLine = convertNumberWordsToDigits(line);
  const convertedLineWithoutNonDigits = removeNonDigits(convertedLine);
  if (convertedLineWithoutNonDigits.length === 0) {
    throw 'No numbers found!';
  }

  const firstNumber = convertedLineWithoutNonDigits[0];
  const lastNumber = convertedLineWithoutNonDigits[convertedLineWithoutNonDigits.length - 1];
  const calibrationValue = parseInt(`${firstNumber}${lastNumber}`);
  return {
    line,
    convertedLine,
    convertedLineWithoutNonDigits,
    calibrationValue
  };
}

const lines = input.split('\n');
const calibrationValues = lines.map(getCalibrationValue);
const sum = calibrationValues.reduce((acc, value) => acc + value.calibrationValue, 0);
console.log(sum);

// answer is 55686