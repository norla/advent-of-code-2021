"use strict";
const fs = require("fs");
const _ = require("lodash");

function fold(sheet, [axis, pos]) {
  return sheet.reduce((acc, [x, y]) => {
    if (axis === "y") {
      if (y < pos) acc.push([x, y]);
      if (y > pos) acc.push([x, 2 * pos - y]);
    } else {
      if (x < pos) acc.push([x, y]);
      if (x > pos) acc.push([2 * pos - x, y]);
    }
    return acc
  }, []);
}

const input = fs.readFileSync("./d13.txt", "utf-8").trim().split("\n");
const sheet = input.filter((l) => l.match(/,/)).map((l) => l.split(",").map((n) => Number(n)));
const folds = input
  .filter((l) => l.match(/fold/))
  .map((l) => l.split(" ").reverse()[0].split("="))
  .map(([axis, n]) => [axis, Number(n)]);

console.log("Part 1:", _.uniqBy([folds[0]].reduce(fold, sheet), String).length);
console.log("Part 2");
const solution2 =  folds.reduce(fold, sheet);
for (const y of _.range(0, 6)) {
  for (const x of _.range(0, 39)) {
    process.stdout.write(solution2.find(([x2, y2]) => x === x2 && y === y2) ? "#" : " ");
  }
  process.stdout.write("\n");
}
