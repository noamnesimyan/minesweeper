const GameBoard = require("../game/gameBoard");
const {executeAction, startGame} = require("../game/gameManagement");
const prompt = require('prompt-sync')();
const outputs = require('../game/contactPlayer');
const {setParams} = require("../game/setParams");

const input = prompt(outputs.SET_BOARD_PARAMS);
const board = new GameBoard.constructor(setParams(input,0), setParams(input,1));
startGame(board);
