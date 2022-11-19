"use strict";
const fs = require("fs");

const input = fs.readFileSync("./d7.txt", "utf-8").trim().split(/,/).map(Number);

const min = Math.min(...input);
const max = Math.max(...input);
const positions = [...Array(max-min + 1).keys()].map((x) => x + min);

const fuelCostPerPos = positions.map((pos) => {
     const totalCost = input.reduce((acc, crabPos) => {
       const cost = Math.abs(crabPos - pos);
       return acc + cost;
     }, 0);
  return {pos, cost: totalCost};
});

const cheapestPos = fuelCostPerPos.sort((p1, p2) => p1.cost - p2.cost)[0];
console.log("PART 1: ", cheapestPos); // 339321

const fuelCostPerPos2 = positions.map((pos) => {
     const totalCost = input.reduce((acc, crabPos) => {
       const cost = Math.abs(crabPos - pos);
       return acc + (cost * cost + cost) / 2;
     }, 0);
  return {pos, cost: totalCost};
});

const cheapestPos2 = fuelCostPerPos2.sort((p1, p2) => p1.cost - p2.cost)[0];
console.log("PART 2: ", cheapestPos2); // 95476244
