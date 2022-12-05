"use strict";

const fs = require("fs");
const grid = require("./lib/grid");
const input = fs.readFileSync("./d15.txt", "utf-8").trim().split(/\n/);
const cave = {};
input.forEach((l, y) => [...l].forEach((c, x) => grid.set(cave, x, y, c)));

const caveHeight = Object.keys(cave).length;
const caveWidth = Object.keys(cave[0]).length;
const visits = {};

let bestScore = 2000;
let bestPath = [];
let i = 0;
function solve(cave, path, totScore) {
  const [x, y] = path[path.length - 1];
  const score = grid.get(cave, x, y);
  const newTotScore = Number(score) + totScore;
  if (i++ % 200000 === 0) {
    console.clear();
    for (let i = 0; i < caveHeight; i++) {
      for (let j = 0; j < caveWidth; j++) {
        let char = " ";
        if (bestPath.find(([x2, y2]) => x2 === j && y2 === i)) {
          char = "O";
        } else if (path.find(([x2, y2]) => x2 === j && y2 === i)) {
          char = "*";
        } else if (grid.get(visits, j, i)) {
          char = ".";
        }
        process.stdout.write(char);
      }
      console.log();
    }
    console.log(bestScore, i);
  }

  const minStepsToGoal = caveWidth - x + caveHeight - y;
  // 1000 40 1041
  const minTotScore = bestScore;

  if (
    score == null ||
    newTotScore > bestScore - minStepsToGoal ||
    (grid.get(visits, x, y) && Number(grid.get(visits, x, y)) < newTotScore)
  ) {
    return;
  }
  grid.set(visits, x, y, newTotScore);
  if (x === caveWidth - 1 && y === caveHeight - 1) {
    // console.log("- - - GOAL", newTotScore, bestScore, path.length);
    if (newTotScore <= bestScore) {
      // console.log("- - - DEBUG path", path.map(([x, y]) => `[${x},${y}]`).join(","));

      bestScore = newTotScore;
      bestPath = path;
    }
    return;
  }

  // console.log("- - - DEBUG", x, y, path.length, totScore, bestScore, minStepsToGoal);
  const visited = (x2, y2) => path.find(([x3, y3]) => x3 === x2 && y3 === y2);
  !visited(x, y - 1) && solve(cave, path.concat([[x, y - 1]]), newTotScore);
  !visited(x + 1, y) && solve(cave, path.concat([[x + 1, y]]), newTotScore);
  !visited(x, y + 1) && solve(cave, path.concat([[x, y + 1]]), newTotScore);
  !visited(x - 1, y) && solve(cave, path.concat([[x - 1, y]]), newTotScore);
}

// console.log("- - - DEBUG", caveHeight, caveWidth);
solve(cave, [[0, 0]], 0);

console.log("- - - DEBUG SOLS", bestScore - Number(grid.get(cave, 0, 0)));
