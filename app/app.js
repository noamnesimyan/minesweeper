const GameBoard = require("../game/gameBoard");
const {executeAction, startGame} = require("../game/gameManagement");
const prompt = require('prompt-sync')();

const boardParams = prompt('Enter board size and number of bombes in the format (board size,number of bombs): ');
const board = new GameBoard.constructor(parseInt(boardParams.split(",")[0]), parseInt(boardParams.split(",")[1]));
startGame(board);3