"use strict";
const fs = require("fs");
const tokens = {"{": "}", "[": "]", "<": ">", "(":")"};
const scores = {"}": 1197, "]": 57, ">":25137, ")":3};
const completionScores = {"{": 3, "[": 2, "<": 4, "(": 1};
const lines = fs.readFileSync("./d10.txt", "utf-8").trim().split(/\n/).map(r => r.split(""));
let score = 0;
const completionScore = [];

lines.map((line) => {
  const stack = [];
  let corrupted = false;
  for (const c of line) {
    if (tokens[c]) {
      stack.push(c);
    } else {
      const match = tokens[stack.pop()];
      if (match !== c) {
        corrupted = true;
        score += scores[c];
      }
    }
  }
  if (!corrupted) {
    completionScore.push(stack.reverse().reduce((acc, c) => acc * 5 + completionScores[c], 0));
  }
})

console.log("Part 1", score); // 358737
const mid = completionScore.sort((a, b) => a - b)[Math.floor(completionScore.length / 2)];
console.log("Part 2:", mid); // 4329504793
