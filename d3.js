"use strict";
const fs = require("fs");


const input = fs
  .readFileSync("./d3.txt", "utf-8")
  .trim()
  .split(/\n/)
  .map(line => [...line]);

function getColumn(lines, n) {
  return lines.map(line => line[n]);
}

function getRating(lines, rating, bit = 0) {

  if (lines.length === 1) return parseInt(lines[0].join(""), 2);
  const column = getColumn(lines, bit);
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


console.log("RES", getRating(input, "ogr") * getRating(input, "csr"));
// const gamma = columns
//       .reduce((acc, col) => {
//         return  acc + (col.filter(n => n === '0').length < col.length / 2 ? "1" : "0");
//       }, "");
// const epsilon = columns
//       .reduce((acc, col) => {
//         return  acc + (col.filter(n => n === '0').length > col.length / 2 ? "1" : "0");
//       }, "");

// console.log("- - - DEBUG input", input);

//console.log("Part 1", parseInt(gamma,2) * parseInt(epsilon, 2));
// console.log("Part 2", run(lines));
