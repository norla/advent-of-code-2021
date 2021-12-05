"use strict";
const fs = require("fs");
const _ = require("lodash");

function inclusiveRange(first, last) {
  return last >= first ? _.range(first, last + 1) : _.range(first, last -1);
}

function run(withDiagonals) {
  const input = fs.readFileSync("./d5.txt", "utf-8").trim().split("\n");
  const lines = input.map(str => str.split(/ -> /).map(coord => coord.split(",").map(_.toNumber)));
  const grid = [];
  function visit(grid, x,y) {
    // console.log("- - - DEBUG visit", x, y);
    if (!grid[y]) grid[y] = []
    grid[y][x] = grid[y][x] ? grid[y][x] + 1 : 1;
  }
  for (const [[x1, y1], [x2, y2]] of lines) {
   console.log("- - - DEBUG x1,x2,y1,y2", x1,x2,y1,y2, inclusiveRange(x1,x2));
    if (y1 === y2) {
      for (const x of inclusiveRange(x1, x2)) visit(grid, x, y1);
    } else if (x1 === x2) {
      for (const y of inclusiveRange(y1, y2)) visit(grid, x1, y);
    } else if (withDiagonals) {
      const xD = x2 > x1 ? 1 : -1;
      const yD = y2 > y1 ? 1 : -1;
      let x = x1, y = y1;
      console.log("- - - DEBUG x1, x2, xD", x1, x2, xD);

      while(x !== x2) {
        visit(grid, x, y);
        x = x + xD;
        y = y + yD;
      }
    }
  }
  print(grid)
  return grid.flat().filter(n => n > 1).length;
}

console.log("Part 1", run())
console.log("Part 2", run(true))
function print(grid) {
  for (const line of grid) {
    for (const n of _.range(0,100)) {
      process.stdout.write(((line || [])[n]  || ".").toString())
    }
    console.log()
  }
}
