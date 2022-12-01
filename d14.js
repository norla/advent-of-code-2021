"use strict";

const fs = require("fs");
const input = fs.readFileSync("./d14.txt", "utf-8").trim().split(/\n/);

const template = input[0];
const templatePairs = template
  .split("")
  .map((c, i, arr) => `${arr[i - 1]}${c}`)
  .splice(1)
  .reduce((acc, p) => ({...acc, [p]: (acc[p] || 0) + 1}), {});

const rules = input
  .splice(2)
  .map((l) => l.split(" -> "))
  .reduce((acc, [k, v]) => ({...acc, [k]: v}), {});

function apply(rules, pairs, count) {
  console.log("- - - pair", pairs, count);

  const newPairs = {...pairs};
  const newCount = {...count};
  Object.entries(pairs)
    .filter(([_, n]) => n > 0)
    .forEach(([pair, n]) => {
      const newPair1 = `${pair.charAt(0)}${rules[pair]}`;
      const newPair2 = `${rules[pair]}${pair.charAt(1)}`;
      // console.log("- - - new pair:", pair, rules[pair], newPair1, newPair2);

      newPairs[pair] = newPairs[pair] - n;
      newPairs[newPair1] = (newPairs[newPair1] || 0) + n;
      newPairs[newPair2] = (newPairs[newPair2] || 0) + n;
      newCount[rules[pair]] = (newCount[rules[pair]] || 0) + n;
    });
  return {pairs: newPairs, count: newCount};
}

function countChars(pairs) {
  return Object.entries(pairs).reduce((acc, [pair, n], i) => {
    acc[pair.charAt(1)] = (acc[pair.charAt(1)] || 0) + n;
    return acc;
  }, {});
}

const afterTen = Array(10)
  .fill()
  .reduce((acc) => apply(rules, acc.pairs, acc.count), {pairs: templatePairs, count: countChars(templatePairs)});

console.log("Part 1", afterTen); // 2957 - 789

const afterForty = Array(40)
  .fill()
  .reduce((acc) => apply(rules, acc.pairs, acc.count), {pairs: templatePairs, count: countChars(templatePairs)});
const vals = Object.values(afterForty.count).sort((a, b) => a - b);
console.log("Part 2", vals); // 2967977072188
