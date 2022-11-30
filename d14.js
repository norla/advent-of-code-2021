"use strict";

const fs = require("fs");
const input = fs.readFileSync("./d14.txt", "utf-8").trim().split(/\n/);

const template = input[0];

const rules = input
  .splice(2)
  .map((l) => l.split(" -> "))
  .reduce((acc, [k, v]) => ({...acc, [k]: v}), {});

function apply(rules, template) {
  return template.flatMap((c, i) => {
    if (i === 0) return [c];
    const key = `${template[i - 1]}${c}`;
    return [rules[key], c];
  });
}

const afterTen = Array(10)
  .fill()
  .reduce((acc) => apply(rules, acc), template.split(""))
  .join("");

const freqs = [...afterTen].reduce((acc, c) => ({...acc, [c]: (acc[c] || 0) + 1}), {});
console.log("Part 1", freqs);
// Part 1 {
//   F: 1416,
//   P: 2957,
//   H: 1752,
//   V: 3149,
//   B: 2400,
//   S: 1414,
//   O: 2689,
//   N: 1966,
//   K: 789,
//   C: 925
// }

const afterForty = Array(40)
  .fill()
  .reduce((acc, _, i) => console.log(i, acc.length) || apply(rules, acc), template.split(""))
  .join("");
const freqs2 = [...afterForty].reduce((acc, c) => ({...acc, [c]: (acc[c] || 0) + 1}), {});
console.log("Part 2", freqs2);
