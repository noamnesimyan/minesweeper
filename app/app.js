const GameBoard = require("../game/gameBoard");
const {executeAction, startGame} = require("../game/gameManagement");

const board = new GameBoard.constructor(10,10, 10);
board.printBoard();
startGame(board);
