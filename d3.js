"use strict";
const fs = require("fs");


const columns = fs
  .readFileSync("./d3.txt", "utf-8")
  .trim()
  .split(/\n/)
  .reduce((cols, str) => {
    [...str].forEach((c, i) => cols[i] = (cols[i] || []).concat(c));
    return cols
  }, []);

const gamma = columns
      .reduce((acc, col) => {
        return  acc + (col.filter(n => n === '0').length < col.length / 2 ? "1" : "0");
      }, "");
const epsilon = columns
      .reduce((acc, col) => {
        return  acc + (col.filter(n => n === '0').length > col.length / 2 ? "1" : "0");
      }, "");
console.log("Part 1", parseInt(gamma,2) * parseInt(epsilon, 2));
// console.log("Part 2", run(lines));
