"use strict";

function inc(map, key, n=1) {
  map[key] = (map[key] || 0) + n;
  return map;
}

module.exports = {inc};
