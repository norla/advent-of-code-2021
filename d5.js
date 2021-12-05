"use strict";
const fs = require("fs");

function visit(grid, x, y) {
  if (!grid[y]) grid[y] = [];
  grid[y][x] = grid[y][x] ? grid[y][x] + 1 : 1;
}

function run(input) {
  const grid = [];
  input.forEach(([[x1, y1], [x2, y2]]) => {
    let [x, y] = [x1, y1];
    visit(grid, x, y);
    while (x !== x2 || y !== y2) {
      x += Math.sign(x2 - x1);
      y += Math.sign(y2 - y1);
      visit(grid, x, y);
    }
  });
  return grid.flat().filter((n) => n > 1).length;
}

const lines = fs
  .readFileSync("./d5.txt", "utf-8")
  .trim()
  .split(/\n/)
  .map((str) => str.split(/ -> /).map((coord) => coord.split(",").map((n) => Number(n))));

console.log("Part 1", run(lines.filter(([[x1, y1], [x2, y2]]) => x1 === x2 || y1 === y2)));
console.log("Part 2", run(lines));
