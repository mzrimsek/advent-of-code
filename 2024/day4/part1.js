const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8");
const lines = input.split("\n");
const cleanedLines = lines.map(line => line.replace("\r", ""));

const countXMAS = (line) => {
  let count = 0;
  for (let i = 0; i < line.length - 3; i++) {
    if (line[i] === "X" && line[i + 1] === "M" && line[i + 2] === "A" && line[i + 3] === "S") {
      count++;
    }
  }
  return count;
};

const reverseLine = (line) => line.split("").reverse().join("");

const lineForwardCount = cleanedLines.reduce((acc, line) => acc + countXMAS(line), 0);
const lineBackwardsCount = cleanedLines.reduce((acc, line) => acc + countXMAS(reverseLine(line)), 0);
const lineCount = lineForwardCount + lineBackwardsCount;

const columns = [];
for (let i = 0; i < cleanedLines.length; i++) {
  for (let j = 0; j < cleanedLines[i].length; j++) {
    if (!columns[j]) {
      columns[j] = "";
    }
    columns[j] += cleanedLines[i][j];
  }
}

const colForwardCount = columns.reduce((acc, col) => acc + countXMAS(col), 0);
const colBackwardsCount = columns.reduce((acc, col) => acc + countXMAS(reverseLine(col)), 0);
const colCount = colForwardCount + colBackwardsCount;

const diagLtoR = [];
for (let i = 0; i < cleanedLines.length; i++) {
  for (let j = 0; j < cleanedLines[i].length; j++) {
    if (!diagLtoR[i + j]) {
      diagLtoR[i + j] = "";
    }
    diagLtoR[i + j] += cleanedLines[i][j];
  }
}

const diagLtoRForwardCount = diagLtoR.reduce((acc, diag) => acc + countXMAS(diag), 0);
const diagLtoRBackwardsCount = diagLtoR.reduce((acc, diag) => acc + countXMAS(reverseLine(diag)), 0);
const diagLtoRCount = diagLtoRForwardCount + diagLtoRBackwardsCount;

const diagRtoL = [];
for (let i = 0; i < cleanedLines.length; i++) {
  for (let j = 0; j < cleanedLines[i].length; j++) {
    if (!diagRtoL[i - j]) {
      diagRtoL[i - j] = "";
    }
    diagRtoL[i - j] += cleanedLines[i][j];
  }
}

const diagRtoLForwardCount = diagRtoL.reduce((acc, diag) => acc + countXMAS(diag), 0);
const diagRtoLBackwardsCount = diagRtoL.reduce((acc, diag) => acc + countXMAS(reverseLine(diag)), 0);

const diagRtoLCount = diagRtoLForwardCount + diagRtoLBackwardsCount;

console.log(lineCount + colCount + diagLtoRCount + diagRtoLCount);