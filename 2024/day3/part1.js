const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8");

const matches = input.match(/mul\((\d+),(\d+)\)/g);
const cleanedMatches = matches.map(match => {
  const noMul = match.replace("mul(", "").replace(")", "");
  return noMul.split(",").map(Number);
});
const multiplied = cleanedMatches.map(([a, b]) => a * b);
const sum = multiplied.reduce((acc, curr) => acc + curr, 0);
console.log(sum);

// answer is 156388521