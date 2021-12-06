"use strict";
const fs = require("fs");

let fish = fs.readFileSync("./d6.txt", "utf-8") .trim().split(/,/).map(n => Number(n));

for (const i in [...Array(80)]) {
  // console.log(i, fish.join(","))
  const births = fish.filter(n => n === 0);
  fish = fish.map(f => f === 0 ? 6 : f -1);
  fish = fish.concat(births.fill(8));
}
console.log("Part 1", fish.length)
// console.log("- - - DEBUG input", JSON.stringify(input, null, 2));
