"use strict";

const fs = require("fs");
const grid = require("./lib/grid");
const input = fs.readFileSync("./d15.txt", "utf-8").trim().split(/\n/);
const cave1 = {};
const cave2 = {};
const distances = {};
input.forEach((l, y) =>
  [...l].forEach((c, x) => {
    grid.set(cave1, x, y, c);
    for (let y2 = 0; y2 < 5; y2++)
      for (let x2 = 0; x2 < 5; x2++) {
        const newX = x + x2 * input[0].length;
        const newY = y + y2 * input.length;
        const extraRisk = y2 + x2;
        const newRisk = ((c + extraRisk - 1) % 9) + 1;
        grid.set(cave2, newX, newY, newRisk);
      }
  }),
);

function solve(cave) {
  const caveHeight = Object.keys(cave).length;
  const caveWidth = Object.keys(cave[0]).length;
  const distances = {};
  const shortest = {};
  grid.entries(cave).forEach(({x, y, value}) => grid.set(distances, x, y, Number.MAX_SAFE_INTEGER));
  grid.set(distances, 0, 0, 0);
  while (grid.size(shortest) < caveHeight * caveWidth) {
    const {x, y, value} = grid
      .entries(distances)
      .filter(({x, y}) => !grid.includes(shortest, x, y))
      .reduce((acc, dist) => {
        if (!acc) return dist;
        return dist.value < acc.value ? dist : acc;
      });
    // console.log(grid.size(shortest), caveHeight * caveWidth, value, grid.size(distances));
    grid.set(shortest, x, y, value);
    grid.del(distances, x, y);
    const adjacent = [
      [Number(x) - 1, y],
      [Number(x) + 1, y],
      [x, Number(y) - 1],
      [x, Number(y) + 1],
    ].filter(([x, y]) => x >= 0 && y >= 0 && x < caveWidth && y < caveHeight && !grid.includes(shortest, x, y));
    adjacent.forEach(([x, y]) => {
      const oldDistance = Number(grid.get(distances, x, y) || Number.MAX_SAFE_INTEGER);
      const newDistance = Number(grid.get(cave, x, y)) + Number(value);
      grid.set(distances, x, y, Math.min(oldDistance, newDistance));
    });
  }
  return grid.get(shortest, caveWidth - 1, caveHeight - 1);
}
console.log("Part 1", solve(cave1));
console.log("Part 2", solve(cave2));
