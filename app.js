const {buildMap, setBombs, printMap} = require("./mapHandler");

map = buildMap(10,10);
map = setBombs(map, 10);
printMap(map);