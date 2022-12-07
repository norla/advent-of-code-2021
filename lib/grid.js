"use strict";

function set(grid, x, y, value) {
  grid[y] = grid[y] || {};
  grid[y][x] = value;
  return grid;
}

function del(grid, x, y) {
  if (grid[y]) {
    delete(grid[y][x])
  }
  return grid;
}

function get(grid, x, y) {
  return grid[y] && grid[y][x];
}

function includes(grid, x ,y) {
  return get(grid, x, y) != null
}

function size(grid) {
  return Object.values(grid).reduce((acc, row) => acc + Object.keys(row).length, 0);
}

function entries(grid) {
  return Object
    .entries(grid)
    .flatMap(([y, row]) => Object
             .entries(row)
             .filter(([_, value]) => value != null)
             .map(([x, value]) => ({x,y,value})))
}

function print(grid, sep = "") {
  const height = Object.keys(grid).length;
  for (let i = 0; i < height; i++) {
    console.log(Object.values(grid[i]).join(sep))
  }
}

module.exports = {set, get, includes,print, entries, del, size};
