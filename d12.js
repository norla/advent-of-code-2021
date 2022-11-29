"use strict";

const fs = require("fs");
const input = fs.readFileSync("./d12.txt", "utf-8")
                .trim()
                .split(/\n/)
                .reduce((acc, r) => {
                  const [k, v] = r.split("-");
                  return {...acc, [k]: acc[k] ? acc[k].concat(v) : [v]}
                }, {});

function isLarge(cave) {
  return cave.toLowerCase() !== cave;
}

function walk(cave, caves, visited = [], solutions) {
  if (cave === "end") {
    solutions.push(visited);
    return;
  }
  const nextCaves = Object
        .entries(caves)
        .flatMap(([k, v]) => {
          if (k === cave) return v;
          if (v.includes(cave)) return k;
        })
        .filter(p => p && p !== "start");

  for (const nextCave of nextCaves) {
    if (isLarge(nextCave) || !visited.includes(nextCave)) {
      walk(nextCave, caves, visited.concat(nextCave), solutions);
    }
  }
}

function walk2(cave, caves, visited, solutions) {

  if (cave === "end") {
    solutions.push(visited);
    return;
  }
  const nextCaves = Object
        .entries(caves)
        .flatMap(([k, v]) => {
          if (k === cave) return v;
          if (v.includes(cave)) return k;
        })
        .filter(p => p && p !== "start");
  for (const nextCave of nextCaves) {
    const smallVistitedTwice = Object.entries(visited).find(([k,v]) => !isLarge(k) && v > 1)
    if (isLarge(nextCave) || !visited[nextCave] || !smallVistitedTwice) {
      const  nextVisited = {...visited, [nextCave]: (visited[nextCave] || 0) + 1 }
      walk2(nextCave, caves, nextVisited, solutions);
    }
  }
}

const solutions = [];
walk("start", input, [], solutions);
console.log("Part 1", solutions.length); 5178

const solutions2 = [];
walk2("start", input, {}, solutions2);
console.log("Part 2", solutions2.length); // 5178
