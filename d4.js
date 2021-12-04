"use strict";
const fs = require("fs");
const _ = require("lodash");

const lines = fs.readFileSync("./d4.txt", "utf-8").split("\n");
const numbers = lines[0].split(",");
let { boards  }= lines.slice(1).reduce(({boards = [], current = []}, line) => {
  if (line === "") {
    boards.push({rows: current, cols: [...Array(5).keys()].map(n => current.map(l => l[n]))});
    current = [];
  } else {
    current.push(line.trim().split(/[ ]+/));
  }
  return {boards, current};
});

const drawn = []
const winners = [];
for (const n of numbers) {
  drawn.push(n);
  const [[winner], newBoards] = _.partition(boards, (({rows, cols}) => {
    return cols.some(col => _.difference(col, drawn).length === 0) ||
      rows.some(row => _.difference(row, drawn).length === 0);
  }));
  if (winner) {
    const score =_.sum(_.difference(_.flatten(winner.rows), drawn).map(_.toNumber)) * n;
    winners.push(score);
  }
  boards = newBoards;
}

console.log("Part 1", winners[0]);
console.log("Part 2", winners[winners.length - 1])
