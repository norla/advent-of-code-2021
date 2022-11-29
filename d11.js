"use strict";

const fs = require("fs");
const input = fs.readFileSync("./d11.txt", "utf-8").trim().split(/\n/).map(r => r.split("").map(Number));
const surroundings = [[1,0], [1,1], [0,1], [-1,1], [-1,0], [-1,-1],[0,-1],[1,-1]];

function turn(grid) {
  let flashes = 0;
  mapGrid(grid, (x, y, n) => n + 1);
  let flashMade = true;
  while(flashMade) {
    flashMade = false;
    mapGrid(grid, (x, y, n) => {
      if (n > 9) {
        flashMade = true;
        flashes++;
        setValue(grid, x, y, 0);
        surroundings.forEach(([xD, yD]) => incValue(grid, x + xD, y + yD));
        printGrid(grid);
        return 0;
      } else {
        return n;
      }
    })
    printGrid(grid);
  }
  return flashes;
}

const colors = [15, 235, 236, 238, 240, 242, 244, 248, 250, 252].map((c, i) => `\x1b[48;5;${c}m\x1b[38;5;${c === 15? 15 : c - 1}m`);
let c = 0;
function printGrid(grid) {
  const gridStr = grid.map((l) => l.map(x => `${colors[x % 10]} ${x % 10}`).join("")).join("\n") + `\x1b[0m\n\nGen: ${c}\n`;
  setTimeout(() => {
    console.clear();
    console.log(gridStr)
  }, c*10);
  c++;
}

function mapGrid(grid, fun) {
  for (var [y, row] of grid.entries()) {
    for (var [x, n] of row.entries()) {
      row[x] = fun(x, y, n);
    }
  }
}

function incValue(grid, x, y, n) {
  if (grid[y] && grid[y][x]) grid[y][x] = grid[y][x] + 1;
}
function setValue(grid, x, y, n) {
  if (grid[y] && grid[y][x]) grid[y][x] = n;
}

const tot = Array(101).fill().reduce((acc = 0) => {
  const flashes = turn(input);
  return acc + flashes
})
console.log("Part 1:", tot) // 1735

let n = 101;
while (true) {
  turn(input);
  if (input.every((row) => row.every((v) => v === 0))) {
    console.log("Part 2:", n) // 400
    break;
  }
  n++
}
