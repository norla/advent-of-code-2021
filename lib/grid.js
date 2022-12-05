"use strict";

function set(grid, x, y, value) {
  grid[y] = grid[y] || {};
  grid[y][x] = value;
  return grid;
}

function get(grid, x, y) {
  return grid[y] && grid[y][x];
}

function print(grid) {

  const height = Object.keys(grid).length;

  for (let i = 0; i < height; i++) {
    console.log(Object.values(grid[i]).join(""))
  }
}

module.exports = {set, get, print};
