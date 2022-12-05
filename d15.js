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
function solve(cave, x, y, path, totScore) {
  const newPath = path.concat([[x, y]]);
  const score = x === 0 && y === 0 ? 0 : Number(grid.get(cave, x, y));
  const newTotScore = score + totScore;
  if (i++ % 300000 === 0) print(path);

  // We have reached the end, check highscore and abort
  if (x === caveWidth - 1 && y === caveHeight - 1) {
    if (newTotScore <= bestScore) {
      print(newPath);
      bestScore = newTotScore;
      bestPath = newPath;
    }
    return;
  }
  // No chance of reaching end, abort
  const minStepsToGoal = caveWidth - x + caveHeight - y - 2;
  if (newTotScore + minStepsToGoal >= bestScore) {
    return;
  }

  // Another solution has reached this point quicker than us, abort
  if (Number(grid.get(visits, x, y)) < newTotScore) {
    return;
  }
  // Record how fast we reached this point
  grid.set(visits, x, y, newTotScore);

  const eligible = (x2, y2) => !path.find(([x3, y3]) => x3 === x2 && y3 === y2) && grid.get(cave, x2, y2);
  eligible(x, y - 1) && solve(cave, x, y - 1, newPath, newTotScore);
  eligible(x + 1, y) && solve(cave, x + 1, y, newPath, newTotScore);
  eligible(x, y + 1) && solve(cave, x, y + 1, newPath, newTotScore);
  eligible(x - 1, y) && solve(cave, x - 1, y, newPath, newTotScore);
}

// console.log("- - - DEBUG", caveHeight, caveWidth);
solve(cave, 0, 0, [], 0);

console.log("Part 1", bestScore);

function print(path) {
  console.clear();
  for (let i = 0; i < caveHeight; i++) {
    for (let j = 0; j < caveWidth; j++) {
      let char = " ";
      if (bestPath.find(([x2, y2]) => x2 === j && y2 === i)) {
        char = `${grid.get(cave, j, i)}`; //"O";
      } else if (path.find(([x2, y2]) => x2 === j && y2 === i)) {
        char = "*"; //
      } else if (grid.get(visits, j, i)) {
        char = ".";
      }
      process.stdout.write(char);
    }
    console.log();
  }
  console.log(bestScore, i);
}
