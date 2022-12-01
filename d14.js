"use strict";

const fs = require("fs");
const input = fs.readFileSync("./d14.txt", "utf-8").trim().split(/\n/);

const template = input[0];
const templatePairs = template
  .split("")
  .map((c, i, arr) => `${arr[i - 1]}${c}`)
  .splice(1)
  .reduce((acc, p) => inc(acc, p, 1), {});
const rules = input
  .splice(2)
  .map((l) => l.split(" -> "))
  .reduce((acc, [k, v]) => ({...acc, [k]: v}), {});
const initialCount = [...template].reduce((acc, c) => inc(acc, c), {});

function inc(map, key, n = 1) {
  map[key] = (map[key] || 0) + n;
  return map;
}

function apply(rules, pairs, count) {
  const newPairs = {...pairs};
  const newCount = {...count};
  Object.entries(pairs)
    .filter(([_, n]) => n > 0)
    .forEach(([pair, n]) => {
      const newPair1 = `${pair.charAt(0)}${rules[pair]}`;
      const newPair2 = `${rules[pair]}${pair.charAt(1)}`;
      inc(newPairs, pair, -n);
      inc(newPairs, newPair1, n);
      inc(newPairs, newPair2, n);
      inc(newCount, rules[pair], n);
    });
  return {pairs: newPairs, count: newCount};
}

const afterTen = Array(10)
  .fill()
  .reduce((acc) => apply(rules, acc.pairs, acc.count), {pairs: templatePairs, count: initialCount});
console.log("Part 1", afterTen); // 2957 - 789 =

const afterForty = Array(40)
  .fill()
  .reduce((acc) => apply(rules, acc.pairs, acc.count), {pairs: templatePairs, count: initialCount});
const vals = Object.values(afterForty.count).sort((a, b) => a - b);
console.log("Part 2", vals); // 3770115246928 - 802138174740 = 2967977072188
