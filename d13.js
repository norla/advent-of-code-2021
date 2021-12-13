"use strict";
const fs = require("fs");
const _ = require("lodash");

function print(grid) {
  for (const y in _.range(0, 6)) {
    for (const x in _.range(0, 39)) {
      process.stdout.write(grid.find(([x2, y2]) => x == x2 && y == y2) ? "#" : " ");
    }
    process.stdout.write("\n");
  }
  process.stdout.write("\n");
}

const input = fs.readFileSync("./d13.txt", "utf-8").trim().split("\n");
let sheet = input.filter((l) => l.match(/,/)).map((l) => l.split(",").map((n) => Number(n)));
const folds = input
  .filter((l) => l.match(/fold/))
  .map((l) => l.split(" ").reverse()[0].split("="))
  .map(([axis, n]) => [axis, Number(n)]);

function run(folds, sheet) {
  folds.forEach(([axis, pos]) => {
    const newSheet = [];
    sheet.forEach(([x, y]) => {
      if (axis === "y") {
        if (y < pos) newSheet.push([x, y]);
        if (y > pos) newSheet.push([x, 2 * pos - y]);
      } else {
        if (x < pos) newSheet.push([x, y]);
        if (x > pos) newSheet.push([2 * pos - x, y]);
      }
    });
    sheet = newSheet;
  });
  return sheet;
}
console.log("Part 1:", _.uniqBy(run([folds[0]], sheet), String).length);
print(run(folds, sheet));
