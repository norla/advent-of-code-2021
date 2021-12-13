"use strict";
const fs = require("fs");

function run(fish, steps) {
  for (const i in [...Array(steps)]) {
    const nBirths = fish["0"] || 0;
    fish = Object.entries(fish).reduce((acc, [k, v]) => {
      const newKey = k === "0" ? 6 : Number(k) - 1;
      const newValue = k === "7" ? v + nBirths : v;
      return { ...acc, [newKey]: newValue };
    }, {});
    fish[8] = (fish[8] || 0) + nBirths;
  }
  return Object.values(fish).reduce((sum, n) => sum + n, 0);
}

const input = fs
  .readFileSync("./d6.txt", "utf-8")
  .trim()
  .split(/,/)
  .reduce((acc, n) => ({ ...acc, [n]: (acc[n] || 0) + 1 }), {});

console.log("Part 1", run(input, 80));
console.log("Part 2", run(input, 256));
