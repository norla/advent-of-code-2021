"use strict";
const fs = require("fs");
const _ = require("lodash");

const lines = fs.readFileSync("./d4.txt", "utf-8").split("\n");
const numbers = lines[0].split(",");

let { boards } = lines.slice(1).reduce(({boards = [], currentBoard = []}, line) => {
  if (line === "") {
    boards.push({rows: currentBoard, cols: _.range(0,5).map(n => currentBoard.map(l => l[n]))});
    currentBoard = [];
  } else {
    currentBoard.push(line.trim().split(/[ ]+/));
  }
  return {boards, currentBoard};
});

const drawn = []
const finished = [];
for (const n of numbers) {
  drawn.push(n);
  const [winners, loosers] = _.partition(boards, (({rows, cols}) => {
    const bingo = (nums) => _.difference(nums, drawn).length === 0;
    return cols.some(bingo) || rows.some(bingo);
  }));
  for (const winner of winners) {
    const unmarked = _.difference(_.flatten(winner.rows), drawn);
    const score =_(unmarked).map(_.toNumber).sum() * n;
    finished.push(score);
  }
  boards = loosers;
}

console.log("Part 1", finished[0]);
console.log("Part 2", finished[finished.length - 1])
