"use strict";
const fs = require("fs");
const _ = require("lodash");

const input = fs.readFileSync("./d5.txt", "utf-8").trim().split("\n");
const lines = input.map(str => str.split(/ -> /).map(coord => coord.split(",").map(_.toNumber)));

const nonDiagonal = lines.filter(([[x1, y1], [x2, y2]]) => x1 === x2 || y1 === y2);


function inclusiveRange(first, last) {
  return last >= first ? _.range(first, last + 1) : _.range(first, last -1);
}

function visit(grid, x,y) {
  // console.log("- - - DEBUG visit", x, y);
  if (!grid[y]) grid[y] = []
  grid[y][x] = grid[y][x] ? grid[y][x] + 1 : 1;
}


const grid = [];
for (const [[x1, y1], [x2, y2]] of nonDiagonal) {
  // console.log("- - - DEBUG x1,x2,y1,y2", x1,x2,y1,y2, inclusiveRange(x1,x2));
  if (y1 === y2) {
    for (const x of inclusiveRange(x1, x2)) visit(grid, x, y1);
  } else {
    for (const y of inclusiveRange(y1, y2)) visit(grid, x1, y);
  }
}

print()

console.log("Part 1", grid.flat().filter(n => n > 1).length);

function print() {
  for (const line of grid) {
    for (const n of _.range(0,100)) {
      process.stdout.write(((line || [])[n]  || ".").toString())
    }
    console.log()
  }
}
