"use strict";

const fs = require("fs");
const grid = fs.readFileSync("./d9.txt", "utf-8").trim().split(/\n/).map(r => r.split("").map(Number));
var risk = 0;
const basins = {}

for (var [y, row] of grid.entries()) {
  for (var [x, h] of row.entries()) {
    const adj = [
      height(grid, x, y-1),
      height(grid, x, y+1),
      height(grid, x+1, y),
      height(grid, x-1, y),
    ].filter(n => n != null);
    if (adj.every((n) => n > h)) {
      risk += h + 1;
      basins[`${y}-${x}`] = basinSize(grid, x, y)
    }
  }
}

function height(grid, x, y) {
  return grid[y]?.[x];
}

function basinSize(grid, x, y, visited = []) {
  const key = `${x}-${y}`;
  const h = height(grid,x,y);
  if (visited.includes(key) || h == null || h === 9) return 0;
  visited.push(key);
  return 1
    + basinSize(grid, x + 1, y, visited)
    + basinSize(grid, x - 1, y, visited)
    + basinSize(grid, x, y + 1,visited)
    + basinSize(grid, x, y - 1,visited)
}

console.log("Part 1:", risk); // 572
console.log("Part 2:", Object
            .values(basins)
            .sort((a, b) => b - a)
            .splice(0,3)
            .reduce((a, b) => a * b, 1)
           ); // 847044
