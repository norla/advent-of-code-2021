"use strict";
const fs = require("fs");

const input = fs
  .readFileSync("./d3.txt", "utf-8")
  .trim()
  .split(/\n/)
  .map(line => [...line]);

// Part 1
const columns = input[0].map((foo, n) => input.map(line => line[n]));
const {gamma, epsilon} = columns
      .reduce(({gamma = "", epsilon =""}, col) => {
        const nOnes = col.filter(x => x === "1").length;
        return {
          gamma: gamma + ((nOnes > col.length / 2) ? "1" : "0"),
          epsilon: epsilon + ((nOnes > col.length / 2) ? "0" : "1")
        }
      }, {});
console.log("Part 1", parseInt(gamma,2) * parseInt(epsilon, 2));

// Part 2
function getRating(lines, rating, bit = 0) {
  if (lines.length === 1) return parseInt(lines[0].join(""), 2);
  const column = lines.map(line => line[bit]);
  const nOnes = column.filter(x => x === "1").length;
  const nZeroes = column.length - nOnes;
  if (rating === "ogr") {
    const keep = nOnes >= column.length / 2 ? "1" : "0";
    return getRating(lines.filter(line => line[bit] === keep), rating, bit + 1)
  } else {
    const keep = nOnes >= column.length / 2 ? "0" : "1";
    return getRating(lines.filter(line => line[bit] === keep), rating, bit + 1)
  }
}
console.log("Part 2", getRating(input, "ogr") * getRating(input, "csr"));
