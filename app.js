const {buildMap, setBombs, printMap} = require("./boardHandler");

board = buildMap(10,10);
boardboard = setBombs( board, 10);
printMap(board);